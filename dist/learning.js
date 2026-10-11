/* Persistent coverage planner. Ordered multiplication and division are separate facts. */
(function(root){
class Planner {
  constructor(data={}){data=data&&typeof data==='object'?data:{};const safe=v=>Number.isFinite(Number(v))?Math.max(0,Math.floor(Number(v))):0;this.records={};for(const [key,r] of Object.entries(data.records||{})){if(/^(mul|div):([1-9]|10):([1-9]|10)$/.test(key)&&r&&typeof r==='object')this.records[key]={solved:r.solved===true,errors:safe(r.errors),due:safe(r.due),attempts:safe(r.attempts)};}this.serial=safe(data.serial);this.cycle=Math.max(1,safe(data.cycle));this.roundSolved=new Set();this.last=null;this.count=0;}
  start(){this.roundSolved.clear();this.last=null;this.count=0;}
  pool(rows,mode){return rows.flatMap(a=>Array.from({length:10},(_,i)=>i+1).flatMap(b=>(mode==='mix'?['mul','div']:[mode]).map(op=>({a,b,op,key:`${op}:${a}:${b}`}))));}
  choose(rows,mode,rng=Math.random){
    const pool=this.pool(rows,mode);if(!pool.length)throw Error('Keine Reihen ausgewählt');
    const rec=f=>this.records[f.key]||{};
    let open=pool.filter(f=>!rec(f).solved&&!this.roundSolved.has(f.key));
    if(!open.length){
      // Finish coverage before revisiting mastered facts. Keep this race's wins excluded.
      this.cycle++;for(const f of pool){if(this.records[f.key])this.records[f.key].solved=false;}
      open=pool.filter(f=>!this.roundSolved.has(f.key));
      if(!open.length)open=pool; // A 10-fact selection cannot supply 25 distinct wins.
    }
    const fresh=open.filter(f=>!rec(f).errors),retry=open.filter(f=>rec(f).errors&&(rec(f).due||0)<=this.serial);
    const useRetry=retry.length&&(this.count%3===2||!fresh.length);let options=useRetry?retry:fresh.length?fresh:open;
    if(options.length>1)options=options.filter(f=>f.key!==this.last);
    if(useRetry)options=[...options].sort((a,b)=>(rec(a).due||0)-(rec(b).due||0)).slice(0,1);
    const chosen=options[Math.floor(rng()*options.length)];this.last=chosen.key;this.count++;return chosen;
  }
  answer(f,good){this.serial++;const r=this.records[f.key]||{errors:0};r.solved=good;r.attempts=(r.attempts||0)+1;
    if(good){this.roundSolved.add(f.key);r.errors=0;}else{r.errors++;r.due=this.serial+3;}this.records[f.key]=r;}
  stats(rows,mode){const p=this.pool(rows,mode);return{solved:p.filter(f=>this.records[f.key]?.solved).length,total:p.length,errors:p.filter(f=>this.records[f.key]?.errors).length,cycle:this.cycle};}
  export(){return{records:this.records,serial:this.serial,cycle:this.cycle};}
}
root.RallyPlanner=Planner;if(typeof module!=='undefined')module.exports=Planner;
})(typeof globalThis!=='undefined'?globalThis:this);
