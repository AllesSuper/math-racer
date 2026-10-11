const fs=require('node:fs'),vm=require('node:vm');
let source=fs.readFileSync('test-rally.cjs','utf8');
source=source.replace('const run=c=>vm.runInContext(c,sandbox);',"vm.runInContext(fs.readFileSync('dist/rivals.js','utf8'),sandbox);vm.runInContext(fs.readFileSync('dist/strategy.js','utf8'),sandbox);const run=c=>vm.runInContext(c,sandbox);");
source+=`
while(run('running'))run('tick(.05)');
run("$('start').onclick();RallyStrategy.state.joker=1;RallyStrategy.joker()");
assert.equal(run('RallyStrategy.state.joker'),0);assert.equal(run('RallyStrategy.state.hidden.size'),1);
assert(!run('RallyStrategy.state.hidden.has(task.options.indexOf(task.answer))'));
run('next()');assert.equal(run('RallyStrategy.state.hidden.size'),0);
run('shield=1;RallyStrategy.arm()');assert.equal(run('shield'),0);assert.equal(run('RallyStrategy.state.guard'),6);
run('pick(task.options.findIndex(v=>v!==task.answer));visualLane=lane;crossGate()');assert.equal(run('RallyRivals.player.spin'),.5);assert.equal(run('speed'),65);assert.equal(run('RallyStrategy.state.guard'),0);
run('RallyStrategy.pulse("skid")');
run("$('start').onclick();RallyAdventure.state.magnet=10;lane=0;visualLane=0;tick(.05)");assert(Math.abs(run('visualLane'))<.5);
run('render(.016)');
console.log('Joker, Antwortschutz, begrenzte Magnethilfe und fehlende Vibrationshardware geprüft.');
`;
vm.runInNewContext(source,{require,console,__dirname});
