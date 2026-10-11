(() => {
  const planner=new RallyPlanner(read('rally-training-v1',{}));let fact=null;
  function status(){const s=planner.stats([...rows],mode);$('training-status').textContent=`${s.solved}/${s.total} Aufgaben geschafft · ${s.errors} zum Wiederholen · Durchlauf ${s.cycle}`;}
  function chooseTask(){
    fact=planner.choose([...rows],mode);
    // Reuse the tested arithmetic/options generator with the selected exact fact.
    let calls=0;const rng=()=>++calls===1?0:calls===2?(fact.b-.5)/10:Math.random();
    const t=RallyMath.task([fact.a],fact.op,rng,lanes);t.trainingKey=fact.key;
    save('rally-training-v1',planner.export());status();return t;
  }
  const start=$('start').onclick;$('start').onclick=()=>{if(rows.size)planner.start();start();status()};
  const cross=crossGate;crossGate=function(){if(fact&&task){const i=Math.max(0,Math.min(lanes-1,Math.round(visualLane)));planner.answer(fact,task.options[i]===task.answer);save('rally-training-v1',planner.export());}cross();status()};
  status();globalThis.RallyTraining={planner,chooseTask,status};
})();
