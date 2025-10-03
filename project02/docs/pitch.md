# Pitch

This application will be a repeating dungeon-crawler game with a mage playable character. When the player loads into the game, they will be put into a dungeon room with enemies to defeat. The player has multiple abilities at their disposal, such as a fireball attack, a flamethrower attack, a sprint, a fire melee, etc. The goal of the player is to defeat all of the enemies so that they move onto the next level, where there may be a higher quantity, stronger, or different types of enemies. On the way, the player will be able to level up their own abilities and stats by defeating these enemies. Once the player loses or reaches the final level and succeeds, their results will be stored such that the player can view their best run. The goal is to create an addictive repeatable game that the user may enjoy playing in an effort to reach new high scores.


## Demo Inspiration Audit

The game will run within the browser, with rendering, game logic, and state handled using JavaScript, all handled client-side. Player input will allow for both movement and combat, while game state will record health, mana, stamina, and level of both the players and the enemies, as well as player upgrades; this will persist locally using localStorage. The app will fetch generated attack values for enemy and defense from the public API - Rolz, which generates dice rolls. As mentioned in the pitch, players will be able to create high score for themselves, and this will be written using a PUT request to JSONBin.
