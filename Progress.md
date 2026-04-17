## C-Base Armada Power Rework

[X] Update summon roster, stats, spawn table, and Armada Power caps
 [X] Rework Caster, Oppressor, and Impaler around Armada Power gain rules
 [X] Add Resonator with orbiting beam/orb behavior
 [X] Convert Executioner and Crimson Crusader abilities to Armada Power costs
 [X] Add timed global damage buff, default self-destruct, and Armada gifting
 [X] Update HUD text/visuals from Potency to Armada Power
 [X] Run a quick verification pass for syntax or obvious runtime issues

## C-Base Armada Power Follow-Up

[X] Remove free on-hit Armada gain from Armada-using units
 [X] Add +1 Armada Power every 30s to all C-Base units
 [X] Start Resonator, Executioner, and Crusader with 1 Armada Power
 [X] Add summon inspector stats for Armada Power, overheat, beam damage, and cooldowns



Current Prompt:
hey I want to rework c-base tower a little.
The potency will work differently and will be Armada Power now. When you're doing and planning something put it on Progress.md as shown in the example inside, this will make your goal more visible.

what you should understand:

old -> new
+ = smth added or reworked
- = smth removed
caster:

hp, 1000 -> 2000
shield hp, 500 -> 1500
+ grenade gives +2 Armada Power to self.
- removed self-buffing by armada power.

oppressor:

hp, 3000-> 1000
shield hp, 1000 -> 1500
+ piercing damage gives +1 Armada Power to self.
- removed self-buffing by armada power.

Impaler:

hp, 10000 -> 12500
shield hp, 5000 -> 7500
+ every 4 hits, give +3 Armada Power to self.
+ every self-destruct give +2 Armada Power to self.
+ every time it colliddes with an enemy, deal 2000-2500 damage in 2x2 range.
- removed self-buffing by armada power.

New Unit - Resonator: (Given at lvl 3)

hp, 5000
shield hp, 2500
speed, same as oppresor
size, 35
damage, 50x2 (max 350x2)
overheat capacity, 750
firerate, 0.1
orbcount, 2
orbcooldown, 10s
orbdamage, 7500
How it works: like the moon cube in secretwave, it has orbs but only 2. Those orbs shoots a beam like charger tower where they lock on one enemy and gain more damage (+50 dmg every second). The orbs spin aswell. Upon reaching +300 damage, gain +25 overheat every 0.25s. If overheat is 750, the orbs then collide into each other to form a big orb and it goes to the current locked enemy dealing 7500 damage. One Visual detail: the more damage it gets, the faster orbs orbit around.
spawn cd, 75000ms
spawn delay, 0
spawncount, 1
+ uses 1 armada power to shoot, gains it through oppresors.

Executioner:
shield hp, 25000 -> 75000
+ armada power is now reseource to use his abilities.
- removed self-buffing by armada power.

Crimson Crusader:
spawn cd, 60s -> 80s
- omega explosion now only heals 50k hp back instead of full
+ potency strike now costs 6 Armada Power.
+ spawning now costs 8 Armada Power.
+ new ability, burst laser:
- 600 damage, 0.05s firerate, 50x burst count. 15s burst cooldown. Costs 4 Armada Power,
- removed self-buffing by armada power.

Crimson Crusader + Executioner:
- now uses armada power as resource to use on their abilities. (Capacity of 20)
Other units:
- now have +50% more damage for 10s every 50s.
- every of them have self-destruct mechanism dealing 500 by default (except impaler).
- every 5 seconds, give armada power to randomly executioner or crimson crusader in the field.
- each Unit has 5 capacity besides executioner and crusader.
Global:
- self-buffing by armada power is removed.
