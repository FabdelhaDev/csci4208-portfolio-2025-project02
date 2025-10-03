# Architecture Sketch

## View Manager (Scenes)

Phaser handles view transitions via its `Scene` system. Key views (scenes) include:

- `MainMenuScene` — start screen and options
- `GameScene` — active gameplay
- `GameOverScene` — display final stats and replay option

These scenes are preloaded and managed via Phaser's internal scene manager. The entire game runs as a single-page application (SPA) in the browser.

## Game State / Store

Runtime state (lives in memory during the game):
- `playerStats`: kills, health, stamina, mana, player level, abilities used
- `levelState`: enemies alive, dungeon level, enemy num, enemy stats/level

Persistent state:
- `bestRun`: loaded from localStorage (offline-first)
- `lastRun`: POSTed to JSONBin after game ends

## Services

- **Random Dice API (GET):** Used to simulate dice rolls for damage and loot drops. 
- **JSONBin (PUT):** Stores the player’s best run for public retrieval. Uses a timestamp to manage merge (last write wins).
- **LocalStorage:** Saves player preferences and last run offline for rehydration on app launch.

## Object-Oriented Classes

### `Player`
- Manages player state (HP/MP/SP, abilities, input handling)
- Fires projectiles, tracks abilities used, movement

### `Enemy`
- Base enemy class with health, damage, and AI behavior
- Can be extended to varied enemy types, though in scope may only be one type with randomized stat values.

### `GameManager`
- Handles game loop state
- Spawns enemies, transitions levels
- Calculates score, manages scene flow

## Rendering Stack

The game uses **Phaser 3** for rendering, which dynamically uses **WebGL** when available and falls back to **Canvas** if not.

Rendering includes:
- Sprites (player, enemies, projectiles)
- HUD overlays (health, score, stats)
- Transitions and particle effects'

## JSONBin Schema

The JSONBin will store a single player run record with the following fields:

| Field           | Type     | Description                       |
|-----------------|----------|---------------------------------|
| playerName      | String   | Player's chosen name             |
| levelReached    | Number   | Highest level reached in run    |
| enemiesKilled   | Number   | Total enemies defeated          |
| runDuration     | Number   | Duration of run in seconds      |
| fireBallsUsed   | Number   | Number of fireball attacks used |
| flameThrowerUsed| Number   | Number of flamethrower attacks  |
| flameMeleeUsed  | Number   | Number of melee fire attacks    |
| timestamp       | String   | ISO timestamp of run save       |


## Example Payload

```json
{
  "playerName": "playerName",
  "levelReached": 0,
  "enemiesKilled": 0,
  "runDuration": 0,
  "fireBallsUsed": 0,
  "flameThrowerUsed": 0,
  "flameMeleeUsed": 0,
  "timestamp": "2025-10-02T15:00:00Z"
}
```

## Merge Policy
We will use a **last write wins** approach based on the `timestamp` field. When a new run is submitted with a later timestamp than the stored record, it replaces the old data. This will be used to store `most recent` run alongside the `high score` run.
