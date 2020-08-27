var assert = require('assert');

/* Source modules ******************************/
const Controller = require('../src/Controller');
const {cardinals} = require('../src/Constants');

/***********************************************/

describe('You are given the initial upper-right coordinates of the plateau', () => {

    it('should NOT create Plateau when input is invalid', () => {
        const controller = new Controller();
        controller.createPlateau("5 5 45 54 invalid input");

        assert.equal(controller.plateau, null);
    });

    it('should create Plateau and set its coordinates when input is valid', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");

        assert.notEqual(controller.plateau, null);
        assert.equal(controller.plateau.x, 5);
        assert.equal(controller.plateau.y, 5);
    });
});

describe('You are given the initial coordinates of a rover and the direction it is facing', () => {
    it('should NOT create Rover when a Plateau does not exists first', () => {
        const controller = new Controller();
        const newRover = controller.createRover("3 3 N");

        assert.equal(controller.plateau, null);
        assert.equal(newRover, null);
    });

    it('should NOT create Rover when input is invalid', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");
        const newRover = controller.createRover("not a valid input");

        assert.notEqual(controller.plateau, null);
        assert.equal(newRover, null);
    });

    it('should NOT create Rover when the coordinates passed are out of bounds', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");
        const newRover = controller.createRover("1 6 N");

        assert.notEqual(controller.plateau, null);
        assert.equal(newRover, null);
    });

    it('should create Rover and set starting location', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");
        const newRover = controller.createRover("1 2 N");
        assert.notEqual(controller.plateau, null);
        assert.notEqual(newRover, null);
        assert.equal(newRover.position.x, 1);
        assert.equal(newRover.position.y, 2);
        assert.equal(newRover.position.cardinal, cardinals['N']);
    });

    it('should NOT create Rover when a Rover already exists in the specified coordinates', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");
        const newRover = controller.createRover("1 2 N");
        const newRover2 = controller.createRover("1 2 N");

        assert.notEqual(controller.plateau, null);
        assert.notEqual(newRover, null);
        assert.equal(newRover2, null);
    });
});

describe('You are given a sequence of commands that a specific Rover must follow', () => {
    it('should return null when input is invalid', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");
        const newRover = controller.createRover("1 2 N");
        const finalPosition = controller.moveRoverSpecific(newRover, "any invalid input");
        assert.equal(finalPosition, null);
    });

    it('should return expected final position when input is valid', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");

        const rover1 = controller.createRover("1 2 N");
        const rover1FinalPosition = controller.moveRoverSpecific(rover1, "LMLMLMLMM");

        const rover2 = controller.createRover("3 3 E");
        const rover2FinalPosition = controller.moveRoverSpecific(rover2, "MMRMMRMRRM");

        const rover3 = controller.createRover("0 0 S");
        const rover3FinalPosition = controller.moveRoverSpecific(rover3, "LLMMRMM");

        const rover4 = controller.createRover("1 1 E");
        const rover4FinalPosition = controller.moveRoverSpecific(rover4, "MRM");

        const rover5 = controller.createRover("5 5 W");
        const rover5FinalPosition = controller.moveRoverSpecific(rover5, "MLM");

        assert.equal(rover1FinalPosition, "1 3 N");
        assert.equal(rover2FinalPosition, "5 1 E");
        assert.equal(rover3FinalPosition, "2 2 E");
        assert.equal(rover4FinalPosition, "2 0 S");
        assert.equal(rover5FinalPosition, "4 4 S");
    });

});

describe('You are given a sequence of commands that will make a Rover move out of the Plateau', () => {
    
    it('should stay at the same position when commands want the Rover to go out of the Plateau', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");

        const rover = controller.createRover("5 5 E");
        const roverFinalPosition = controller.moveRoverSpecific(rover, "M");

        assert.equal(roverFinalPosition, "5 5 E");
    });

});

describe('You are given a sequence of commands that will make a Rover collide with other Rovers', () => {
    
    it('should stay at the same position when a Rover is about to collide with another Rover', () => {
        const controller = new Controller();
        controller.createPlateau("5 5");

        const rover1 = controller.createRover("3 3 E");
        const rover2 = controller.createRover("3 2 N");
        const rover2FinalPosition = controller.moveRoverSpecific(rover2, "M");

        assert.equal(rover2FinalPosition, "3 2 N");
    });

});