# 📍 Project Roadmap — Dungeon  Game

This roadmap outlines the planned milestones and features across Sprint 2 (MVP) and Sprint 3 (Full Version), along with top risks and their mitigations.

---

## MVP – Sprint 2 Goals 

The goal of Sprint 2 is to deliver a playable demo that proves the core game loop and technical foundations.

### Features Planned:
- Player can:
  - Move using keyboard input
  - Use a single attack: **fireball**
  - Sprint (short speed burst)
- One basic enemy type:
  - Moves toward player
  - Can be defeated with fireball
- A single dungeon room:
  - Enemies spawn at start
  - Player must defeat all enemies
- Player run stats are tracked:
  - Enemies killed, time survived, fireballs used
- Player’s **best run** is saved to:
  - **JSONBin** (PUT)
  - **localStorage** (for offline persistence)
- REST **GET** from dice roll API to simulate random fireball damage

### Technical Goals:
- Use **Phaser 3** for Canvas/WebGL rendering
- Local-first setup using browser storage
- Public GET +  PUT integration

---

## 🏆 Full - Sprint 3 Goals

Sprint 3 will expand gameplay, add depth, and polish the experience.

### Features Planned:
- Add 2 more attacks:
  - **Flamethrower** 
  - **Fire melee**
- Level scaling:
 - Once cleared, room **resets** (same room, new enemies)
  - Enemy and Player have dedicated Stats (HP, Mana, Stamina)
  - Difficulty increases per room cleared
- Game Over screen with final stats and best run comparison
- Audio (sfx + music), UI polish

---

## ⚠️ Top 3 Risks + Mitigation Strategies

### 1. Risk: Phaser implementation delays (learning curve, bugs)
**Mitigation:**
- Use Phaser templates and code examples to build core systems fast
- Develop one working scene before adding more features
- Prioritize input → attack → enemy → collision → reset

---

### 2. Risk: Public APIs (dice roll or JSONBin) may fail or be rate-limited
**Mitigation:**
- Cache dice rolls locally
- Save best run to localStorage as a fallback
- Wrap fetch calls in error handlers to prevent app crashes

---

### 3. Risk: Sprint 2/3 features may take longer than expected
**Mitigation:**
- Keep Sprint 2 minimal and work on immediately 
- Scope Sprint 3 features as modular (can be skipped if needed)
- Prioritize polish and fun factor over adding too many features


