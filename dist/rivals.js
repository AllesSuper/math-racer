/* Simulated arithmetic rivals. Their visual lanes never disclose an answer. */
(() => {
  const player = { name: 'Du', color: '#c5f277', units: 0, correct: 0, reaction: 0, player: true };
  const bots = [
    { name: 'Turbo-Timo', color: '#75baff', accuracy: .86, pace: .42 },
    { name: 'Blitz-Ben', color: '#e4a2ff', accuracy: .80, pace: .30 },
    { name: 'Rally-Rio', color: '#ffb878', accuracy: .94, pace: .58 }
  ];
  let chain = 0, bonusCount = 0;
  let active = false, question = null, pendingFinish = 0, closing = false;
  function damageAnswer(r,good){
    if(good){r.repairStreak++;if(r.damaged&&r.repairStreak>=2){r.damaged=false;r.damageErrors=0;r.comeback=3;if(r.player)toast('WIEDER FIT!','Zwei richtige Antworten reparieren dein Auto. Drei Tore mit Aufholbonus!',3);}}
    else{r.repairStreak=0;r.damageErrors++;if(r.damageErrors>=3&&!r.damaged){r.damaged=true;if(r.player)toast('KLEINER BLECHSCHADEN','Nur 5 % weniger Tempo. Zwei richtige Antworten reparieren dein Auto!',4);}}
  }
  function answerCredit(r,good,seconds,time){damageAnswer(r,good);const boost=good&&r.comeback>0?.2:0;if(boost)r.comeback--;return credit(good,seconds,time)+boost;}
  function skid(r) {
    if(r.player&&globalThis.RallyStrategy?.protect()){
      r.spin=.5;r.spinSlow=65;r.velocity=65;r.recovery=.8;speed=65;return;
    }
    r.spin = 1.6; r.spinSlow=32; r.velocity = 32; r.recovery = 2.8;
    if(r.player) speed = 32;
  }
  const credit = (good, seconds, time) => good ? 1 + .5 * Math.max(0, Math.min(1, 1 - seconds / time)) : 0;
  function entries(preview = false) {
    return [player, ...bots].map(r => ({ ...r, display: r.units + (r.motion || 0) + (preview && task ?
      r.player ? credit(task.options[Math.round(visualLane)] === task.answer && held > .25, duration-held, duration) :
      elapsed >= r.solveAt ? credit(r.good, r.solveAt, duration) : 0 : 0) }));
  }
  function ranking(preview = false) {
    return entries(preview).sort((a,b)=>b.display-a.display || b.correct-a.correct || a.reaction-b.reaction);
  }
  function hud() {
    const order=ranking(true), place=order.findIndex(r=>r.player)+1;
    $('race-position').textContent=active?`${place}. / 4`:'4 FAHRER';
    globalThis.RallyRelease?.rank(place,active);
    $('race-order').textContent=order.map((r,i)=>`${i+1}. ${r.name}`).join(' · ');
  }
  const baseNext = next;
  next = function () {
    baseNext();question=task;
    for(const b of bots){b.good=Math.random()<b.accuracy;b.responded=false;b.solveAt=Math.max(.8,Math.min(duration-.3,duration*(b.pace+(Math.random()-.5)*.24)));}
  };
  const baseStart = $('start').onclick;
  $('start').onclick=()=>{
    if(!rows.size)return baseStart();
    for(const r of [player,...bots])Object.assign(r,{units:0,correct:0,reaction:0,motion:0,spin:0,recovery:0,velocity:90,responded:false,damageErrors:0,damaged:false,repairStreak:0,comeback:0});
    pendingFinish=0;closing=false;chain=0;bonusCount=0;
    active=true;baseStart();hud();
  };
  const baseCross = crossGate;
  crossGate=function(){
    if(active&&task){
      const good=task.options[Math.max(0,Math.min(lanes-1,Math.round(visualLane)))]===task.answer;
      const reaction=good?Math.max(0,duration-held):duration;
      player.units+=answerCredit(player,good,reaction,duration);player.correct+=Number(good);player.reaction+=reaction;
      if(!good)skid(player);
      chain=good?chain+1:0;
      if(chain>0&&chain%5===0){
        bonusCount++;
        for(const b of bots){skid(b);b.spin=1.05;b.recovery=1.65;b.spinSlow=55;b.velocity=55;}
        globalThis.RallyRelease?.celebrateChain(chain);
      }
      for(const b of bots){b.units+=answerCredit(b,b.good,b.solveAt,duration);b.correct+=Number(b.good);b.reaction+=b.good?b.solveAt:duration;}
    }
    baseCross();if(player.spin>0)speed=player.spinSlow||32;hud();
  };
  const baseFinish = finish;
  finish=function(completed){
    if(completed&&!closing&&[player,...bots].some(r=>r.spin>0)){pendingFinish=2;return;}
    pendingFinish=0;
    baseFinish(completed);
    if(!active)return;
    active=false;
    if(!completed){hud();return;}
    const order=ranking(), playerRank=order.findIndex(r=>r.player)+1;
    const box=document.createElement('section');box.className='podium';box.setAttribute('aria-label','Rennpodium');
    const h=document.createElement('h3');h.textContent=order[0].player?'🏆 Du gewinnst die Rally!':`🏆 ${order[0].name} gewinnt!`;box.append(h);
    const stage=document.createElement('div');stage.className='podium-stage';
    for(const idx of [1,0,2]){const r=order[idx],column=document.createElement('div');column.className=`podium-step rank-${idx+1}`;column.style.borderColor=r.color;const name=document.createElement('strong');name.textContent=r.name;const number=document.createElement('b');number.textContent=idx+1;const detail=document.createElement('small');detail.textContent=`${r.correct}/25 richtig`;column.append(name,number,detail);stage.append(column)}
    box.append(stage);const result=document.createElement('p');result.textContent=`Dein Platz: ${playerRank} von 4. `+order.map((r,i)=>`${i+1}. ${r.name}: ${r.display.toFixed(2)} Rennwertung`).join(' · ');box.append(result);$('feedback').append(box);hud();
  };
  const baseDraw=drawObstacles;
  drawObstacles=function(){
    baseDraw();if(!active)return;
    const preview=entries(true),p=preview.find(r=>r.player);
    for(let i=0;i<bots.length;i++){
      const b=preview.find(r=>r.name===bots[i].name),lead=b.display-p.display;
      const z=Math.max(.43,Math.min(.93,.74-lead*.045));
      // Decorative lanes are independent of arithmetic answers: no solution hints.
      const visual=i*(lanes-1)/2,point=proj(visual,z);
      ctx.save();ctx.globalAlpha=.38;ctx.translate(point.x,point.y);
      if(b.spin>0){ctx.translate(Math.sin((1.6-b.spin)*12)*12*point.s,0);ctx.rotate((1.6-b.spin)/1.6*Math.PI*4);}
      car(0,0,point.s*.64,b.color,false);if(b.damaged)damageMarks(0,0,point.s*.64);ctx.restore();
      text(b.name,point.x,point.y-63*point.s,Math.max(10,13*point.s),'#d3e3e9');
      if(b.spin>0)text('SCHLEUDERT!',point.x,point.y+35*point.s,11,'#ffd299');
    }
  };
  const baseTick=tick;
  tick=function(dt){
    if(!running||paused){baseTick(dt);return;}
    baseTick(dt);
    if(!active)return;
    for(const r of [player,...bots]){
      if(!r.player&&task&&!r.responded&&elapsed>=r.solveAt){r.responded=true;if(!r.good)skid(r);}
      const spinning=r.spin>0;r.spin=Math.max(0,r.spin-dt);
      r.recovery=Math.max(0,r.recovery-dt);
      const desired=r.player?speed:task&&r.responded&&r.good?135:95;
      const adjusted=desired*(!r.player&&r.damaged?.95:1);const target=spinning?(r.spinSlow||32):r.recovery>0?65:adjusted;
      r.velocity+=(target-r.velocity)*Math.min(1,dt*3);
      if(r.player&&r.recovery>0)speed=r.velocity;
      r.motion+=(r.velocity-95)*dt/220;
    }
    if(pendingFinish>0){pendingFinish-=dt;if(pendingFinish<=0){closing=true;finish(true);closing=false;}}
    hud();
  };
  const baseCar=car;
  function damageMarks(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#252b30';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-19,-47);ctx.lineTo(-7,-40);ctx.lineTo(-14,-32);ctx.moveTo(8,27);ctx.lineTo(20,35);ctx.stroke();ctx.strokeStyle='#e0e9ee';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-17,-45);ctx.lineTo(-5,-38);ctx.stroke();ctx.fillStyle='#84939988';for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-14+i*8,-68-i*9,5+i*2,0,Math.PI*2);ctx.fill();}ctx.restore();}

  car=function(x,y,s,c,isPlayer=false){
    if(!isPlayer||player.spin<=0){baseCar(x,y,s,c,isPlayer);if(isPlayer&&player.damaged)damageMarks(x,y,s);return;}
    ctx.save();ctx.translate(x+Math.sin((1.6-player.spin)*12)*12,y);
    ctx.rotate((1.6-player.spin)/1.6*Math.PI*4);
    baseCar(0,0,s,c,true);if(player.damaged)damageMarks(0,0,s);ctx.restore();
    ctx.strokeStyle='#b6bbc755';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-18,y+45);ctx.lineTo(x-30,y+90);ctx.moveTo(x+18,y+45);ctx.lineTo(x+30,y+90);ctx.stroke();
  };
  hud();
  globalThis.RallyRivals={player,bots,ranking,credit,damageAnswer,answerCredit,get chain(){return chain},get bonusCount(){return bonusCount}};
})();

