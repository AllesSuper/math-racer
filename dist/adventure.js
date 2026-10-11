/* Rally adventure layer: optional action only in the gaps between arithmetic gates. */
(() => {
  const state = { nitro: 0, nitroTime: 0, jump: 0, magnet: 0, stars: 0, jumps: 0,
    collisions: 0, maxStreak: 0, steer: 0, key: 0, repeat: 0, padLatch: 0,
    vehicle: 'sport', calm: false, adaptive: true, lastTotal: 0, missions: [],
    medals: read('rally-medals-v3', []), engine: null, engineGain: null };
  if (!Array.isArray(state.medals)) state.medals = [];
  const goals = [
    { id: 'accurate', name: 'Rechenmeister', detail: '20 Antworten richtig', target: 20, value: () => correct },
    { id: 'fast', name: 'Blitzpilot', detail: '8 Blitzantworten', target: 8, value: () => fastCount },
    { id: 'series', name: 'Teamkapitän', detail: '6 richtig in Folge', target: 6, value: () => state.maxStreak },
    { id: 'stars', name: 'Sternensammler', detail: '3 Sterne sammeln', target: 3, value: () => state.stars },
    { id: 'jump', name: 'Stuntpilot', detail: '2 Rampensprünge', target: 2, value: () => state.jumps }
  ];

  function passUI() {
    $('rally-pass').textContent = state.medals.length ? state.medals.map(id => goals.find(g => g.id === id)?.name).filter(Boolean).join(' · ') : 'Dein Rally-Pass wartet auf seine ersten Abzeichen.';
  }
  let missionSignature="";
  function missionUI() {
    const sig=state.missions.map(g=>g.id+":"+Math.min(g.target,g.value())).join("|");
    if(sig!==missionSignature){missionSignature=sig;
    $('mission-list').replaceChildren();
    for (const g of state.missions) {
      const item = document.createElement('div');
      const value = Math.min(g.target, g.value());
      item.textContent = `${value >= g.target ? '✓' : '◇'} ${g.name} ${value}/${g.target}`;
      item.title = g.detail;
      $('mission-list').append(item);
    }
    }
    $('nitro-fill').style.width = `${state.nitro}%`;
    $('nitro-label').textContent = state.nitroTime > 0 ? 'NITRO AKTIV' : `${Math.floor(state.nitro)}% · SHIFT`;
    $('nitro-button').disabled = !running || paused || !!task || state.nitro < 30;
  }
  function activateNitro() {
    if (!running || paused || task || state.nitro < 30 || state.nitroTime > 0) return;
    state.nitro -= 30; state.nitroTime = 1.8; globalThis.RallyStrategy?.pulse('bonus');
    beep(640);
  }
  $('nitro-button').onclick = activateNitro;
  passUI();

  const baseStart = $('start').onclick;
  $('start').onclick = () => {
    if (!rows.size) return baseStart();
    Object.assign(state, { nitro: 0, nitroTime: 0, jump: 0, magnet: 0, stars: 0,
      jumps: 0, collisions: 0, maxStreak: 0, steer: 0, key: 0, repeat: 0, lastTotal: 0,
      vehicle: $('vehicle').value || 'sport', calm: $('calm').checked,
      adaptive: $('adaptive').checked !== false });
    state.missions = [goals[0], goals[1], RallyMath.shuffle(goals.slice(2))[0]];
    baseStart();
    missionUI();
  };

  const baseNext = next;
  next = function () {
    state.nitroTime = 0; state.jump = 0;
    baseNext();
    if (state.adaptive && history.length && !history[history.length - 1].good) duration += 2;
    missionUI();
  };
  const baseCross = crossGate;
  crossGate = function () {
    const before = correct;
    baseCross();
    if (correct > before) state.nitro = Math.min(100, state.nitro + 18);
    state.maxStreak = Math.max(state.maxStreak, streak);
    missionUI();
  };
  const baseFinish = finish;
  finish = function (completed) {
    state.maxStreak = Math.max(state.maxStreak, streak);
    state.nitroTime = 0; state.jump = 0; state.key = 0;
    const achieved = completed ? state.missions.filter(g => g.value() >= g.target) : [];
    for (const g of achieved) {
      score += 150;
      if (!state.medals.includes(g.id)) state.medals.push(g.id);
    }
    save('rally-medals-v3', state.medals);
    baseFinish(completed);
    if (achieved.length) {
      const p = document.createElement('p');
      p.textContent = `Missionen: ${achieved.map(g => g.name).join(' · ')} · +${achieved.length * 150} Punkte`;
      $('feedback').append(p);
    }
    passUI(); missionUI();
  };

  // Browser keyboard autorepeat varies. Initial press is handled by app.js;
  // subsequent lane changes use a controlled timer and stop on key release.
  document.addEventListener('keydown', e => {
    if (['SELECT', 'INPUT'].includes(e.target.tagName)) return;
    if (['ArrowLeft', 'a', 'A'].includes(e.key)) { state.key = -1; if (!e.repeat) state.repeat = .25; }
    if (['ArrowRight', 'd', 'D'].includes(e.key)) { state.key = 1; if (!e.repeat) state.repeat = .25; }
    if (e.key === 'Shift') activateNitro();
  });
  document.addEventListener('keyup', e => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) state.key = 0;
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) state.key = 0; });
  if (typeof window !== 'undefined') window.addEventListener('blur', () => { state.key = 0; if (running && !paused) togglePause(); });

  // Immediate drag steering, instead of waiting for the end of a long swipe.
  let dragX = null;
  canvas.addEventListener('pointerdown', e => { dragX = e.clientX; });
  canvas.addEventListener('pointermove', e => {
    if (dragX === null || !running || paused) return;
    const delta = e.clientX - dragX;
    if (Math.abs(delta) > 34) { pick(lane + Math.sign(delta)); dragX = e.clientX; touchX = e.clientX; }
  });
  canvas.addEventListener('pointerup', () => { dragX = null; });
  canvas.addEventListener('pointercancel', () => { dragX = null; touchX = null; });

  function pad(dt) {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return;
    let pads;
    try { pads = navigator.getGamepads(); } catch { return; }
    const p = [...pads].find(Boolean);
    if (!p) return;
    const axis = p.axes[0] || 0;
    const dir = p.buttons[14]?.pressed ? -1 : p.buttons[15]?.pressed ? 1 : axis < -.55 ? -1 : axis > .55 ? 1 : 0;
    state.padLatch = Math.max(0, state.padLatch - dt);
    if (dir && state.padLatch === 0) { pick(lane + dir); state.padLatch = .22; }
    if (p.buttons[0]?.pressed) activateNitro();
  }

  const baseSpawn = spawnInterlude;
  spawnInterlude = function () {
    baseSpawn();
    if (drive === 'learn' || wash > 0) return;
    // Special pickups do not block the answer lanes: only one optional stunt.
    const kind = ['ramp', 'magnet', 'fuel'][Math.floor(Math.random() * 3)];
    const safeLane = (traffic[0]?.lane + 1 || 1) % lanes;
    traffic.push({ lane: safeLane, z: .28, type: kind, hit: false });
  };

  const baseTick = tick;
  tick = function (dt) {
    if (!running || paused) { if(state.engineGain) state.engineGain.gain.setTargetAtTime(0,audio.currentTime,.1); return; }
    pad(dt);
    if (state.key) {
      state.repeat -= dt;
      if (state.repeat <= 0) { pick(lane + state.key); state.repeat = .2; }
    }
    state.nitroTime = Math.max(0, state.nitroTime - dt);
    state.jump = Math.max(0, state.jump - dt);
    state.magnet = Math.max(0, state.magnet - dt);
    if (!task) {
      for (const t of traffic) {
        if (t.hit || t.z < .79 || t.z >= 1) continue;
        const onLane = Math.abs(t.lane - visualLane) < .42;
        if (t.type === 'coin' && (onLane || state.magnet > 0)) {
          t.hit = true; score += 50; state.stars++; beep(950);
        } else if (onLane && ['ramp', 'magnet', 'fuel'].includes(t.type)) {
          t.hit = true;
          if (t.type === 'ramp') { state.jump = .85; state.jumps++; score += 75; toast('SAUBERER SPRUNG!', '+75 Punkte · sicher wieder auf der Straße', 1.5); }
          if (t.type === 'magnet') { state.magnet = 12; toast('STERNENMAGNET!', '12 Sekunden automatisch Sterne sammeln', 1.5); }
          if (t.type === 'fuel') { state.nitro = Math.min(100, state.nitro + 30); toast('NITRO-TANK!', '+30 % Nitro · mit SHIFT zünden', 1.5); }
        } else if (onLane && state.jump > 0) { t.hit = true; }
        else if (onLane && ['car', 'cone', 'puddle'].includes(t.type) && !shield) state.collisions++;
      }
    }
    const previous = visualLane;
    baseTick(dt);
    state.steer += ((visualLane - previous) / Math.max(dt, .001) - state.steer) * Math.min(1, dt * 10);
    if (state.nitroTime > 0 && !task) speed = Math.min(240, speed + dt * 55);
    state.maxStreak = Math.max(state.maxStreak, streak);
    missionUI();
    if (state.engine) {
      state.engine.frequency.setTargetAtTime(35 + speed * .65, audio.currentTime, .12);
      state.engineGain.gain.setTargetAtTime(sound ? .015 : 0, audio.currentTime, .1);
    }
  };

  const baseSound = $('sound').onclick;
  $('sound').onclick = () => {
    baseSound();
    if (audio && !state.engine) {
      state.engine = audio.createOscillator(); state.engineGain = audio.createGain();
      state.engine.type = 'triangle'; state.engineGain.gain.value = 0;
      state.engine.connect(state.engineGain); state.engineGain.connect(audio.destination); state.engine.start();
    }
  };

  const baseWorld = drawWorld;
  drawWorld = function () {
    baseWorld();
    // Fine road grain, perspective cat-eyes and wet-road reflections.
    for (let i = 0; i < 100; i++) {
      const z = (i / 100 + phase * .025) % 1;
      const p = roadPoint(z), x = p.center + (Math.sin(i * 19.3) * .47) * p.w;
      ctx.fillStyle = i % 2 ? '#ffffff08' : '#00000013';
      ctx.fillRect(x, p.y, 2 + z * 4, 1 + z * 2);
    }
    for (let i = 0; i < 18; i++) {
      const z = (i / 18 + phase * .035) % 1, p = roadPoint(z);
      ctx.fillStyle = sector.feature === 'Nacht' ? '#adcfeb' : '#e6d6a1';
      for (const side of [-1, 1]) ctx.fillRect(p.center + side * (p.w / 2 - 8), p.y, 2 + z * 3, 2 + z * 2);
    }
    if (sector.feature === 'Küste' || sector.feature === 'Nacht') {
      for (let i = 0; i < 14; i++) {
        const z = (i / 14 + phase * .02) % 1, p = roadPoint(z);
        ctx.fillStyle = '#94c7da12'; ctx.fillRect(p.center - p.w * .35, p.y, p.w * .7, 2 + z * 5);
      }
    }
    // Weather stays inside the canvas; semantic question and options remain clear.
    if (!state.calm && running && sector.feature === 'Küste') {
      ctx.strokeStyle = '#c3e5f633'; ctx.lineWidth = 1;
      for (let i = 0; i < 45; i++) {
        const x = (i * 137 + phase * 45) % 1000, y = 210 + (i * 79 + phase * 220) % 440;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 5, y + 15); ctx.stroke();
      }
    }
    // Roadside rally banners and a coast guard helicopter stay off the road.
    const p = roadPoint((phase * .022) % 1);
    ctx.fillStyle = '#112f3b'; ctx.fillRect(p.center - p.w / 2 - 65 * p.s, p.y - 50 * p.s, 55 * p.s, 25 * p.s);
    text('RALLY', p.center - p.w / 2 - 38 * p.s, p.y - 33 * p.s, 11 * p.s, '#c5f277');
    if (!state.calm && sector.feature === 'Küste') {
      const x = 120 + Math.sin(phase * .12) * 55;
      ctx.fillStyle = '#e4e9dd'; ctx.beginPath(); ctx.ellipse(x, 105, 23, 10, 0, 0, 7); ctx.fill();
      ctx.fillRect(x - 42, 102, 24, 4); ctx.strokeStyle = '#182f3a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - 36, 91); ctx.lineTo(x + 36, 91); ctx.stroke();
    }
  };

  const baseCar = car;
  car = function (x, y, s, c, player = false) {
    if (!player) return baseCar(x, y, s, c, false);
    const lift = state.jump > 0 ? Math.sin(state.jump / .85 * Math.PI) * 50 : 0;
    const bounce = state.calm || !running ? 0 : Math.sin(phase * 14) * Math.min(1.8, speed / 110);
    ctx.save(); ctx.translate(x, y - lift + bounce);
    ctx.rotate(state.calm ? 0 : Math.max(-.12, Math.min(.12, state.steer * .014)));
    const scaleX = state.vehicle === 'offroad' ? 1.13 : 1;
    ctx.scale(scaleX, state.vehicle === 'offroad' ? 1.03 : 1);
    // Raised rear bodywork, metallic highlights and a reflective windscreen.
    poly([[-28*s,10*s],[28*s,10*s],[31*s,56*s],[-31*s,56*s]], '#182831');
    baseCar(0, 0, s, c, true);
    const gloss = ctx.createLinearGradient(-23*s,0,23*s,0);
    gloss.addColorStop(0,'#ffffff02'); gloss.addColorStop(.35,'#ffffff45'); gloss.addColorStop(1,'#00000018');
    ctx.fillStyle=gloss;ctx.fillRect(-23*s,-55*s,46*s,20*s);
    ctx.strokeStyle='#d6ecf777';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-18*s,-27*s);ctx.lineTo(15*s,-20*s);ctx.stroke();
    if (state.vehicle === 'offroad') { ctx.fillStyle='#101a22';ctx.fillRect(-35*s,36*s,70*s,7*s);ctx.fillRect(-32*s,-48*s,64*s,7*s); }
    if (state.vehicle === 'rescue') {
      ctx.fillStyle='#eee';ctx.fillRect(-18*s,0,36*s,10*s);
      ctx.fillStyle='#659cfa';ctx.fillRect(-16*s,-3*s,13*s,5*s);ctx.fillStyle='#ee8769';ctx.fillRect(3*s,-3*s,13*s,5*s);
    }
    if (state.nitroTime>0) { poly([[-18*s,55*s],[-4*s,55*s],[-11*s,96*s]],'#60d4ff');poly([[4*s,55*s],[18*s,55*s],[11*s,96*s]],'#60d4ff'); }
    if(state.magnet>0){ctx.strokeStyle='#f4c661';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,46*s,72*s,0,0,7);ctx.stroke()}
    ctx.restore();
  };

  const baseObstacles = drawObstacles;
  drawObstacles = function () {
    baseObstacles();
    for(const t of traffic){
      if(t.hit)continue;const p=proj(t.lane,t.z),s=p.s;
      if(t.type==='ramp'){poly([[p.x-35*s,p.y],[p.x+35*s,p.y],[p.x+27*s,p.y-30*s],[p.x-27*s,p.y-30*s]],'#657b83');text('↑',p.x,p.y-7*s,27*s,'#c5f277')}
      if(t.type==='fuel'||t.type==='magnet')RallyPickupIcon(t.type,p.x,p.y,s);
    }
  };
  // Public, read-only diagnostics for regression tests and future tuning.
  globalThis.RallyAdventure = { state, activateNitro, goals };
})();


