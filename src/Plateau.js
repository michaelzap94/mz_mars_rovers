/**  Represents a Plateau where multiple Rovers can move around. */
class Plateau{
    /**
     * Create a Plateau.
     * @param {number} x - The x-coordinate of the upper-right coordinates of the plateau.
     * @param {number} y - The y-coordinate of the upper-right coordinates of the plateau.
     */
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

module.exports = Plateau;