const { instructions, cardinals } = require('./Constants');
const Plateau = require('./Plateau');
const Rover = require('./Rover');
const ControllerHelper = require('./ControllerHelper');

/**  Represents a Controller that will be able to create the Plateau, Rovers and execute instructions. 
 * @extends ControllerHelper
 */
class Controller extends ControllerHelper{
    /**  Creates a Controller that will inherit all properties from the super class ControllerHelper.*/
    constructor(){
        super();
    }

    /**
     * Creates the Plateau that will be used by a list of Rovers.
     * @param {string} input - The upper-right coordinates of the plateau necessary to create a Plateau.
     */
    createPlateau(input){
        const convertedInput = this.convertPlateauInput(input);
        if (convertedInput === null) {
            //console.log("Input is not valid");
        } else {
            this.plateau = new Plateau(convertedInput.x, convertedInput.y);
            //console.log("Done, Plateau has been created.");
        }
    }

    /**
     * Creates a Rover and adds it to a global list of Rovers.
     * @param {string} input - The Rover coordinates on the Plateau.
     * @return {Rover} The new Rover created.
     */
    createRover(input){
        if(this.plateau === null) {
            //console.log("A valid Plateau does not exist.");
            return null;
        }

        const convertedInput = this.convertCreateRoverInput(input);

        if (convertedInput === null) {
            //console.log("Input is not valid");
            return null;
        } else {
            if(this.validBoundaries(convertedInput.x, convertedInput.y)){
                if(this.checkExistingRover(convertedInput.x, convertedInput.y)) {
                    //console.log("A Rover already exists in the specified position for this Plateau.");
                    return null;
                } else {
                    const cardinalIndex = cardinals[convertedInput.cardinal];
                    const newRover = new Rover(this.plateau, convertedInput.x, convertedInput.y, cardinalIndex);
                    this.rovers.push(newRover);
                    //console.log("Done, Rover has been created, you can now enter some instructions to move it.");
                    return newRover;
                }
            }            
        }
    }
    
    /**
     * Executes a series of instructions on a specific Rover.
     * @param {Rover} roverIndex - Index of the Rover we want to give orders to.
     * @param {string} input - Series of instructions telling the rover how to explore the plateau.
     */
    moveRoverSpecific(rover, input){
        if(!this.checkInstructionsAreValid(input)){
            //console.log("The instructions provided are not valid.");
            return null;
        } else {
            for (const letter of input) {
                //Not using a 'default' since I am validating that the input is valid beforehand, so it's redundant.
                switch(letter) {
                    case instructions.left : rover.spinLeft();
                        break;
                    case instructions.right : rover.spinRight();
                        break;
                    case instructions.move : rover.moveForwardSpecific(this.rovers);
                        break;
                }    
            }
            return this.convertResponse(rover.position);
        }
    }   

    /**
     * Executes a series of instructions on a Rover specified by its index in the List of all Rovers..
     * @param {number} roverIndex - Index of the Rover we want to give orders to.
     * @param {string} input - Series of instructions telling the rover how to explore the plateau.
     */
    moveRoverByIndex(roverIndex, input){
        if(!this.checkInstructionsAreValid(input)){
            //console.log("The instructions provided are not valid.");
            return null;
        } else {
            for (const letter of input) {
                //Not using a 'default' since I am validating that the input is valid beforehand, so it's redundant.
                switch(letter) {
                    case instructions.left : this.rovers[roverIndex].spinLeft();
                        break;
                    case instructions.right : this.rovers[roverIndex].spinRight();
                        break;
                    case instructions.move : this.rovers[roverIndex].moveForwardByIndex(this.rovers, roverIndex);
                        break;
                }    
            }
            return this.convertResponse(this.rovers[roverIndex].position);
        }
    }   

}

module.exports = Controller;