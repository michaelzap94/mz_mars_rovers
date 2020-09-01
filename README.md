# MZ Mars Rovers

This project is my JavaScript implementation of the Mars Rovers coding challenge for Nando's, using Node.js as the engine behind it.
You can check the documentation here: https://michaelzap94.github.io/mz_mars_rovers/

***

##### This is the Description of the Problem:
 ...
> A squad of robotic rovers is to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers so that their on board cameras can get a complete
view of the surrounding terrain to send back to Earth.
A rover's position is represented by a combination of an x and y co-ordinates and a letter representing one of the four cardinal
compass points.
The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the
bottom left corner and facing North.
In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover
spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y+1)

### Input:
  - The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.
  - The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.
  - The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.
  - Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.
 
### Output: 
  - The output for each rover should be its final co-ordinates and heading

### Sample:
  
Test Input:

"5 5"

"1 2 N"

"LMLMLMLMM"

"3 3 E"

"MMRMMRMRRM"

Expected Output:

"1 3 N"

"5 1 E"

...

***

## Design:

I created 1 file holding all the constant variables.
I also created the following 4 classes:
 - Plateau: Represents a Plateau where multiple Rovers can move around.
 - Rover: Represents a Rover that will be able to move around the Plateau.
 - Controller: Represents a Controller that will be able to create the Plateau, Rovers, and execute instructions. It extends the ControllerHelper.
 - ControllerHelper: Represents a ControllerHelper that will contain the necessary methods and data for the Controller to create the Plateau, Rovers, and execute instructions.  

### Challenges faced:
The instructions were pretty clear on the expected output when everything goes well. 
However, they did not indicate how we should tackle the following two scenarios:
 1) The Rover may be at the end of the grid where a move is no longer possible.
 2) The Rover may be about to collide with another Rover.
 
Since there were no clear indications on how to approach these issues. I decided to implement my own logic here:
 - Rover should ignore the current command 'M' if a move is not possible, and therefore, just log that a collision could happen when trying to move in some direction.

### Technologies used:

MZ Mars Rovers uses several open-source projects to work properly:

* [ES6] - JavaScript programming language including new features.
* [node.js] - Evented I/O framework for the backend.
* [mocha] - Mocha is a feature-rich JavaScript test framework running on Node.js.
* [JSDocs] - Generates an HTML documentation website using your comments.

And of course MZ Mars Rovers itself is open source with a [public repository][mz_mars_rovers] on GitHub.

### Installation

First, you should clone this repository:

```sh
$ git clone https://github.com/michaelzap94/mz_mars_rovers.git
$ cd mz_mars_rovers
```

MZ Mars Rovers requires [Node.js](https://nodejs.org/) v12+ to run.
Once you have installed Node.js, Install the dependencies and devDependencies and run the tests.

```sh
$ npm install -d
$ npm test
```

The tests will give you a broader understanding of how this software was implemented. You can find them in the "test" folder.

Alternatively, you can also run a quick test, that will execute the code by providing the instructions in one go. You will see the results in the terminal. 
(This test is also included in the test cases in the "test" folder, using more instructions).

```sh
$ npm start
```

### Todos

 - Create a user interface

License
----

MIT


**Free Software**

   [mz_mars_rovers]: <https://github.com/michaelzap94/mz_mars_rovers>
   [node.js]: <http://nodejs.org>
   [mocha]: <https://mochajs.org/>
   [ES6]: <https://www.w3schools.com/js/js_es6.asp>
   [JSDocs]: <https://jsdoc.app/>
