const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let setup=fs.readFileSync('test-rally.cjs','utf8').split('run("$(\'start\').onclick()")')[0];
setup=setup.replace('append(...xs){','prepend(...xs){this.children.unshift(...xs)}append(...xs){');
setup=setup.replace('createElement:()=>new E(),','createElement:()=>new E(),querySelector:selector=>el(selector),');
setup=setup.replace("const run=c=>vm.runInContext(c,sandbox);", "vm.runInContext(fs.readFileSync('dist/rivals.js','utf8'),sandbox);vm.runInContext(fs.readFileSync('dist/release.js','utf8'),sandbox);const run=c=>vm.runInContext(c,sandbox);");
setup+=`
run("$('start').onclick()");
for(let i=0;i<4;i++){run('visualLane=task.options.indexOf(task.answer);lane=visualLane;held=3;crossGate();next()');}
assert.equal(run('RallyRivals.bonusCount'),0);
run('visualLane=task.options.indexOf(task.answer);lane=visualLane;held=3;crossGate()');
assert.equal(run('RallyRivals.bonusCount'),1);assert(run('RallyRivals.bots.every(b=>b.spin===1.05&&b.velocity===55)'));
run('togglePause()');run('tick(.3)');assert.equal(run('RallyRivals.bots[0].spin'),1.05);run('togglePause();tick(.3)');assert(run('RallyRivals.bots[0].spin')<1.05);
run('next();visualLane=task.options.findIndex(v=>v!==task.answer);lane=visualLane;crossGate()');assert.equal(run('RallyRivals.chain'),0);
run("$('start').onclick();RallyRivals.player.units=0;RallyRivals.bots.forEach(b=>b.units=200)");for(let i=0;i<12;i++)run('tick(.05)');
run('RallyRivals.player.units=300');for(let i=0;i<12;i++)run('tick(.05)');
assert(el('.game').children.some(e=>e.className==='rank-notice gained'&&!e.hidden));
run('RallyRivals.bots.forEach(b=>b.units=400)');for(let i=0;i<12;i++)run('tick(.05)');
assert(el('.game').children.some(e=>e.className==='rank-notice lost'&&!e.hidden));
run('finish(false)');assert.equal(run('RallyRelease.stored().length'),0);
run("$('start').onclick()");
for(let i=0;i<25;i++){run('visualLane=task.options.indexOf(task.answer);lane=visualLane;held=3;crossGate()');if(i<24)run('next()');}
while(run('running'))run('tick(.05)');
assert.equal(run('RallyRelease.stored().length'),1);assert.equal(run('RallyRelease.stored()[0].correct'),25);assert(run('RallyRelease.stored()[0].points')>0);
run('finish(true)');assert.equal(run('RallyRelease.stored().length'),1);
run("localStorage.setItem('rally-highscores-v1','broken')");assert.equal(run('RallyRelease.stored().length'),0);
assert(!fs.readFileSync('dist/app.js','utf8').includes('beep(880)'));assert(!fs.readFileSync('dist/app.js','utf8').includes('beep(180)'));
console.log('Fünfer-Serie, Reset bei Fehler, Rivalen-Dreher, Pause, vollständiger Zieleinlauf, Highscores, Doppelspeicherung und beschädigter Speicher geprüft.');
`;
const testContext={require,console,__dirname};vm.createContext(testContext);vm.runInContext(setup,testContext);
