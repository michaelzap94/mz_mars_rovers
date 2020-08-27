const instructions = {
    left: 'L',
    right: 'R',
    move: 'M'
}

const cardinals = {
    'N': 0,
    'E': 1, 
    'S': 2, 
    'W': 3
}

const cardinalsByIndex = ['N', 'E', 'S', 'W'];

const minLowerLeftCoordinates = {x: 0, y: 0}

module.exports = {instructions, cardinals, cardinalsByIndex, minLowerLeftCoordinates};