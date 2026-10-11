/* Readable racing feedback and private, device-local race history. */
(() => {
  const key='rally-highscores-v1';
  let previousRank=0, rankTimer=0, chainTimer=0, pendingRank=0, pendingAge=0, raceSaved=false;
  const rankNotice=document.createElement('div');rankNotice.className='rank-notice';rankNotice.hidden=true;rankNotice.setAttribute('role','status');
  const chainNotice=document.createElement('div');chainNotice.className='chain-notice';chainNotice.hidden=true;chainNotice.setAttribute('role','status');
  const chainMeter=document.createElement('div');chainMeter.className='chain-meter';
  const game=document.querySelector('.game');game.append(rankNotice,chainNotice,chainMeter);
  const scoresBox=document.createElement('section');scoresBox.className='highscores';scoresBox.setAttribute('aria-label','Deine Highscores');
  document.querySelector('main').append(scoresBox);
  function stored(){const data=read(key,[]);return Array.isArray(data)?data.filter(r=>r&&Number.isFinite(r.points)&&r.points>=0&&typeof r.date==='string'&&Number.isFinite(Date.parse(r.date))).slice(0,100):[];}
  function drawScores(target=scoresBox,latest=null){
    target.replaceChildren();const title=document.createElement('h2');title.textContent='Deine Highscores';target.append(title);
    const note=document.createElement('p');note.textContent='Abgeschlossene Rennen · auf diesem Gerät gespeichert · mit Datum und Rennbedingungen';target.append(note);
    const entries=stored().sort((a,b)=>b.points-a.points||b.correct-a.correct||a.date.localeCompare(b.date));
    if(!entries.length){const empty=document.createElement('p');empty.textContent='Dein erstes Ziel wartet. Beende ein Rennen und sichere dir deinen ersten Highscore!';target.append(empty);return;}
    const wrap=document.createElement('div');wrap.className='score-scroll';const table=document.createElement('table');
    const head=document.createElement('tr');for(const text of ['Platz','Punkte / richtig','Datum','Rennen']){const cell=document.createElement('th');cell.textContent=text;head.append(cell);}table.append(head);
    entries.slice(0,20).forEach((r,i)=>{const row=document.createElement('tr');if(r.id===latest)row.className='latest-score';
      const date=new Date(r.date).toLocaleString('de-DE',{dateStyle:'short',timeStyle:'short'});
      const values=[`${i+1}${r.id===latest?' · NEU':''}`,`${r.points.toLocaleString('de-DE')} · ${r.correct}/25`,date,`${r.mode==='mul'?'Mal':r.mode==='div'?'Geteilt':'Gemischt'} · ${r.limit}s · ${r.drive} · Reihen ${(r.rows||[]).join(', ')}`];
      for(const value of values){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}table.append(row);
    });wrap.append(table);target.append(wrap);
    if(latest&&!entries.slice(0,20).some(r=>r.id===latest)){const p=document.createElement('p'),index=entries.findIndex(r=>r.id===latest);p.textContent=index<0?'Dieses Rennen liegt außerhalb deiner gespeicherten Top 100.':`Dieses Rennen: Platz ${index+1} deiner gespeicherten Rennen.`;target.append(p);}
  }
  function rank(place,active){
    if(!active){previousRank=0;pendingRank=0;return;}
    if(!previousRank){previousRank=place;return;}
    if(place===previousRank){pendingRank=0;pendingAge=0;return;}
    if(pendingRank!==place){pendingRank=place;pendingAge=0;}
  }
  function celebrateChain(count){chainTimer=2.6;chainNotice.textContent=`${count} RICHTIGE IN FOLGE! Rivalen schleudern – deine Chance!`;chainNotice.hidden=false;}
  globalThis.RallyRelease={rank,celebrateChain,stored};
  const start=$('start').onclick;$('start').onclick=()=>{start();if(running){raceSaved=false;previousRank=0;pendingRank=0;pendingAge=0;rankTimer=0;chainTimer=0;rankNotice.hidden=true;chainNotice.hidden=true;}};
  const baseFinish=finish;finish=function(completed){
    const wasRunning=running;baseFinish(completed);
    if(!completed||running||!wasRunning||raceSaved||total!==25)return;
    raceSaved=true;
    const entries=stored(),best=entries.reduce((n,r)=>Math.max(n,r.points),0);
    const result={id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),points:score,correct,date:new Date().toISOString(),mode,rows:[...rows].sort((a,b)=>a-b),drive,limit,rank:RallyRivals.ranking().findIndex(r=>r.player)+1};
    entries.push(result);entries.sort((a,b)=>b.points-a.points||b.correct-a.correct||a.date.localeCompare(b.date));save(key,entries.slice(0,100));
    const panel=document.createElement('section');panel.className='highscores result-scores';drawScores(panel,result.id);
    const message=document.createElement('p');message.className='score-message';message.textContent=score>best?'NEUER PUNKTEREKORD!':`Dein Bestwert: ${best.toLocaleString('de-DE')} Punkte · noch ${Math.max(0,best-score)} bis zum Rekord.`;
    panel.prepend(message);$('feedback').append(panel);drawScores();
  };
  const baseTick=tick;tick=function(dt){baseTick(dt);if(!running||paused)return;
    if(pendingRank){pendingAge+=dt;if(pendingAge>=.45){const gained=pendingRank<previousRank;rankNotice.textContent=`${gained?'↑ ÜBERHOLT!':'↓ ÜBERHOLT WORDEN'} Platz ${pendingRank} von 4`;rankNotice.className=`rank-notice ${gained?'gained':'lost'}`;rankNotice.hidden=false;rankTimer=2.2;previousRank=pendingRank;pendingRank=0;pendingAge=0;}}
    rankTimer=Math.max(0,rankTimer-dt);chainTimer=Math.max(0,chainTimer-dt);rankNotice.hidden=rankTimer<=0;chainNotice.hidden=chainTimer<=0;
    const count=RallyRivals.chain%5;chainMeter.textContent=`${'●'.repeat(count)}${'○'.repeat(5-count)}  ${count}/5 · Rivalen-Bonus`;
  };
  // Extra body detail uses original canvas geometry, preserving vehicle types and garage parts.
  RallyRelease.detailCar=function(c){
    const paint=ctx.createLinearGradient(-27,0,27,0);paint.addColorStop(0,'#0005');paint.addColorStop(.3,'#ffffff44');paint.addColorStop(.5,'#ffffff08');paint.addColorStop(1,'#0007');
    ctx.fillStyle=paint;ctx.beginPath();ctx.roundRect(-27,-60,54,113,12);ctx.fill();
    // Sculpted shoulders, mirrors, hood vents, continuous rear light and diffuser.
    for(const side of [-1,1]){ctx.fillStyle=c;ctx.beginPath();ctx.roundRect(side<0?-34:25,-23,9,9,3);ctx.fill();ctx.fillStyle='#07171e';ctx.fillRect(side<0?-23:17,-45,6,11);ctx.fillStyle='#e9f8ff';ctx.fillRect(side<0?-23:10,-54,13,3);}
    poly([[-17,-27],[17,-27],[13,-14],[-13,-14]],'#93c6d7');
    poly([[-14,-25],[8,-25],[-6,-15],[-14,-15]],'#e3f8ff66');
    ctx.fillStyle='#10232d';ctx.fillRect(-17,27,34,10);ctx.fillStyle='#ff6479';ctx.fillRect(-22,44,44,3);
    ctx.fillStyle='#061116';ctx.fillRect(-20,50,40,5);for(const a of [-12,0,12])ctx.fillRect(a,48,2,8);
  };
  drawScores();
})();
