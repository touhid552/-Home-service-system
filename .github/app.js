const http = require("http");
const os = require("os");

const PORT = process.env.PORT || 3000;

function getSystemInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: `${Math.floor(os.uptime() / 60)} minutes`,
    totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
    freeMemory: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
    cpus: os.cpus().length,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  };
}

const HTML_TEMPLATE = (info) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Home Service System</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e0e0e0;
    }
    .container {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 25px 50px rgba(0,0,0,0.4);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .icon { font-size: 48px; margin-bottom: 12px; }
    h1 {
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(90deg, #4fc3f7, #81d4fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 6px;
    }
    .subtitle { color: #90a4ae; font-size: 14px; }
    .hostname-card {
      background: linear-gradient(135deg, #0f3460, #1565c0);
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      margin-bottom: 24px;
      border: 1px solid rgba(79,195,247,0.3);
    }
    .hostname-label { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #4fc3f7; margin-bottom: 8px; }
    .hostname-value { font-size: 32px; font-weight: 700; color: #fff; font-family: monospace; }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }
    .stat {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 14px;
    }
    .stat-label { font-size: 11px; color: #78909c; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .stat-value { font-size: 16px; font-weight: 600; color: #e0e0e0; }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #546e7a;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .status-dot {
      display: inline-block;
      width: 8px; height: 8px;
      background: #4caf50;
      border-radius: 50%;
      margin-right: 6px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="icon">🏠</div>
      <h1>Home Service System</h1>
      <p class="subtitle"><span class="status-dot"></span>System is running</p>
    </div>

    <div class="hostname-card">
      <div class="hostname-label">System Hostname</div>
      <div class="hostname-value">${info.hostname}</div>
    </div>

    <div class="grid">
      <div class="stat">
        <div class="stat-label">Platform</div>
        <div class="stat-value">${info.platform}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Architecture</div>
        <div class="stat-value">${info.arch}</div>
      </div>
      <div class="stat">
        <div class="stat-label">CPU Cores</div>
        <div class="stat-value">${info.cpus}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Node Version</div>
        <div class="stat-value">${info.nodeVersion}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Total Memory</div>
        <div class="stat-value">${info.totalMemory}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Free Memory</div>
        <div class="stat-value">${info.freeMemory}</div>
      </div>
    </div>

    <div class="footer">
      Last updated: ${info.timestamp}
    </div>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const info = getSystemInfo();

  if (req.url === "/api/hostname" || req.url === "/api/info") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(info, null, 2));
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", hostname: info.hostname }));
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(HTML_TEMPLATE(info));
});

server.listen(PORT, () => {
  console.log(`🏠 Home Service System running on port ${PORT}`);
  console.log(`   Hostname: ${os.hostname()}`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   API:  http://localhost:${PORT}/api/hostname`);
});
