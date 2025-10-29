
# Phaser Roguelike Game

## Overview
This is a browser-based roguelike game built using **Phaser**.  
Players start from a Title Screen that will have their best run shown. 
Upon clicking, the player will begin the game and must survive an onslaught of enemies that will increase after each wave, as well as their health increasing. The player's goal is to perform the best they can, for the longest they can survive.
At the end of a run, the Game Over screen displays performance statistics (kills, fireballs used, and survival time) and automatically saves the best run both locally and remotely through a JSONBin API.  

During gameplay, the player’s attacks use **Rolz dice roll API** to determine damage values, introducing randomness and replayability.

---

## Architecture

The game uses multiple **Phaser Scenes** for modular structure, with state management handled through a shared `store.js` module.  
Key gameplay logic (movement, collision, health, attack handling) is contained within the **Player** and **Enemy** classes.

### Integrated APIs:
1. **Rolz Dice API** – Generates random dice rolls (1–6) for attack damage.
2. **JSONBin API** – Stores and retrieves the player's best run data remotely.

| Component | Purpose |
|------------|----------|
| **MainMenu Scene** | Displays the title screen and fetches the best run using JSONBin. |
| **GameScene Scene** | Handles enemy spawning, combat, collisions, and real-time damage rolls. |
| **GameOver Scene** | Ends the game, records performance, and stores best run data. |
| **Player Class** | Defines player movement, attack cooldowns, and damage response logic. |
| **Enemy Class** | Defines enemy AI movement, health tracking, and interactions with the player. |
| **Phaser.js** | Core configuration file that initializes and links all scenes with resize support. |

---

## Module Map

| File | Description |
|------|--------------|
| **/src/objects/Player.js** | Defines the `Player` class, including movement, sprinting, and taking damage. Includes invulnerability and attack cooldown logic. |
| **/src/objects/Enemy.js** | Defines the `Enemy` class with pursuit behavior, health management, and animation control. |
| **/src/scenes/MainMenu.js** | Loads the title screen and best run data; starts the game on click. |
| **/src/scenes/GameScene.js** | Core gameplay scene: manages enemies, fireballs, player input, and Rolz API damage rolls. |
| **/src/scenes/GameOver.js** | Displays the Game Over screen, saves performance stats, and updates best run records. |
| **/src/api/jsonbin.js** | Provides functions to `loadBestRun()` and `saveBestRun()` using the JSONBin REST API. |
| **/src/api/dice.js** | Uses the **Rolz API** to generate random dice roll values for damage via `rollDamage()`. |
| **/src/store.js** | Centralized game state: tracks kills, time survived, and fireballs used. |
| **/src/Phaser.js** | Game configuration file that initializes Phaser, sets up physics, scene order, scaling, and background color. |

---

##  Endpoints

### JSONBin API
Used for best run persistence.

| Function | HTTP Method | Description |
|-----------|-------------|-------------|
| `loadBestRun()` | `GET` | Fetches the best recorded run from JSONBin storage. |
| `saveBestRun(run)` | `PUT` or `POST` | Updates JSONBin with the latest best run data. |

### Rolz Dice API
Used for variable damage rolls.

| Function | HTTP Method | Endpoint | Description |
|-----------|-------------|-----------|-------------|
| `rollDamage()` | `GET` | `https://rolz.org/api/?1d6.json` | Returns a random dice result between 1 and 6. |
| fallback | — | — | If API fails, defaults to damage = 5. |

---

## ⏱TTLs (Time To Live)

- **JSONBin** data is persistent until manually deleted (no TTL).  
- **LocalStorage** data persists until cleared by the user.  
- **Rolz API** provides real-time responses — no stored or cached data.

---

## Merge Policy

This is a **solo project**, so  all merges and commits were completed to the main branch after local verification.
Changes were tested locally before committing to maintain a clean working branch.

---

##  Resize & Input Behavior

- The game dynamically scales using `Phaser.Scale.RESIZE` to fit any window size.
- Menus and UI text auto-center on resize.
- Input uses both **keyboard** (movement, attacks) and **mouse** (menu navigation), updating the internal game state consistently.

## Assets & Credit

- All Art created by Developer: Fares Abdelhamed
- Music: "https://freesound.org/people/edwardszakal/sounds/787932/"
	- Author: Edwardszakal
	- Title: "Retro Game Music" 


---

