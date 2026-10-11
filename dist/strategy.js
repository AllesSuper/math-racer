/* Limited assists preserve arithmetic scoring and leave steering to the player. */
(() => {
  const s={joker:0,jokerGate:0,jokerSpawned:false,hidden:new Set(),guard:0,haptics:false,assisted:false,pulseClock:0};
  function pulse(kind){
    if(!s.haptics||typeof navigator==='undefined')return;
    const pattern=kind==='skid'?[65,40,65]:kind==='shield'?[25,25,25]:[25];
    try{const pads=navigator.getGamepads?.()||[];const pad=[...pads].find(Boolean),act=pad?.vibrationActuator;
      if(act?.playEffect){Promise.resolve(act.playEffect('dual-rumble',{duration:kind==='skid'?170:70,strongMagnitude:kind==='skid'?.5:.2,weakMagnitude:.3})).catch(()=>{});return;}
      navigator.vibrate?.(pattern);
    }catch{} // Unsupported devices remain fully playable.
  }
  function controls(){
    $('joker-use').disabled=!running||paused||!task||!s.joker||s.assisted;
    $('joker-use').textContent=`J · Joker ${s.joker}`;
    $('shield-use').disabled=!running||paused||!shield||s.guard>0;
    $('shield-use').textContent=s.guard>0?`Schutz ${Math.ceil(s.guard)}s`:`E · Schild ${shield}`;
    $('strategy-hint').textContent=task?(RallyAdventure.state.magnet>0?'Magnet: leichte Lenkhilfe · selbst rechnen!':s.assisted?'Joker: weniger Tore · selbst entscheiden':'Rechnen gibt Nitro · J Joker · E Schutz'):'SHIFT: Überholen · Joker und Schild fürs nächste Tor sparen';
  }
  function joker(){
    if(!running||paused||!task||!s.joker||s.assisted)return;
    const wrong=task.options.map((v,i)=>i).filter(i=>task.options[i]!==task.answer&&i!==lane);
    s.hidden=new Set(RallyMath.shuffle(wrong).slice(0,Math.max(1,task.options.length-3)));
    s.joker--;s.assisted=true;
    [...$('answers').children].forEach((b,i)=>{if(s.hidden.has(i)){b.disabled=true;b.textContent='—';b.setAttribute('aria-label',`Spur ${i+1}: durch Joker ausgeschlossen`);b.classList.toggle('excluded',true)}});
    pulse('bonus');controls();
  }
  function arm(){if(!running||paused||!shield||s.guard>0)return;shield--;s.guard=6;pulse('shield');controls()}
  function protect(){if(s.guard<=0)return false;s.guard=0;toast('SCHILD FÄNGT DEN DREHER AB!','Kurzer Rutscher statt langem Schleudern. Die Antwort bleibt falsch.',2);pulse('shield');return true}
  $('joker-use').onclick=joker;$('shield-use').onclick=arm;
  $('haptics').onchange=()=>{s.haptics=$('haptics').checked;if(s.haptics)pulse('bonus');else{try{navigator.vibrate?.(0)}catch{}}};
  document.addEventListener('keydown',e=>{if(e.repeat||['INPUT','SELECT'].includes(e.target.tagName))return;if(e.key.toLowerCase()==='j')joker();if(e.key.toLowerCase()==='e')arm()});
  const start=$('start').onclick;$('start').onclick=()=>{if(!rows.size)return start();Object.assign(s,{joker:0,jokerGate:6+Math.floor(Math.random()*14),jokerSpawned:false,guard:0,assisted:false,haptics:$('haptics').checked});s.hidden.clear();start();controls()};
  const nextBase=next;next=function(){s.hidden.clear();s.assisted=false;nextBase();controls()};
  const pickBase=pick;pick=function(n){if(s.hidden.has(n)){const dir=Math.sign(n-lane);if(!dir)return;while(s.hidden.has(n))n+=dir;if(n<0||n>=lanes)return;}pickBase(n)};
  const spawn=spawnInterlude;spawnInterlude=function(){spawn();if(!s.jokerSpawned&&total===s.jokerGate&&wash<=0){s.jokerSpawned=true;traffic.push({lane:Math.floor(Math.random()*lanes),z:.28,type:'joker',hit:false})}};
  const draw=drawObstacles;drawObstacles=function(){draw();for(const t of traffic){if(t.type!=='joker'||t.hit)continue;const p=proj(t.lane,t.z);RallyPickupIcon('joker',p.x,p.y,p.s)}};
  const gates=drawGates;drawGates=function(){if(!task||!s.hidden.size)return gates();const actual=task.options;task.options=actual.map((v,i)=>s.hidden.has(i)?'—':v);gates();task.options=actual};
  const tickBase=tick;tick=function(dt){
    if(running&&!paused){s.guard=Math.max(0,s.guard-dt);s.pulseClock=Math.max(0,s.pulseClock-dt);
      for(const t of traffic)if(t.type==='joker'&&!t.hit&&t.z>=.79&&t.z<1&&Math.abs(t.lane-visualLane)<.42){t.hit=true;s.joker=1;toast('SELTENER JOKER!','Mit J bis auf drei Antworttore reduzieren. Für eine schwierige Aufgabe sparen!',2);pulse('bonus')}
    }
    const before=RallyRivals.player.spin,oldNitro=RallyAdventure.state.nitroTime;
    tickBase(dt);
    if(running&&!paused&&task&&RallyAdventure.state.magnet>0){
      const answerLane=task.options.indexOf(task.answer),dir=Math.sign(answerLane-lane);
      // Bounded lateral bias is smaller than half a lane: never auto-select a gate.
      if(dir&&Math.abs(visualLane-lane)<.16)visualLane+=dir*Math.min(.025,dt*.22);
    }
    if(RallyRivals.player.spin>before)pulse('skid');
    if(RallyAdventure.state.nitroTime>oldNitro)pulse('bonus');
    controls();
  };
  const cross=crossGate;crossGate=function(){const good=task&&task.options[Math.round(visualLane)]===task.answer;cross();pulse(good?'bonus':'skid');controls()};
  controls();globalThis.RallyStrategy={state:s,joker,arm,protect,pulse};
})();
