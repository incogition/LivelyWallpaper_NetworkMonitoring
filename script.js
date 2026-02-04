const $ = (id) => document.getElementById(id);

// --- 1. 부팅 시퀀스 ---
const bootLines = [
  "X-PACKETRAY SECURE OS [Version 4.5.0-LTS]",
  "KERNEL INITIALIZING ........................... [ OK ]",
  "SFP28 100G INTERFACE READY .................... [ OK ]",
  "K3S CLUSTER CONTROL PLANE ..................... [ OK ]",
  "LONGHORN STORAGE REPLICA SYNC ................. [ OK ]",
  "DPI ENGINE v2.8 INITIALIZED ................... [ OK ]",
  "SYSTEM STATUS: OPTIMAL // SECURITY: ARMED",
  "WELCOME, PRIVILEGED OPERATOR."
];

let bIdx = 0;
function runBoot() {
  const bootText = $('bootText');
  if (bIdx < bootLines.length) {
    bootText.textContent += bootLines[bIdx] + "\n";
    bIdx++;
    setTimeout(runBoot, 70 + Math.random() * 100);
  } else {
    setTimeout(() => { $('boot').style.display = 'none'; $('app').style.opacity = '1'; }, 1000);
  }
}

// --- 2. 탭 관리 및 데이터 보존 ---
let currentView = 'dashboard';
let packetHistory = []; // 패킷 데이터를 저장하여 탭 전환 시 복구

const views = {
  dashboard: () => `
    <aside class="side-panel">
      <div class="card"><div class="card-label">Hardware Load Status</div>
        <div class="metric-group">
          <div class="m-item"><div class="m-info"><span>CPU LOAD</span><span id="cpu-val">0%</span></div><div class="m-bar-bg"><div id="cpu-bar" class="m-bar-fill"></div></div></div>
          <div class="m-item"><div class="m-info"><span>RAM ALLOC</span><span id="ram-val">0%</span></div><div class="m-bar-bg"><div id="ram-bar" class="m-bar-fill"></div></div></div>
        </div>
      </div>
      <div class="card"><div class="card-label">High Load Processes (Top 5)</div><div id="task-list" class="task-container"></div></div>
    </aside>
    <section class="card"><div class="card-label">Real-time Deep Packet Inspection Stream</div><div id="log-stream" class="log-container"></div></section>
  `,
  analysis: () => `
    <div class="card single-col"><div class="card-label">Network Traffic Analysis</div>
      <div class="grid-content">
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">TCP/HTTP3</div><div class="stat-val">64.2%</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">TLS 1.3</div><div class="stat-val">28.4%</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">DPI HIT RATE</div><div class="stat-val">99.8%</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">LATENCY</div><div class="stat-val">0.12ms</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">ACTIVE FLOWS</div><div class="stat-val">4,281</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">PKT LOSS</div><div class="stat-val">0.00%</div></div>
      </div>
    </div>`,
  threats: () => `
    <div class="card single-col"><div class="card-label">Detected Anomalies</div>
      <div style="padding:20px;">
        <div style="padding:15px; background:rgba(255,62,62,0.1); border:1px solid var(--red); margin-bottom:10px;">
          <b style="color:var(--red)">CRITICAL: SQL INJECTION ATTEMPT</b><br><small style="color:var(--muted)">SRC: 185.12.4.2 | DEST: 10.0.0.42 | ACTION: BLOCKED</small>
        </div>
        <div style="padding:15px; background:rgba(255,204,0,0.1); border:1px solid var(--amber);">
          <b style="color:var(--amber)">WARNING: UNUSUAL PORT SCANNING</b><br><small style="color:var(--muted)">SRC: 42.112.9.22 | STATUS: MONITORING</small>
        </div>
      </div>
    </div>`,
  system: () => `
    <div class="card single-col"><div class="card-label">Infrastructure Specs</div>
      <div class="grid-content">
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">CLUSTER (K3S)</div><div class="stat-val" style="font-size:16px;">3 NODES OK</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">STORAGE (LONGHORN)</div><div class="stat-val" style="font-size:16px;">HEALTHY</div></div>
        <div class="stat-box"><div style="font-size:10px; color:var(--muted)">KERNEL</div><div class="stat-val" style="font-size:16px;">RT-5.12-XPR</div></div>
      </div>
    </div>`
};

document.querySelectorAll('.nav-item').forEach(item => {
  item.onclick = (e) => {
    document.querySelector('.nav-item.active').classList.remove('active');
    e.target.classList.add('active');
    currentView = e.target.dataset.target;
    mainContent.innerHTML = views[currentView]();
    if (currentView !== 'dashboard') mainContent.classList.add('single-col');
    else { mainContent.classList.remove('single-col'); restorePacketHistory(); }
  };
});

// --- 3. 실시간 데이터 주입 ---
let totalBytes = 0;
function updateMonitoring() {
  if (currentView !== 'dashboard') return;
  const cpu = 20 + Math.random() * 40;
  const ram = 40 + Math.random() * 10;
  if($('cpu-val')){ $('cpu-val').innerText = `${cpu.toFixed(1)}%`; $('cpu-bar').style.width = `${cpu}%`; }
  if($('ram-val')){ $('ram-val').innerText = `${ram.toFixed(1)}%`; $('ram-bar').style.width = `${ram}%`; }

  if($('task-list')){
    const list = $('task-list'); list.innerHTML = '';
    const seeds = [
      {n:"ntopng", c:15.2, r:1.2}, {n:"k3s-server", c:8.4, r:1.1},
      {n:"fluent-bit", c:4.1, r:0.3}, {n:"longhorn-mgr", c:2.1, r:0.9}, {n:"suricata", c:1.5, r:1.3}
    ];
    seeds.forEach(p => {
      list.innerHTML += `<div class="task-row"><span class="task-name">${p.n}</span><span class="task-cpu">${(p.c + Math.random()).toFixed(1)}%</span><span class="task-ram">${p.r}GB</span></div>`;
    });
  }
}

// 패킷 로그 생성 및 저장
function updateLogs() {
  const protos = [
    {n:"TCP", c:"TCP", p:[80, 443]}, {n:"UDP", c:"UDP", p:[53, 123]}, 
    {n:"TLS1.3", c:"TLS1.3", p:[443]}, {n:"DNS", c:"DNS", p:[53]}, {n:"HTTP/3", c:"HTTP/3", p:[443]}
  ];
  const p = protos[Math.floor(Math.random()*protos.length)];
  const size = Math.floor(Math.random()*1400)+60;
  const isThreat = Math.random() > 0.95;

  const logData = {
    time: new Date().toLocaleTimeString().split(' ')[1],
    proto: p.n,
    pClass: `proto-${p.c.replace(/[./]/g, '\\$&')}`,
    src: isThreat ? "185.12.4.2" : `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.142`,
    dst: "10.0.0.42",
    port: p.p[Math.floor(Math.random()*p.p.length)],
    len: size,
    threat: isThreat
  };

  packetHistory.unshift(logData);
  if (packetHistory.length > 30) packetHistory.pop();
  if (currentView === 'dashboard') renderLogLine(logData);
  
  totalBytes += size;
}

function renderLogLine(data) {
  const stream = $('log-stream');
  if (!stream) return;
  const line = document.createElement('div');
  line.className = `log-line ${data.threat ? 'is-threat' : ''}`;
  line.innerHTML = `
    <span class="l-time">${data.time}</span>
    <span class="l-proto ${data.pClass}">[${data.proto}]</span>
    <span class="l-data">${data.src} > ${data.dst}:${data.port} ${data.threat ? '[THREAT]' : ''}</span>
    <span class="l-len">${data.len}B</span>
  `;
  stream.prepend(line);
  if (stream.children.length > 25) stream.removeChild(stream.lastChild);
}

function restorePacketHistory() {
  const stream = $('log-stream');
  if (!stream) return;
  stream.innerHTML = '';
  [...packetHistory].reverse().forEach(data => renderLogLine(data));
}

// 초기화
function init() {
  mainContent.innerHTML = views.dashboard();
  setInterval(updateMonitoring, 1000);
  setInterval(updateLogs, 800);
  setInterval(() => {
    const gbps = ((totalBytes * 8) / (1024*1024*1024)).toFixed(2);
    if($('bandwidth-val')) $('bandwidth-val').innerText = gbps;
    totalBytes = 0;
  }, 1000);
  setInterval(() => { if($('clock')) $('clock').innerText = new Date().toLocaleTimeString(); }, 1000);

  window.onmousemove = (e) => { $('cursor').style.left = e.clientX+'px'; $('cursor').style.top = e.clientY+'px'; };
  runBoot();
}

init();