/**
 * @constructor This is the Champ constructor that contains the properties of the player
 * @description It consists of the players image and the methods to update the main player's,
 * detect collision and determine whether the game has been won
 * @param {string} sprite = the image of the player.
 * @param {string} startRow = the start y position
 * @param {string} startColumn = the start x position
 * @param {string} success = the target of the game
 */


class Champ{
    constructor(){
        //these define the position of champ and specify his image
        this.sprite='images/char-boy.png';
        /**
         * The default position would be (0,0). Assigning the following pixel arithmetic
         * gives champ his default position.
         */
      
        this.startRow=(83*5)-10; //I subtracted the 20px to make it more centered within the box.
        this.startColumn=101*2;

        //this is the default start position
        this.x=this.startColumn;
        this.y=this.startRow;
        //when the champ reaches the middle block on the upper part, the game should be successfully over
        this.success=false;

    }

    /**
     *@description this method will help us check collisions between champ and the killers 
     * I looped through all the individual items in the allEnemies array to determine their position
     * @param {string} success = defines when the game ends
     * @param {*} x_and_y = define the position of the image on the x and y axis
     * 
     */
   
    update(){
        for(let killer of allEnemies){
            //check whether they are on the same y level
            if(this.y===killer.y && (killer.x + 50 > this.x
            && killer.x < this.x + 50)){
                //when the above condition is met the game should reset by calling the reset function
                this.resetGame();
                console.log(this.y,this.x);
            }
        }
        if(this.x===202 && this.y===73){
            
            this.success=true;
        }
    }
    //Call the reset game function
    resetGame(){
        this.y=this.startRow;
        this.x=this.startColumn;

    }
   
    /**
     * we can now position champ on the screen using a render method
     * it calls the drawImage method from the 2 dimensional canvas
     * @description function to draw the image on the browser screen
     */
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //this method updates champ's location depending on the keyboard key pressed
    handleInput(keypressed){
        /**
         *using the switch() method we can then detect the user with keyboard press
         *from the render function we notice that the column height is 101px and row length is 83px
         *I included those here to allow effective movement of champ on the game board.
         */
       
        switch(keypressed){
            case 'up':
            //to prevent champ from going beyond the top canvas boundary
            if(this.y>83){
                this.y -=83;   
            }
                break;
            //to prevent champ from going beyond the bottom canvas boundary
            case 'down':
            if(this.y<83*4){
                this.y +=83;
            }                
                break;
            //to prevent champ from going beyond the left canvas boundary
            case 'left':
            if(this.x>0){
                this.x -=101;
            }
                break;
            //to prevent champ from going beyond the right canvas boundary
            case 'right':
            if(this.x<101*4){
                this.x +=101;
            }
                break;

        }
    }
    
}
//I then assigned the constructor function Champ to a variable player
const player = new Champ();

/**
 * I added the enemy bugs. I named them 'killer'
 * I included the arguments so as to identify uniquely the position of the killer enemy bugs
 * the killerSpeed parameter is to uniquely give the bugs different speeds
 * this makes the game entertaining and interesting
 */

const killer1 = new Enemy(-101,73,120);
const killer2 = new Enemy(-101,156,180);
const killer3 = new Enemy((-101*2.5), 156,250);
const killer4 = new Enemy(-101,239,250);
const killer5 = new Enemy(-101,73,120);
const killer6 = new Enemy(-101,73,100);
const killer7 = new Enemy((-101*4), 156,150);
const killer8 = new Enemy(-101,239,350);
const allEnemies = [];
allEnemies.push(killer1,killer2,killer3,killer4,killer5,killer6,killer7,killer8);



/**
 * @description this function defines the Enemies our player must avoid
 * @param {*} x = horizontal position of the enemy image
 * @param {*} y = vertical position of the enemy
 * @param {string} killerSpeed = the speed of movement of the enemy
 * @param {string} sideways = defines one step to the left
 */
function Enemy(x,y,killerSpeed) {
    //I set up the enemy's position here
    this.x=x;
    this.y=y;
    this.killerSpeed=killerSpeed;
    this.sprite = 'images/enemy-bug.png';
    this.sideways = 101;
};

/**
 * @description function to Update the enemy's position
 * @param {*} dt = defines time the images move. It has already been 
 * defined for purposes of uniformity across browsers
 */
Enemy.prototype.update = function(dt) {
    //this condition moves the enemy forward
    if(this.x < this.sideways*5){
        this.x += this.killerSpeed * dt; //each killer bug has its own speed
    }
    else{
        this.x=-101;//this is set to negative so that the enemy can flow in smoothly
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description the event listener detects keyboard entry
 */
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
