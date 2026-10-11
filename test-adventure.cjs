// Reuse the full regression environment, then assert adventure-specific interactions.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let source=fs.readFileSync('test-rally.cjs','utf8');
source += `
run("$('start').onclick();RallyAdventure.state.nitro=60");
run('RallyAdventure.activateNitro()');assert.equal(run('RallyAdventure.state.nitro'),60); // No boost through arithmetic gates.
run('task=null;gap=3;RallyAdventure.activateNitro()');assert.equal(run('RallyAdventure.state.nitro'),30);assert(run('RallyAdventure.state.nitroTime')>0);
run('traffic=[{lane:1,z:.8,type:"ramp",hit:false}];lane=1;visualLane=1;tick(.016)');assert.equal(run('RallyAdventure.state.jumps'),1);assert(run('RallyAdventure.state.jump')>0);
run('traffic=[{lane:1,z:.8,type:"magnet",hit:false}];tick(.016)');assert(run('RallyAdventure.state.magnet')>0);
run('traffic=[{lane:3,z:.8,type:"coin",hit:false}];tick(.016)');assert.equal(run('RallyAdventure.state.stars'),1);
run('togglePause()');const reserve=run('RallyAdventure.state.nitroTime');run('tick(.5)');assert.equal(run('RallyAdventure.state.nitroTime'),reserve);
run('togglePause();render(.016)');
run('history=[{good:false}];next()');assert.equal(run('duration'),10);
run("$('start').onclick();RallyAdventure.state.key=1;RallyAdventure.state.repeat=.1;tick(.12)");assert.equal(run('lane'),2);
// Every decorative branch renders without a canvas API exception in the mock.
for(const vehicle of ['sport','offroad','rescue'])for(const feature of M.sectors.map(s=>s.feature)){
 run('RallyAdventure.state.vehicle='+JSON.stringify(vehicle)+';sector=RallyMath.sectors.find(s=>s.feature==='+JSON.stringify(feature)+');render(.016)');
}
console.log('Nitro-Sperre beim Rechnen, Rampen, Magnet, adaptive Torzeit, gehaltene Lenktasten und drei Fahrzeugdarstellungen geprüft.');
`;
const context={require,console,__dirname:__dirname};vm.createContext(context);vm.runInContext(source,context);

