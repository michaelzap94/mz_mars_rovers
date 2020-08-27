const { cardinals, minLowerLeftCoordinates } = require('./Constants');

/**  Represents a Rover that will be able to move around the Plateau. */
class Rover{
    /**
     * Create a Rover.
     * @param {number} x - The x-coordinate value.
     * @param {number} y - The y-coordinate value.
     * @param {number} cardinal - The cardinal index value.
     */
    constructor(Plateau, x, y, cardinal){
        this.plateau = Plateau;
        this.position = { x, y, cardinal };
    }

    /**
     * Spin the Rover 90 degrees to the left, without moving from its current spot.
     */
    spinLeft(){
        this.position.cardinal = (this.position.cardinal === 0) ? 3 : this.position.cardinal - 1;
    }

    /**
     * Spin the Rover 90 degrees to the right, without moving from its current spot.
     */
    spinRight(){      
        this.position.cardinal = (this.position.cardinal === 3) ? 0 : this.position.cardinal + 1;
    }

    /**
     * Move forward one grid point, and maintain the same heading.
     * -> PROBLEM: The Rover may be at the end of the grid where move is no longer possible or will collide with another Rover
     *    Possible solution: Teletransport the Rover to the other end of the Grid, or occupy same space as the other Rover.
     *                       However, this would not be a realistic solution.
     * -> ACTUAL solution: Do not move the Rover as a move is not possible and therefore just log that a collision could happen.
     * 
     * @param {number} rovers - List of all Rovers in the Plateau.
     * @param {number} currentRoverIndex - Index of this Rover in the List of all Rovers.
     */
    moveForwardByIndex(rovers, currentRoverIndex){
        switch(this.position.cardinal) {
            //Facing North
            case cardinals.N:                   
                    const newYPositionNorth = this.position.y + 1;  
                    if(newYPositionNorth > this.plateau.y || this.willCollideWithRoverByIndex(this.position.x, newYPositionNorth, rovers, currentRoverIndex)){
                        console.log("The Rover will collide going North, hence, ignoring this move.");
                    } else {
                        this.position.y = newYPositionNorth;
                    }
                break;
            //Facing East
            case cardinals.E:  
                    const newXPositionEast = this.position.x + 1;  
                    if(newXPositionEast > this.plateau.x || this.willCollideWithRoverByIndex(newXPositionEast, this.position.y, rovers, currentRoverIndex)){
                        console.log("The Rover will collide going East, hence, ignoring this move.");
                    } else {
                        this.position.x = newXPositionEast;
                    }
                break;
            //Facing South
            case cardinals.S: 
                    const newYPositionSouth = this.position.y - 1;
                    if(newYPositionSouth < minLowerLeftCoordinates.y || this.willCollideWithRoverByIndex(this.position.x, newYPositionSouth, rovers, currentRoverIndex)){
                        console.log("The Rover will collide going South, hence, ignoring this move.");
                    } else {
                        this.position.y = newYPositionSouth;
                    }
                break;
            //Facing West
            case cardinals.W: 
                    const newXPositionWest = this.position.x - 1;
                    if(newXPositionWest < minLowerLeftCoordinates.x || this.willCollideWithRoverByIndex(newXPositionWest, this.position.y, rovers, currentRoverIndex)){
                        console.log("The Rover will collide going West, hence, ignoring this move.");
                    } else {
                        this.position.x = newXPositionWest;
                    }
                break;
        }
    }

    /**
     * Checks if the Current Rover will collide with other Rovers.
     * @param {number} x - The x-coordinate value.
     * @param {number} y - The y-coordinate value.
     * @param {number} rovers - List of all Rovers in the Plateau.
     * @param {number} currentRoverIndex - Index of this Rover in the List of all Rovers.
     */
    willCollideWithRoverByIndex(x, y, rovers, currentRoverIndex){
        for (let i = 0; i < rovers.length; i++) {
            if(i === currentRoverIndex){
                //we want to skip this Rover when checking for collisions with other Rovers
                continue;
            }
            //rovers[i] -> will be other Rover in the list
            if(x === rovers[i].position.x && y === rovers[i].position.y) {
                return true;
            }
        }
        return false;
    }

    /**
     * Move forward one grid point, and maintain the same heading.
     * -> PROBLEM: The Rover may be at the end of the grid where move is no longer possible or will collide with another Rover
     *    Possible solution: Teletransport the Rover to the other end of the Grid, or occupy same space as the other Rover.
     *                       However, this would not be a realistic solution.
     * -> ACTUAL solution: Do not move the Rover as a move is not possible and therefore just log that a collision could happen.
     * 
     * @param {number} rovers - List of all Rovers in the Plateau.
     */
    moveForwardSpecific(rovers){
        switch(this.position.cardinal) {
            //Facing North
            case cardinals.N:                   
                    const newYPositionNorth = this.position.y + 1;  
                    if(newYPositionNorth > this.plateau.y || this.willCollideWithRoverSpecific(this.position.x, newYPositionNorth, rovers)){
                        console.log("The Rover will collide going North, hence, ignoring this move.");
                    } else {
                        this.position.y = newYPositionNorth;
                    }
                break;
            //Facing East
            case cardinals.E:  
                    const newXPositionEast = this.position.x + 1;  
                    if(newXPositionEast > this.plateau.x || this.willCollideWithRoverSpecific(newXPositionEast, this.position.y, rovers)){
                        console.log("The Rover will collide going East, hence, ignoring this move.");
                    } else {
                        this.position.x = newXPositionEast;
                    }
                break;
            //Facing South
            case cardinals.S: 
                    const newYPositionSouth = this.position.y - 1;
                    if(newYPositionSouth < minLowerLeftCoordinates.y || this.willCollideWithRoverSpecific(this.position.x, newYPositionSouth, rovers)){
                        console.log("The Rover will collide going South, hence, ignoring this move.");
                    } else {
                        this.position.y = newYPositionSouth;
                    }
                break;
            //Facing West
            case cardinals.W: 
                    const newXPositionWest = this.position.x - 1;
                    if(newXPositionWest < minLowerLeftCoordinates.x || this.willCollideWithRoverSpecific(newXPositionWest, this.position.y, rovers)){
                        console.log("The Rover will collide going West, hence, ignoring this move.");
                    } else {
                        this.position.x = newXPositionWest;
                    }
                break;
        }
    }

    /**
     * Checks if the Current Rover will collide with other Rovers.
     * @param {number} x - The x-coordinate value.
     * @param {number} y - The y-coordinate value.
     * @param {number} rovers - List of all Rovers in the Plateau.
     */
    willCollideWithRoverSpecific(x, y, rovers){
        for (let i = 0; i < rovers.length; i++) {
            //rovers[i] -> will be other Rover in the list
            if(rovers[i] === this){
                //we want to skip this Rover when checking for collisions with other Rovers
                continue;
            }
            if(x === rovers[i].position.x && y === rovers[i].position.y) {
                return true;
            }
        }
        return false;
    }

}

module.exports = Rover;