const fs=require('fs'),assert=require('assert/strict'),Planner=require('./dist/learning.js');
const p=new Planner({serial:Infinity,cycle:'bad',records:{'mul:2:2':{errors:Infinity,due:'bad'},oops:{solved:true}}});assert.equal(p.serial,0);assert.equal(p.records['mul:2:2'].errors,0);assert.equal(p.records.oops,undefined);
const q=new Planner({serial:10,records:{'mul:2:2':{errors:1,due:2},'mul:2:3':{errors:1,due:4}}});q.count=2;assert.equal(q.choose([2],'mul',()=>.99).key,'mul:2:2');
let s=fs.readFileSync('test-full.cjs','utf8');s=s.replace("assert.equal(run('running'),false);", "assert.equal(run('running'),false);assert(el('feedback').children.some(e=>e.className==='learning-report')); ");fs.writeFileSync('test-full.cjs',s);
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.js')))new (require('vm').Script)(fs.readFileSync('dist/'+file,'utf8'),{filename:file});
console.log('Beschädigte Lernstände, älteste Fehleraufgabe und Syntax aller Module geprüft.');
