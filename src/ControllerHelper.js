const { minLowerLeftCoordinates, cardinalsByIndex } = require('./Constants');

/**  Represents a Controller Helper that will contain the necessary methods and data
 *   for the Controller to create the Plateau, Rovers and execute instructions.  
 */
class ControllerHelper{
    /** Creates a ControllerHelper. 
     *  It will contain a reference to the Main and only Plateau created, and,
     *  will also hold a list of Rovers that have been created.
    */
    constructor(){
        this.plateau = null;
        this.rovers = [];
    }

    /**
     * Converts the input entered into valid values that can be understood by the program.
     * @param {string} input - The upper-right coordinates of the plateau necessary to create a Plateau.
     */
    convertPlateauInput(input){
        const matches = input.match(/^(\d+)[ ]+(\d+)$/);

        if(matches === null || typeof matches[1] === 'undefined' || typeof matches[2] === 'undefined') {
            return null;
        } else {
            return {x: parseInt(matches[1]), y: parseInt(matches[2])}
        }
    }

    /**
     * Converts the input entered into valid values that can be understood by the program.
     * @param {string} input - The Rover coordinates on the Plateau.
     */
    convertCreateRoverInput(input){
        const matches = input.match(/^(\d+)[ ]+(\d+)[ ]+(N|E|S|W)$/);

        if(matches === null || typeof matches[1] === 'undefined' || typeof matches[2] === 'undefined' || typeof matches[3] === 'undefined' ) {
            return null;
        } else {
            return {x: parseInt(matches[1]), y: parseInt(matches[2]), cardinal: matches[3]}
        }
    }

    /**
     * Checks if the boundaries that we want to use are valid.
     * e.g: if the Plateau is 0,0 to 5,5 -> A Rover cannot be on 0,7.
     * @param {number} x - The x-coordinate value.
     * @param {number} y - The y-coordinate value.
     */
    validBoundaries(x, y){
        if(isNaN(x) || isNaN(y)){
            //console.log("The coordinates are not valid input");
            return false;
        }
        if(x > this.plateau.x || x < minLowerLeftCoordinates.x){
            //console.log("The x coordinates are out of bounds");
            return false;
        }
        if(y > this.plateau.y || y < minLowerLeftCoordinates.y){
            //console.log("The y coordinates are out of bounds");
            return false;
        }

        return true;
    }

    /**
     * Checks that the instructions provided are valid.
     * @param {string} input - Series of instructions telling the rover how to explore the plateau.
     */
    checkInstructionsAreValid(input){
        return /^(L|R|M)+$/.test(input);
    }

    /**
     * Checks if the coordinates that we want to use are free or occupied by another Rover.
     * e.g: if a Rover is on 0,0, we cannot place another Rover here, as it's physically impossible.
     * @param {number} x - The x-coordinate value.
     * @param {number} y - The y-coordinate value.
     */
    checkExistingRover(x, y){
        for(const existingRover of this.rovers) {
            if(x === existingRover.position.x && y === existingRover.position.y) {
                return true;
            }
        }
        return false
    }

    /**
     * Converts the Rover's position Object into a String.
     * @param {Object} roverPosition - The final position of the Rover after having followed the instructions provided.
     * @return {string} The final position of the Rover after having followed the instructions provided, in String format.
     */
    convertResponse(roverPosition){
        return `${roverPosition.x} ${roverPosition.y} ${cardinalsByIndex[roverPosition.cardinal]}`;
    }
}

module.exports = ControllerHelper;
