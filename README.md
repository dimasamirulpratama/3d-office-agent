# 🏢 Asta Office — 3D Virtual AI Workspace for Hermes Agent & 9Router

<p align="center">
  <strong>Immersive 3D Multi-Agent Office & Visual Workspace Powered by Hermes Agent & 9Router (Gemini 3.7 Flash)</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI%20Engine-9Router%20%2B%20Gemini%203.7%20Flash-blue?style=for-the-badge&logo=google" alt="Gemini 3.7 Flash">
  <img src="https://img.shields.io/badge/Runtime-Hermes%20Agent-purple?style=for-the-badge" alt="Hermes Agent">
  <img src="https://img.shields.io/badge/3D%20Engine-Three.js%20%2B%20R3F-emerald?style=for-the-badge&logo=three.js" alt="Three.js">
  <img src="https://img.shields.io/badge/Framework-Next.js%2016%20Turbopack-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Characters-Smooth%20Stylized%20Humanoid-orange?style=for-the-badge" alt="Smooth 3D Avatars">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

---

## 🌟 Overview

**Asta Office** is a modern, spatial 3D virtual office workspace created by **Dimas Amirul Pratama** for **Hermes Agent** and autonomous multi-agent teams. 

Instead of looking at plain terminal logs and flat text streams, you can watch **Lysta** and your AI agent fleet collaborate, code, execute tools, hold meetings, and manage projects in a living 3D office environment.

### 🚀 Key Features:
- **✨ Smooth Stylized 3D Avatars (Anti-Boxy Geometry):** Fully custom humanoid avatars using smooth capsules, spheres, curved hairstyles, expressive blinking eyes, and dynamic mouth animations.
- **⚡ Native 9Router + Hermes Integration:** Direct WebSocket Gateway Adapter (`server/hermes-gateway-adapter.js`) connecting with 9Router (`http://localhost:20128/v1`) using Google's ultra-fast `ag/gemini-3.7-flash-high` model.
- **🏢 Autonomous Multi-Agent Orchestration:** Full support for `spawn_agent`, `delegate_task`, `list_team`, `configure_agent`, and `dismiss_agent` with agents physically seated at desks in the 3D office.
- **📊 Interactive Virtual Workspaces:** Dedicated 3D rooms for GitHub code diff review, task boards, standups, analytics, and system monitoring.
- **🎛️ 1-Click Windows Launcher:** Includes `start-asta-office.bat` to launch both the 9Router adapter and 3D Web Studio simultaneously.

---

## 🏗️ Architecture

```text
Browser (3D Canvas + Next.js UI on :3001) 
   ↕ (WebSocket JSON-RPC)
Asta Gateway Adapter (:18789)
   ↕ (OpenAI-Compatible Streaming /v1/chat/completions)
9Router Gateway / Hermes (:20128) ➔ Gemini 3.7 Flash High
```

---

## 💻 Quick Start & Installation

### 1. Prerequisites
- **Node.js:** v20+ or v24+
- **npm:** v10+
- **9Router / Hermes:** Running locally at `http://localhost:20128`

### 2. Clone Repository
```bash
git clone https://github.com/dimasamirulpratama/3d-office-agent.git
cd 3d-office-agent
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configuration (`.env`)
```env
NEXT_PUBLIC_GATEWAY_URL=ws://localhost:18789
ASTA_GATEWAY_URL=ws://localhost:18789
ASTA_GATEWAY_ADAPTER_TYPE=hermes

HERMES_API_URL=http://localhost:20128
HERMES_API_KEY=your_9router_api_key
HERMES_ADAPTER_PORT=18789
HERMES_MODEL=ag/gemini-3.7-flash-high
HERMES_AGENT_NAME=Lysta

PORT=3001
HOST=127.0.0.1
```

### 5. Launch Asta Office

**Option A — Windows 1-Click Batch:**
👉 Double click `start-asta-office.bat`

**Option B — Terminal Manual:**
```bash
# Terminal 1 - Gateway Adapter
npm run hermes-adapter

# Terminal 2 - Next.js 3D Web Studio
npm run dev
```

Open your browser at: **[http://localhost:3001](http://localhost:3001)**

---

## 🛠️ Tech Stack
- **Frontend & App:** Next.js 16 (Turbopack, App Router), React 19, Tailwind CSS v4, Lucide Icons.
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`).
- **AI Backend:** 9Router Gateway, Hermes Agent, Gemini 3.7 Flash High.

---

## 📄 License
MIT License © 2026 Dimas Amirul Pratama
