const assert=require('node:assert/strict'),Planner=require('./dist/learning.js'),fs=require('fs'),vm=require('vm');
let p=new Planner(),seen=new Set();const rows=Array.from({length:10},(_,i)=>i+1);
for(let race=0;race<8;race++){p=new Planner(p.export());p.start();for(let n=0;n<25;n++){const f=p.choose(rows,'mix');assert(!seen.has(f.key),'Solved fact repeated before completing pool');seen.add(f.key);p.answer(f,true)}}assert.equal(seen.size,200);assert.equal(p.stats(rows,'mix').solved,200);
p.start();assert(p.choose(rows,'mix'));assert.equal(p.cycle,2);
p=new Planner();p.start();const wrong=p.choose(rows,'mul',()=>0);p.answer(wrong,false);for(let i=0;i<3;i++){const f=p.choose(rows,'mul',()=>0);assert.notEqual(f.key,wrong.key);p.answer(f,true)}let retry=false;for(let i=0;i<5;i++){const f=p.choose(rows,'mul',()=>0);if(f.key===wrong.key)retry=true;p.answer(f,true)}assert(retry,'Wrong fact must return later');
// Ten selected facts still supply exactly 25 slots through pool rollover.
p=new Planner();p.start();for(let i=0;i<25;i++)p.answer(p.choose([2],'div'),true);
let source=fs.readFileSync('test-rally.cjs','utf8');source=source.replace('const run=c=>vm.runInContext(c,sandbox);',"vm.runInContext(fs.readFileSync('dist/learning.js','utf8'),sandbox);vm.runInContext(fs.readFileSync('dist/training.js','utf8'),sandbox);const run=c=>vm.runInContext(c,sandbox);");
source+=`run("$('start').onclick()");assert.equal(run('task.a'),run('Number(task.trainingKey.split(\":\")[1])'));assert.equal(run('task.b'),run('Number(task.trainingKey.split(\":\")[2])'));console.log('Gespeicherter Trainingsplan und exakte Aufgabenintegration geprüft.');`;
vm.runInNewContext(source,{require,console,__dirname});console.log('200 unterschiedliche Fakten über acht Rennen, Fehlerabstand und kleiner Aufgabenpool geprüft.');
