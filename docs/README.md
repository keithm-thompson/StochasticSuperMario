# StochasticSuperMario
Super Mario inspired game with randomly generated levels.

### Functionality & MVP
With StochasticSuperMario, users will be able to:

- [ ] Travel through an auto generated level
- [ ] Collect coins to accumulate a score - high scores will be stored in a text file
- [ ] Choose from a few different level 'styles' such as grass or desert

In addition, this project will include: 
- [ ] A welcome modal allowing users to see the high score and their current score
- [ ] a production README

### Wireframes

This app will consist of a single screen with a 'screen' displaying the mario character and the surrounding area. There will be a small area below the screen showing the controls.

### Architecture and Technologies

Vanilla JavaScript and jQuery for overall structure
HTML Canvas for rendering the game views
Webpack to bundle the various scripts

### Implementation Timeline

Day 1: Setup the whole project as well as creating a sprite image of everything I will need. (I will be using an online resource for making the sprite image.
Become comfortable with Canvas (possibly Easle.js).

Day 2: Render all the views as well as get an idea of how to cache the images that are frequently on the screen. No logic for lives lost or score being kept will be done yet. The main focus is having motion seamless and fluid.

Day 3: Work out the logic for character collisions (with other characters as well as objects). Losing lives as well as picking up coins should be fully worked out by the end of this day.

Day 4: Play through the game so that some constraints can be put on the board. Presumably, there will be multiple situations in which a random game board can create awkward situations for the player. Must limit the number of potential 'automatic losses' for the player.

Bonus: TBD
