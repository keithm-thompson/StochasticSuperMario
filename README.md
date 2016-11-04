# StochasticSuperMario
A retro styled super mario game with a randomly generated level. [Play Now!] (https://stochasticsupermario.com)  
  
Built on [Bezel] (https://github.com/keithm-thompson/Bezel) my lightweight MVC framework.  

![SuperMario](/docs/welcome.png)

## How To Play

Using WASD or the arrow keys to move and space bar to jump, travel through the level avoiding monsters. If you jump on top of a goomba or koopa, you will gain 500 points. Coins are coming soon.

## Implementation Details

1. The game logic is implemented entirely in JavaScript, with heavy use of the EaselJs library.
2. PostgreSQL was used for the database, and I used my lightweight MVC to connect to it. 
3. Collision detection was a big challenge as the EaselJs library did not have the proper utilities for the task. To solve this, I implemented an interval tree and queried the tree whenever characters moved.
