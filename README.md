<div align="center">

🎓 **Swadhyay (स्वाध्याय) — AI-Powered Self-Learning for Microcontrollers**

Demo • Features • Architecture • Quick Start • Documentation

</div>

---

# 📖 Overview

**Swadhyay (स्वाध्याय)** is a **production-grade, AI-powered microcontroller learning platform** that reimagines how embedded systems are taught — removing the dependency on physical labs while preserving hands-on depth.

Unlike traditional platforms that rely on static tutorials or hardware-heavy setups, Swadhyay enables learners to:

- **Learn** concepts visually  
- **Practice** by writing real microcontroller code  
- **Simulate** circuits live in the browser  
- **Reflect** with AI-guided feedback  

All within a **self-directed, inclusive, and scalable learning ecosystem**.

---

# 🎯 The Problem

- Physical microcontroller labs are **costly, inaccessible, and unscalable**
- Students often **copy code without understanding hardware behavior**
- Institutions struggle to provide **individual mentorship at scale**
- Hardware-centric education excludes:
  - Remote learners
  - Resource-constrained institutions
  - Self-learners without lab access

---

# 💡 Our Solution

**Swadhyay transforms microcontroller education into a digital-first, AI-guided experience.**

- ✅ No physical lab required  
- ✅ Learners build circuits and write code themselves  
- ✅ Real-time simulation embedded directly in the platform  
- ✅ AI mentor explains *why*, not just *what*  
- ✅ Gamified progression ensures mastery, not memorization  

---

# ✨ Key Features

## 🧠 Core Learning Capabilities

| Feature | Description | Technology |
|------|------------|------------|
| Visual Pin Exploration | Interactive microcontroller pin diagrams | SVG + Motion |
| Live Circuit Simulation | Build & run circuits in-browser | Wokwi (Embedded) |
| Code-First Learning | Learners write all code themselves | C / Embedded C |
| AI Code Mentor | Explains logic, errors & optimizations | LLM APIs |
| Progressive Unlocks | Levels unlock only after mastery | XP + Quiz Engine |

---

## 🎮 Gamification & Progression

- Candy-Crush–style **level map**
- XP-based mastery system
- Quiz-gated progression (≥75% required)
- Streaks, milestones, and topic completion
- Locked advanced modules until fundamentals are proven

---

## 🌍 Inclusion & Sustainability

- No hardware → **zero electronic waste**
- Accessible from low-resource environments
- Self-paced learning for diverse backgrounds
- Designed for institutions, individuals, and remote classrooms

---

# 🏗️ System Architecture

Frontend (React / Next.js)
│
├── Learning Modules
├── Interactive Pin Diagrams
├── Gamified Level Engine
│
├── Simulation Layer
│ └── Embedded Wokwi (Circuit + Code)
│
└── AI Mentor Layer
├── Code Analysis
├── Concept Explanation
└── Personalized Hints

yaml
Copy code

---

# 🔧 Technology Stack

### **Frontend**
- React / Next.js  
- Tailwind CSS  
- Framer Motion  
- SVG + Canvas for visuals  

### **Simulation**
- Wokwi (embedded via iframe/API)

### **AI Layer**
- OpenAI / LLM APIs (planned & extensible)
- Context-aware prompts
- Code + circuit understanding

### **Platform**
- Modular architecture
- Scalable for institutional deployment

---

# 🚀 Quick Start

## **Prerequisites**
- Node.js 18+
- Modern browser (Chrome recommended)

---

## 🚀 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/Swadhyay.git
cd Swadhyay
npm install
npm run dev
Open:

arduino
Copy code
http://localhost:3000
📚 Usage Flow
1️⃣ Select Microcontroller
Choose classic or modern MCUs (e.g., 8051)

2️⃣ Explore Pins & Architecture
Hover-based pin explanations

3️⃣ Learn via Modules
Structured topics from beginner → advanced

4️⃣ Build & Simulate
Create circuits + write code yourself

5️⃣ AI Reflection
Understand mistakes and optimizations

6️⃣ Quiz & Unlock
Score ≥75% to access next level

---

## 🧠 AI Mentor Capabilities

Swadhyay integrates a **context-aware AI mentor** designed specifically for embedded systems education.  
Unlike generic chatbots, the AI operates within the learner’s current circuit, code, and module context.

The AI mentor is capable of:

- Explaining **microcontroller registers, ports, and I/O behavior**
- Identifying **logical errors and inefficiencies** in user-written code
- Recommending **microcontroller-specific best practices**
- Adapting explanations based on the learner’s progress and mastery level

This enables **personalized, on-demand mentorship** without continuous human intervention.

---

## 🏆 Hackathon Context

- **Event:** eduAI-thon  
- **Organizer:** IUCEEE  
- **Theme:** AI-Driven Personalized & Sustainable Education  

### Target Award Categories
- Best Educational Innovation  
- Best Use of AI in Learning  
- Best Sustainable Solution  
- Audience Choice Award  

---

## 📍 Project Status

- ✅ Functional interactive prototype  
- 🔧 Actively evolving and iterating  
- 📦 Architected for scalability and research adoption  

---

## 🤝 Contributing

Contributions, academic collaborations, and feature proposals are welcome.

If you would like to contribute:
1. Open an issue describing the enhancement or research idea
2. Discuss the approach with the maintainers
3. Submit a pull request following the agreed direction

This helps keep the project aligned with its educational and research goals.

---

## 📜 License

This project is licensed under the **MIT License**.

© 2026 — Swadhyay Team

---

<div align="center">

⭐ **Star this repository if Swadhyay inspires you**  

Built with care to democratize embedded systems education.

</div>
