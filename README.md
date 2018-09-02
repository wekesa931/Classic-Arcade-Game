# CLASSIC ARCADE GAME

## About the Game
The game is about a worrior who sets out to save the princess. His journey, However, entails obstacles which he has to evade 
to save the princcess.
###### How to play
use the _up_, _down_, _left_ and _right_ arrow keys to move the player across the blocky terrain until where the princess is to _resque her_. Once you are on the same tile with her, you win. If not and you get hit by the enemy bugs, the game restarts.

## Game Design
The game has been constructed majorly using JavaScript for display of the images on the browser, their movement, collisions and
determining when its time for the game to stop and restart.

The design of the game was ment to test competency in **ES6** syntax as compared to **ES5**; this included **JavaScript constructor functions**
definition and use, use of **this** key word, utilisation of **Immediately Invoked Function Expressions(IFFE)** the **HTML5 Canvas**, using **inheritance** as a way of _borrowing_ properties and methods and
including them in a defined function and general JavaScript functions workaround.

We can call this a _purely JavaScript implemented project_. Below is a walkthrough on the major functionality of the project

### JavaScript Files Definition
There are three files:

#### 1. app.js
This file contains the main function definitions for the *enemy* and the *champion*. We have `Champ class` defined and later assigned to the variable `player`.
```
class Champ{
    constructor(){
        this.startRow=(83*5)-10;
        this.startColumn=101*2;
        this.x=this.startColumn;
        this.y=this.startRow;
        this.success=false;
        -------
```
The snippet shows the class initialized and the constructor variables defined. The **this** keyword, in this context, refers to the variables of the Champ class. within the class we have several methods defined and used:
a. **update()** - to update the position of the images
b. **reset()** - to reset the game
c. **render()** - to draw the images
There is also an event handler that detects keyboard press. this defines the movement of the player in the game.

Within the same file is also the **Enemy** function defined 
```
function Enemy(x,y,killerSpeed) {
    this.x=x;
    this.y=y;
    this.killerSpeed=killerSpeed;
    this.sprite = 'images/enemy-bug.png';
    this.sideways = 101;
};

```
The function takes three arguments which are the positions and speed of the *enemies* in the game. All these are **constructor function definitions**.
Finally is the *keyboard press event listener*
```
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
```
This detects keypress from the four keyboard buttons and shifts the position of the *player*.

#### 2. engine.js
This file provides the game loop functionalitie i.e the render and update entities. It draws the initial game board on the screen, and then calls the update and render methods on the player and enemy objects earlier defined in app.js. It draws the entire game screen over and over hence when the player moves across the screen, it may look like a continous video yet it is not the case. What's really happening is the entire scene is being drawn over and over, making it look like a video.

#### 3. resources.js
This is simply an image loading utility. It eases the process of loading image files so that they can be used within the game. It also includes a simple "caching" layer so it will reuse cached images if you attempt to load the same image multiple times.

## Hosting
The project has been hosted in here: https://wekesa931.github.io/Classic-Arcade-Game/