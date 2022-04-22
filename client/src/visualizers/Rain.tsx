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
 * Rain Meter Object
 */
// type rainMeter = {
//   x: number,
//   droplets: number,
//   color: number[]
// }

/**
 * Constructer for Rain Drop object
 * @param x coordinate
 * @param y coordinate
 * @param speed of movment of the object
 * @param color color of object
 * @returns 
 */
function newRainDrop(x: number, y: number, speed: number, color: number[]): rainDrop {
  return {
    x: x,
    y: y,
    speed: speed,
    color: color
  };
}

/**
 * Constructor for Rain Meter object
 * @param x coordinate
 * @param droplets number of droplets to determine Height
 * @param color color of object
 * @returns 
 */
// function newRainMeter(x: number, droplets: number, color: number[]): rainMeter {
//   return {
//     x: x,
//     droplets: droplets,
//     color: color
//   }
// }

/**
 * Tracks all rain drops
 */
let allRainDrops: rainDrop[] = [];

/**
 * Tracks all rain meters
 */
// let rainMeters: rainMeter[] = [];

/**
 * evaporation timer to remove from rain meter.
 */
// let evaporateTimer: number = 0;

/**
 * color array for rain
 */
const goldDroplet: number[] = [255,215,0,255];
const blueDroplet: number[] = [0,0,255,255];

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
    values.forEach(element => {
      let valueToBeCheck = width * (element as number);
      if (valueToBeCheck > 0) 
        maxXCoord = Math.max(valueToBeCheck, maxXCoord);
    })

    // Add Raindrops into array.
    if (maxXCoord > 0) {
      // Raindrop based on frequency
      allRainDrops.push(newRainDrop(maxXCoord, 0, 2, goldDroplet));
      // Random Raindrop for effect
      allRainDrops.push(newRainDrop(Math.random() * width % width, 0, 2, blueDroplet));
    }

    // update and draw raindrops
    allRainDrops.forEach(element => {
      updateRainDrop(element);
      if (element.y < height) 
        drawRainDrop(p5, element);
      // if (element.y < height && element.color === goldDroplet)
      //   addToRainMeter(newRainMeter(element.x,10,goldDroplet));
    });

    // //draw rainmeters
    // rainMeters.forEach(element => {
    //   if (element.droplets > 0)
    //     drawRainMeter(p5, element);
    // });

    // // evaporate from the rain meter.
    // if (evaporateTimer === 10) {
    //   evaporateTimer = 0;
    //   evaporateFromRainMeters();
    // } else {
    //   evaporateTimer++;
    // }

    // remove raindrops that are at the bottom of the screen.
    allRainDrops = allRainDrops.filter(element => element.y < height);
    if (allRainDrops.length > 400)
      allRainDrops = allRainDrops.splice(allRainDrops.length/2, allRainDrops.length);
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

/**
 * Draw rain meter onto canvas
 * @param p5 canvas
 * @param meter rain meter to be drawn
 */
// function drawRainMeter(p5: P5, meter: rainMeter) {
//   let xCoord: number = meter.x;
//   let yCoord: number = window.innerHeight/2 - meter.droplets;
//   let meterColor = meter.color;

//   // set color of rainmeter
//   p5.stroke(meterColor[0],meterColor[1],meterColor[2],meterColor[3]);
//   p5.fill(meterColor[0],meterColor[1],meterColor[2],meterColor[3]);
  
//   // set shape of meter
//   p5.rect(xCoord, yCoord, 10, meter.droplets);
// }

/**
 * Check if meter is in global rain meter,
 * adds to rain meter 
 * @param meter meter to be added
 */
// function addToRainMeter(meter: rainMeter) {
//   let rainColumn: number = Math.floor(meter.x);
//   rainMeters.forEach(element => {
//     if (element.x === rainColumn)
//       element.droplets += 10;
//   });
//   rainMeters.push(meter);
// }

/**
 * evaporates from rain form rain meter.
 */
// function evaporateFromRainMeters() {
//   rainMeters.forEach(meter => {
//     if (meter.droplets > 0)
//       meter.droplets--;
//   });
// }