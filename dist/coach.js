(() => {
  let used=false,helpCount=0,log=[];
  function tip(t){
    if(t.division)return `Umkehren hilft: Welche Zahl × ${t.a} ergibt ${t.a*t.b}? Denke an die ${t.a}er-Reihe.`;
    if(t.a>5)return `Zerlege ${t.a} in 5 + ${t.a-5}: Rechne 5 × ${t.b} und ${t.a-5} × ${t.b}. Addiere beide Ergebnisse.`;
    if(t.a%2===0)return `Verdoppeln hilft: Rechne zuerst ${t.a/2} × ${t.b}. Verdopple danach dein Ergebnis.`;
    if(t.a===1)return `Eine Gruppe mit ${t.b} Dingen: Wie viele Dinge sind es insgesamt?`;
    return `Denke in Gruppen: ${t.a} Gruppen mit je ${t.b} Dingen. Addiere ${Array(t.a).fill(t.b).join(' + ')}.`;
  }
  function help(){if(!running||paused||!task||used)return;used=true;helpCount++;duration+=3;toast('RECHENTIPP · +3 SEKUNDEN',tip(task),3.5);$('coach-use').disabled=true;}
  $('coach-use').onclick=help;document.addEventListener('keydown',e=>{if(!e.repeat&&e.key.toLowerCase()==='h'&&!['INPUT','SELECT'].includes(e.target.tagName))help()});
  const start=$('start').onclick;$('start').onclick=()=>{if(rows.size){helpCount=0;log=[];}start()};
  const nextBase=next;next=function(){nextBase();used=false;$('coach-use').disabled=false;};
  const cross=crossGate;crossGate=function(){if(task)log.push({division:task.division,good:task.options[Math.round(visualLane)]===task.answer,help:used,text:task.text.replace('?',task.answer)});cross();$('coach-use').disabled=true;};
  const finishBase=finish;finish=function(completed){finishBase(completed);if(running)return;const box=document.createElement('section');box.className='learning-report';const h=document.createElement('h3');h.textContent='Dein Lernbericht';box.append(h);
    for(const [label,division] of [['Multiplikation',false],['Division',true]]){const tasks=log.filter(t=>t.division===division),good=tasks.filter(t=>t.good).length;const p=document.createElement('p');p.textContent=`${label}: ${good}/${tasks.length} richtig${tasks.length?' · '+Math.round(good/tasks.length*100)+' %':''}`;box.append(p);}
    const p=document.createElement('p');p.textContent=`${helpCount} Rechentipps genutzt. `+(log.length&&log.filter(t=>t.good).length/log.length<.7?'Probier für die nächste Runde die entspannte Rally.':'Behalte dein Tempo bei und arbeite den Aufgabenpool weiter durch.');box.append(p);$('feedback').append(box);};
  // Plausible misconceptions instead of mostly unrelated random values.
  const originalTask=RallyMath.task;RallyMath.task=function(rows,mode,rng=Math.random,count=4){const t=originalTask(rows,mode,rng,count);const candidates=t.division?[t.b-1,t.b+1,t.a,Math.round(t.a*t.b/(t.a+1)),Math.round(t.a*t.b/Math.max(1,t.a-1))]:[t.a*(t.b-1),t.a*(t.b+1),(t.a-1)*t.b,(t.a+1)*t.b,t.a+t.b,t.answer-1,t.answer+1];const wrong=[...new Set(candidates)].filter(v=>Number.isInteger(v)&&v>0&&v<=(t.division?10:100)&&v!==t.answer);const fill=RallyMath.shuffle(Array.from({length:t.division?10:100},(_,i)=>i+1),rng);for(const v of fill)if(v!==t.answer&&!wrong.includes(v)&&v>0&&v<=(t.division?10:100))wrong.push(v);t.options=RallyMath.shuffle([t.answer,...RallyMath.shuffle(wrong.slice(0,Math.max(count-1,5)),rng).slice(0,count-1)],rng);return t;};
  globalThis.RallyCoach={help,tip};
})();
