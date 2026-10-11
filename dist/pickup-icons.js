/* Code-native pickup artwork, crisp at every perspective scale. */
globalThis.RallyPickupIcon=function(type,x,y,scale){
  const colors={fuel:'#62e5ff',joker:'#c99aff',magnet:'#ffd46c',shield:'#85eac7'};
  const c=colors[type]||'#c5f277';
  ctx.save();ctx.translate(x,y);ctx.scale(Math.max(.38,scale),Math.max(.38,scale));
  ctx.fillStyle='#0005';ctx.beginPath();ctx.ellipse(0,6,28,9,0,0,Math.PI*2);ctx.fill();
  const glow=ctx.createRadialGradient(0,-24,4,0,-24,44);glow.addColorStop(0,c+'55');glow.addColorStop(1,c+'00');ctx.fillStyle=glow;ctx.fillRect(-44,-68,88,88);
  ctx.fillStyle='#132b3beb';ctx.strokeStyle=c;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(-27,-57,54,57,12);ctx.fill();ctx.stroke();
  ctx.lineJoin='round';ctx.lineCap='round';
  if(type==='fuel'){
    ctx.fillStyle='#bcc8da';ctx.strokeStyle='#10293a';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(-7,-52,14,8,2);ctx.fill();ctx.stroke();
    const paint=ctx.createLinearGradient(-15,0,15,0);paint.addColorStop(0,'#128bae');paint.addColorStop(.4,'#b6f8ff');paint.addColorStop(1,'#21b5d5');ctx.fillStyle=paint;ctx.beginPath();ctx.roundRect(-15,-45,30,39,9);ctx.fill();ctx.stroke();
    ctx.fillStyle='#15375c';ctx.fillRect(-14,-30,28,15);
    poly([[3,-33],[-6,-23],[0,-23],[-3,-13],[8,-26],[2,-26]],'#ffe077');
    ctx.strokeStyle='#e4ffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-9,-39);ctx.lineTo(-9,-33);ctx.stroke();
  }else if(type==='magnet'){
    ctx.strokeStyle='#15283b';ctx.lineWidth=17;ctx.beginPath();ctx.moveTo(-13,-42);ctx.lineTo(-13,-24);ctx.arc(0,-24,13,Math.PI,0,true);ctx.lineTo(13,-42);ctx.stroke();
    ctx.strokeStyle='#f07882';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(-13,-42);ctx.lineTo(-13,-24);ctx.arc(0,-24,13,Math.PI,0,true);ctx.lineTo(13,-42);ctx.stroke();
    ctx.strokeStyle='#dcecff';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(-13,-43);ctx.lineTo(-13,-36);ctx.moveTo(13,-43);ctx.lineTo(13,-36);ctx.stroke();
    ctx.strokeStyle='#ffe8a2';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-21,-45);ctx.lineTo(-25,-50);ctx.moveTo(21,-45);ctx.lineTo(25,-50);ctx.stroke();
  }else if(type==='joker'){
    poly([[-19,-19],[-22,-44],[-7,-35],[0,-50],[8,-35],[23,-44],[19,-19]],'#172238');
    poly([[-17,-20],[-20,-41],[-5,-32],[0,-46],[4,-20]],'#b984fb');
    poly([[0,-21],[7,-32],[20,-41],[17,-20]],'#ff91c4');
    for(const [bx,by] of [[-21,-43],[0,-48],[22,-43]]){ctx.fillStyle='#ffe393';ctx.beginPath();ctx.arc(bx,by,4,0,Math.PI*2);ctx.fill()}
    ctx.fillStyle='#ffe393';ctx.beginPath();ctx.roundRect(-20,-21,40,9,4);ctx.fill();
    ctx.fillStyle='#fff7c9';ctx.beginPath();ctx.arc(-12,-17,2,0,Math.PI*2);ctx.arc(0,-17,2,0,Math.PI*2);ctx.arc(12,-17,2,0,Math.PI*2);ctx.fill();
  }else if(type==='shield'){
    poly([[0,-48],[18,-41],[15,-19],[0,-8],[-15,-19],[-18,-41]],'#81eac7');
    poly([[0,-42],[11,-37],[9,-23],[0,-16],[-9,-23],[-11,-37]],'#255f69');
    ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-6,-29);ctx.lineTo(-1,-24);ctx.lineTo(8,-35);ctx.stroke();
  }
  ctx.restore();
};
