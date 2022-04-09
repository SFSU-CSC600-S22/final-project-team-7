/******************************************************************************
 * Class: CSC 0600-01 Programming Paradigms and Languages Spring 2022
 * Team: Team 7
 * Name:  Justin Lam
 * 
 * File: Rain.tsx
 * 
 * Description: Rain visulaization that pools up at the bottom of the screen
 *              creating a rain meter based on the notes played.
 *****************************************************************************/

// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

/**
 * Rain Drop Object
 */
type rainDrop = {
  x: number,
  y: number,
  speed: number,
  color: number[]
}

/**
 * Constructer for Rain Drop object
 * @param x coordinate
 * @param y coordinate
 * @param speed of movment of the object
 * @param colors colors of object
 * @returns 
 */
function newRainDrop(x: number, y: number, speed: number, colors: number[]): rainDrop {
  return {
    x: x,
    y: y,
    speed: speed,
    color: colors
  };
}

/**
 * Tracks all rain drops
 */
let allRainDrops: rainDrop[] = [];

/**
 * Rain Visualizer by Justin Lam
 */
export const RainVisualizer = new Visualizer(
  'Rain',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    let maxXCoord: number = 0;
    for (let i = 0; i < values.length; i++) {
      let valueToBeCheck = width * (values[i] as number)
      if (valueToBeCheck > 0) {
        maxXCoord = Math.max(valueToBeCheck, maxXCoord);
      }
    }

    // Add Raindrops into array.
    if (maxXCoord > 0) {
      // Raindrop based on frequency
      allRainDrops.push(newRainDrop(maxXCoord, 0, 2, [255,215,0,255]));
      // Random Raindrop for effect
      allRainDrops.push(newRainDrop(Math.random() * width % width, 0, 2, [0,0,255,255]));
    }

    // update and draw raindrops
    allRainDrops.forEach(element => {
      updateRainDrop(element);
      if (element.y > 0 || element.x < 1)
        drawRainDrop(p5, element);
    });

    // remove raindrops that are at the bottom of the screen.
    allRainDrops = allRainDrops.filter(element => element.y < height);

  },
);

/**
 * Draws the raindrop on the canvas using the raindrop object
 * @param p5 canvas
 * @param droplet object to be drawn
 */
function drawRainDrop(p5: P5, droplet: rainDrop) {
  let xCoord: number = droplet.x;
  let yCoord: number = droplet.y;
  let rainDropcolor = droplet.color; // default blue rain

  // set color of raindrop
  p5.stroke(rainDropcolor[0],rainDropcolor[1],rainDropcolor[2],rainDropcolor[3]);
  p5.fill(rainDropcolor[0],rainDropcolor[1],rainDropcolor[2],rainDropcolor[3]);

  // set shape of raindrop/location
  p5.triangle(xCoord - 5, yCoord, xCoord + 5, yCoord, xCoord, yCoord - 10);
  p5.circle(xCoord, yCoord, 10);

}

/**
 * Update y coordinate of object as it falls
 * @param droplet object to be updated
 */
function updateRainDrop(droplet: rainDrop) {
  if (droplet.y < window.innerHeight) {
    droplet.y = droplet.y + droplet.speed;
    if (droplet.y > window.innerHeight)
      droplet.y = window.innerHeight;
  }
}
