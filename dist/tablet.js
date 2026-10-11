(() => {
  if(typeof window==='undefined')return;
  // Preserve logical drawing coordinates while sharpening Retina output at a bounded cost.
  function resolution(){const ratio=Math.min(1.5,window.devicePixelRatio||1);canvas.width=Math.round(1000*ratio);canvas.height=Math.round(700*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);}
  if(typeof ctx.roundRect!=='function')ctx.roundRect=function(x,y,w,h){this.rect(x,y,w,h)};resolution();window.addEventListener('resize',resolution);
  const start=$('start').onclick;$('start').onclick=()=>{start();document.body.classList.toggle('playing',running);if(running){$('road').scrollIntoView({block:'start',behavior:'smooth'});if(audio?.state==='suspended')audio.resume().catch(()=>{});}};
  // Touch controls use the same repeat clock as the keyboard. Capture prevents stuck steering.
  function steerButton(id,dir){const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();if(!running||paused)return;b.setPointerCapture(e.pointerId);pick(lane+dir);RallyAdventure.state.key=dir;RallyAdventure.state.repeat=.25;});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>{RallyAdventure.state.key=0;});}
  steerButton('steer-left',-1);steerButton('steer-right',1);
  const tickBase=tick;tick=function(dt){tickBase(dt);document.body.classList.toggle('playing',running);};
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)$('calm').checked=true;
})();

