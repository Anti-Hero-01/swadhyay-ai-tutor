<div align="center">

🎓 Swadhyay (स्वाध्याय)

AI-Assisted, Self-Directed Learning Platform for Microcontrollers

Demo • Features • Architecture • AI Approach • Quick Start

</div>
📖 Overview

Swadhyay (स्वाध्याय) is a research-grade, AI-assisted learning platform designed to transform how microcontrollers and embedded systems are taught.

The platform removes dependency on physical labs while preserving real hardware understanding through structured learning, simulation, and AI-guided reflection.

Swadhyay is built as a hackathon-ready prototype with scalable architecture, focused on personalization, inclusion, and sustainability in engineering education.

🎯 The Problem

Microcontroller education faces persistent challenges:

Physical labs are costly, capacity-limited, and inaccessible

Students often memorize code instead of understanding hardware behavior

One-to-one mentorship does not scale

Hardware-centric learning excludes:

Remote learners

Resource-constrained institutions

Self-learners without lab access

💡 Our Solution

Swadhyay introduces a digital-first, AI-assisted learning workflow for embedded systems.

✅ No physical hardware required, while preserving real hardware behavior through simulation

✅ Learners write code themselves — no copy-paste learning

✅ Circuits are built and tested in-browser

✅ AI mentor explains why something works or fails

✅ Progression is gated by conceptual mastery, not completion

✨ Key Features
🧠 Core Learning Capabilities
Feature	Description	Implementation
Interactive Pin Exploration	Hover-based pin explanations	SVG + Framer Motion
Structured Learning Modules	Topic-wise progression	React + Routing
Live Circuit Simulation	Real MCU behavior without hardware	Embedded Wokwi
Code-First Practice	Learners write full programs	Embedded C
AI Mentor	Contextual explanations & hints	LLM + RAG (planned)
Mastery-Based Progression	Unlocks only after quiz validation	XP + Quiz Engine
🎮 Gamification & Progression

Level-based progression inspired by casual learning games

XP and mastery thresholds

Quiz-gated advancement (≥75% required)

Locked advanced modules until fundamentals are demonstrated

Visual progress tracking per microcontroller and topic

🌍 Inclusion & Sustainability

No hardware → zero electronic waste

Accessible from low-resource environments

Self-paced learning for diverse backgrounds

Suitable for individuals, classrooms, and institutions

🏗️ System Architecture
Frontend (React + Vite)
│
├── Learning Modules
├── Interactive Pin Diagrams
├── Gamified Level Engine
│
├── Simulation Layer
│   └── Embedded Wokwi (Circuit + Code)
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

🤖 AI-Assisted Learning Approach

Swadhyay uses AI as a mentor, not a replacement for learning.

The platform is designed around a Retrieval-Augmented Generation (RAG) pipeline:

Authoritative textbooks (e.g., Mazidi 8051), datasheets, and curated references
are ingested and chunked per microcontroller and topic

Content is embedded and stored in a vector database

During interaction, only topic-relevant context is retrieved

The LLM generates:

Explanations

Conceptual hints

Quiz questions (graded difficulty)

Feedback on learner-written code

This keeps outputs academically grounded, not generic AI fluff.

📽️ AI-Assisted Content Generation Pipeline

Video / Visual Overview

AI-assisted summaries using external tools (e.g., NotebookLM)

Conceptual Article

Generated from textbook-grounded context

Guided Simulation

Topic-specific starter templates

Adaptive Quiz

First 60%: intermediate conceptual questions

Final 40%: higher-difficulty reasoning questions

This enforces understanding → practice → validation.

🔧 Technology Stack
Frontend

React + Vite

Tailwind CSS

Framer Motion

SVG & Canvas-based visuals

Backend

NestJS

PostgreSQL

Prisma ORM

JWT Authentication

Simulation

Wokwi (embedded via iframe)

AI Layer

LLM APIs (model-agnostic)

RAG-based knowledge retrieval

Prompt orchestration per topic

🚀 Quick Start
Prerequisites

Node.js 18+

PostgreSQL

Modern browser (Chrome recommended)

Run Locally
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

1️⃣ Select a Microcontroller (e.g., 8051)
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
