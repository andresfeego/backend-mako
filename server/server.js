console.log('[backend-mako] boot');

const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

// Logs
const logDir = process.env.MAKO_LOG_DIR || (isProd ? '/home/feegosys/logs' : path.join(__dirname, 'logs'));
try { fs.mkdirSync(logDir, { recursive: true }); } catch (e) {}

const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });

const app = express();

// CORS: keep same allowlist as backendComun (mako-related)
const corsOptions = {
  origin: [
    'http://localhost',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3002',
    'https://web-mako-next.vercel.app',
    'https://www.mako.guru',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
const apiRouterMako = require('./routes/routesMako.js');
app.use('/api/responseMako', apiRouterMako);

// Basic health
app.get('/health', (req, res) => res.json({ ok: true }));

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || '3033', () => {
  console.log(`HTTP server running on port ${process.env.PORT || '3033'}`);
});
