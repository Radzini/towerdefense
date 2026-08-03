
## Tower/Paragon Cleanup + Bug Fix Pass

+ [X] Add shared tower footprint + paragon rule helpers for Gunner, Sniper, and Rocketer
+ [X] Rework paragon rank rules to use live maxed tower counts: 1 = R1, 15 = R2, 30 = R3
+ [X] Change Gunner/Sniper/Rocketer placement scaling to double every 5 placed towers
+ [X] Add Rocketer Paragon with passive buff, acid explosions, and Cluster ability
+ [X] Make Rocketer upgrades cost $2000 each after Rocketer Paragon exists
+ [X] Fix Drone UI placement wiring so the button works like hotkey V
+ [X] Fix C-Base 5x5 hitbox/selection/sell footprint handling through shared helpers
+ [X] Fix C-Base AP distribution fairness and Resonator orbit acceleration behavior
+ [X] Move Mafia bounty payout into the enemy death pipeline
+ [X] Centralize cursor state handling and expand unit/enemy status effect display
+ [X] Run syntax verification on edited JS files
+ [X] Do a manual in-game verification pass for paragon thresholds, Cluster feel, acid behavior, and intermittent path-stop cases


## Hard Mode Rework:
+ [X] Add Stone Titan tower shot debuff, 40% split trigger, and death spawns
+ [X] Add Rock Cube split-on-death behavior into Rock Cube Smalls
+ [X] Add Guardian Cube-2 proximity stun attack for towers near the path
+ [X] Add Zeltron Cube death stun in a 5x5 area
+ [X] Add Crystalized Titan Cube tower shot, acid pool tower debuff, phase unlocks, rocket strike, and anti-summoner barrage
+ [X] Add shared hardmode tower combat debuff handling and visuals/status text
+ [X] Run syntax verification on edited JS files
+ [] Do a manual in-game verification pass for Stone Titan, Guardian Cube-2, Zeltron, and Crystalized Titan timings/targeting

## Current Prompt
we are reworking hardmode so.

here's what needs to be changed:

Cube of doom / Stone Titan (new enemy):
- randomly shoots a tower within a tower in 6 grid radius, stunning for 6s and gives 50% damage+firerate debuff for 12s. 20s cooldown.
- upon reaching 40% of the hp summons 2 rock cubes. And stuns towers in 3x3 radius for 8s.
- on death, spawns 10 rock cubes.

Rock cubes: (new enemy)
- upon death spawn 1-3 (rng) rock cube smalls.

guardian cube:
- getting close a tower that is placed near the path, attacks into it and stuns for 4s. 5s cooldown.

Zeltron cube:
- upon death stun every tower in 5x5 radius.

Crtsyalized Titan Cube:
- shoot a tower stunning for 6s, has 3s cooldown.
- upon getting close to a tower in path. Does an acid pool like rocketer paragon in 3x3 radius. Debuffs towers in that radius by 50% firerate and 75% damage, stunning for 1s upon activation. Has 20s cooldown, (stops while shoots this).
- upon reaching 500k hp, active rocket ability and summon kguardian_cube_2.
- rocket ability: shoots a ball into where there most towrs are and does 10s stun, has 12s cooldown. (4x4 radius)
- upon reaching 200k hp gain 2s immunity, +0.1 speed, and +250k shield. And active Anti-Summoner ability.
- Anti-Summoner: shoots missiles at any summoner dealing 15% max hp damage along with 500. Shoots 6 of them every 0.2s, has 30s cooldown.
