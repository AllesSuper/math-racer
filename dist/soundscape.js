/* Quiet, synthesized feedback; no audio downloads and no autoplay. */
(() => {
  let level=.35,lastNitro=0,lastShield=0;
  function tone(frequency,delay=0,length=.15,gain=.03,end=frequency){
    if(!sound||!audio||audio.state!=='running')return;
    const t=audio.currentTime+delay,o=audio.createOscillator(),g=audio.createGain();
    o.type='sine';o.frequency.setValueAtTime(frequency,t);o.frequency.exponentialRampToValueAtTime(Math.max(30,end),t+length);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain*level,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+length);
    o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+length+.02);
    o.onended=()=>{o.disconnect();g.disconnect()};
  }
  beep=function(f){if(f===880||f===180)return;tone(f,0,.12,.02);};
  $('volume').oninput=()=>{level=Number($('volume').value)/100;};
  const start=$('start').onclick;$('start').onclick=()=>{start();if(running){tone(392,0,.14);tone(523,.12,.16);lastNitro=0;lastShield=0;}};
  const finishBase=finish;finish=function(completed){finishBase(completed);if(!running&&completed){[523,659,784].forEach((f,i)=>tone(f,i*.13,.22,.022));}};
  const baseTick=tick;tick=function(dt){baseTick(dt);const a=RallyAdventure.state;
    if(a.engineGain&&audio)a.engineGain.gain.setTargetAtTime(sound&&running&&!paused?.012*level:0,audio.currentTime,.12);
    if(running&&!paused&&a.nitroTime>lastNitro)tone(220,0,.45,.022,700);
    // Shield rewards are silent too: answering an arithmetic task never triggers a tone.
    lastNitro=a.nitroTime;lastShield=shield;
  };
})();
