const fs=require('node:fs'),vm=require('node:vm');
let source=fs.readFileSync('test-rally.cjs','utf8');
source=source.replace("const run=c=>vm.runInContext(c,sandbox);","vm.runInContext(fs.readFileSync('dist/rivals.js','utf8'),sandbox);const run=c=>vm.runInContext(c,sandbox);");
source+=`
while(run('running'))run('tick(.05)');assert.equal(run('RallyRivals.player.units'),0);
assert.equal(run('RallyRivals.ranking().findIndex(r=>r.player)'),3);
assert.equal(run('RallyRivals.credit(false,0,8)'),0);
assert(run('RallyRivals.credit(true,1,8)')>run('RallyRivals.credit(true,6,8)'));
assert(el('feedback').children.some(e=>e.className==='podium'));
assert(run('RallyRivals.bots.every(b=>b.units>=0&&b.units<=37.5&&b.correct<=25)'));
run("$('start').onclick()");
for(let i=0;i<25;i++){
 run('pick(task.options.indexOf(task.answer));RallyRivals.bots.forEach(b=>{b.good=true;b.solveAt=duration*.6})');
 for(let j=0;j<400&&run('task!==null&&running');j++)run('tick(.05)');
 while(i<24&&run('task===null&&running'))run('tick(.05)');
}
assert(run('RallyRivals.ranking()[0].player'));
assert.equal(run('RallyRivals.player.correct'),25);
assert(el('feedback').children.some(e=>e.className==='podium'));
run('render(.016)');
run("$('start').onclick();finish(false)");
assert(!el('feedback').children.some(e=>e.className==='podium'));
run("$('start').onclick();RallyRivals.bots[0].good=false;RallyRivals.bots[0].solveAt=.1;tick(.2)");
assert(run('RallyRivals.bots[0].spin')>0);
assert(run('RallyRivals.bots[0].velocity')<50);
const botMotion=run('RallyRivals.bots[0].motion');run('tick(.1)');assert(run('RallyRivals.bots[0].motion')<botMotion);
run('pick(task.options.findIndex(v=>v!==task.answer));visualLane=lane;crossGate()');
assert.equal(run('RallyRivals.player.spin'),1.6);assert.equal(run('speed'),32);
run('togglePause()');const spin=run('RallyRivals.player.spin');run('tick(.2)');assert.equal(run('RallyRivals.player.spin'),spin);
run('togglePause()');for(let i=0;i<60;i++)run('tick(.05)');assert.equal(run('RallyRivals.player.spin'),0);assert(run('speed')>32);
run('render(.016)');
// A last-gate mistake still animates before the podium is finalized.
run("$('start').onclick();total=24;pick(task.options.findIndex(v=>v!==task.answer));visualLane=lane;crossGate()");
assert(run('running'));assert(!el('feedback').children.some(e=>e.className==='podium'));
for(let i=0;i<45;i++)run('tick(.05)');assert(!run('running'));assert(el('feedback').children.some(e=>e.className==='podium'));
console.log('Geisterrennen und Schleudern geprüft: Tempoverlust, Rückstand, Erholung, Pause und Dreher vor dem finalen Podium.');
`;
const context={require,console,__dirname};vm.createContext(context);vm.runInContext(source,context);

