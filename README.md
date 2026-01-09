<div align="center">

🎓 **Swadhyay (स्वाध्याय)**  
**AI-Assisted, Self-Directed Learning Platform for Microcontrollers**

Demo • Features • Architecture • AI Approach • Quick Start

</div>

---

## 📖 Overview

**Swadhyay (स्वाध्याय)** is a research-grade, AI-assisted learning platform designed to transform how microcontrollers and embedded systems are taught.

The platform removes dependency on physical laboratories while preserving **real hardware understanding** through structured learning modules, in-browser simulation, and AI-guided reflection.

Swadhyay is developed as a **hackathon-ready prototype with a scalable architecture**, focused on personalization, inclusion, and sustainability in engineering education.

---

## 🎯 The Problem

Microcontroller education faces persistent challenges:

- Physical labs are costly, capacity-limited, and inaccessible
- Students often memorize code instead of understanding hardware behavior
- One-to-one mentorship does not scale
- Hardware-centric learning excludes:
  - Remote learners
  - Resource-constrained institutions
  - Independent self-learners without lab access

---

## 💡 Our Solution

Swadhyay introduces a **digital-first, AI-assisted learning workflow** for embedded systems.

- ✅ No physical hardware required, while preserving real hardware behavior via simulation
- ✅ Learners write code themselves — no copy-paste learning
- ✅ Circuits are built and tested directly in the browser
- ✅ An AI mentor explains *why* something works or fails
- ✅ Progression is gated by conceptual mastery, not mere completion

---

## ✨ Key Features

### 🧠 Core Learning Capabilities

| Feature | Description | Implementation |
|------|------------|---------------|
| Interactive Pin Exploration | Hover-based pin explanations | SVG + Framer Motion |
| Structured Learning Modules | Topic-wise progression | React Routing |
| Live Circuit Simulation | Real MCU behavior without hardware | Embedded Wokwi |
| Code-First Practice | Learners write complete programs | Embedded C |
| AI Mentor | Contextual explanations & hints | RAG-based AI (Phase-2) |
| Mastery-Based Progression | Unlocks only after validation | XP + Quiz Engine |

---

### 🎮 Gamification & Progression

- Level-based progression inspired by casual learning games
- XP and mastery thresholds
- Quiz-gated advancement (≥75% required)
- Locked advanced modules until fundamentals are demonstrated
- Visual progress tracking per microcontroller and topic

---

### 🌍 Inclusion & Sustainability

- No physical hardware → **zero electronic waste**
- Accessible from low-resource environments
- Self-paced learning for diverse backgrounds
- Suitable for individuals, classrooms, and institutions

---

## 🏗️ System Architecture

Frontend (React + Vite)
│
├── Learning Modules
├── Interactive Pin Diagrams
├── Gamified Level Engine
│
├── Simulation Layer
│ └── Embedded Wokwi (Circuit + Code)
│
└── AI Interaction Layer
├── Concept Explanations
├── Code Feedback
└── Quiz Generation

Backend (NestJS)
│
├── Authentication (JWT)
├── User & Progress Management
├── Quiz & XP Engine
├── AI Orchestration Layer
└── Database (PostgreSQL + Prisma)

yaml
Copy code

---

## 🤖 AI-Assisted Learning Approach

Swadhyay uses AI as a **mentor**, not a replacement for learning.

The platform is designed around a **Retrieval-Augmented Generation (RAG)** pipeline to ensure **technical accuracy and pedagogical alignment**.

### Knowledge Grounding

- Authoritative embedded-systems textbooks (e.g., Mazidi 8051)
- Microcontroller datasheets and curated academic references
- Content is manually curated, chunked, and indexed by topic

### Retrieval + Generation Flow

1. Learner selects a microcontroller and topic
2. Concept-relevant textbook sections are retrieved
3. Retrieved context is provided as grounding to the AI model
4. The model generates:
   - Conceptual explanations
   - Guided hints
   - Quiz questions (graded difficulty)
   - Feedback on learner-written code

This ensures AI outputs remain **curriculum-aligned**, **traceable**, and **academically grounded**, rather than generic internet responses.

---

## 📽️ AI-Assisted Content Generation Pipeline

- **Conceptual Articles**  
  Generated from textbook-grounded context

- **Guided Simulation**  
  Topic-specific starter templates for circuits and code

- **Adaptive Quizzes**  
  - First 60%: conceptual understanding  
  - Final 40%: higher-order reasoning  

This enforces the cycle:  
**understanding → practice → validation**

---

## 🔧 Technology Stack

### Frontend
- React + Vite  
- Tailwind CSS  
- Framer Motion  
- SVG & Canvas-based visuals  

### Backend
- NestJS  
- PostgreSQL  
- Prisma ORM  
- JWT Authentication  

### Simulation
- Wokwi (embedded via iframe)

### AI Layer
- Model-agnostic LLM integration
- Retrieval-Augmented Generation (RAG)
- Topic-specific prompt orchestration

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Modern browser (Chrome recommended)

### Run Locally

```bash
git clone https://github.com/Anti-Hero-01/swadhyay-ai-tutor.git
cd swadhyay-ai-tutor

# Frontend
npm install
npm run dev

# Backend (separate terminal)
cd backend
npm install
npm run start:dev
Frontend: http://localhost:5173
Backend API: http://localhost:3000

📚 Learning Flow
1️⃣ Select a microcontroller (e.g., 8051)
2️⃣ Explore pins & architecture
3️⃣ Learn through structured modules
4️⃣ Build circuits & write code
5️⃣ Receive AI-guided explanations
6️⃣ Pass quiz to unlock next level

🏆 Hackathon Context
Event: eduAI-thon

Organizer: IUCEEE

Theme: AI-Driven, Personalized & Sustainable Education

Target Categories
Best Educational Innovation

Best Use of AI in Learning

Best Sustainable Solution

Audience Choice Award

📍 Project Status
✅ Functional interactive prototype

🔧 Active development

🧪 Research-oriented AI pipeline

📦 Architected for scalability

🤝 Contributing
Contributions and academic collaboration are welcome.

Open an issue describing the idea

Discuss the approach

Submit a pull request

<div align="center">
⭐ Star this repository if Swadhyay inspires you
Built to democratize embedded-systems education.

</div> ```
