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

type rainDrop = {
  x: number,
  y: number,
  speed: number,
  color: number[]
}

function newRainDrop(x: number, y: number, speed: number, colors: number[]): rainDrop {
  return {
    x: x,
    y: y,
    speed: speed,
    color: colors
  };
}


let allRainDrops: rainDrop[] = [];

export const RainVisualizer = new Visualizer(
  'Rain',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    let maxXCoord: number = 0;
    for (let i = 0; i < values.length; i++) {
      // p5.stroke(0,0,255,255);
      let valueToBeCheck = width * (values[i] as number)
      if (valueToBeCheck > 0) {
        maxXCoord = Math.max(valueToBeCheck, maxXCoord);
      }
    }

    if (maxXCoord > 0) {
      // Raindrop based on frequency
      allRainDrops.push(newRainDrop(maxXCoord, 0, 2, [255,215,0,255]));
      // Random Raindrop for effect
      allRainDrops.push(newRainDrop(Math.random() * width % width, 0, 2, [0,0,255,255]));
      drawRainDrop(p5, allRainDrops[allRainDrops.length - 1]);
    }

    allRainDrops.forEach(element => {
      updateRainDrop(element);
      if (element.y > 0 || element.x < 1)
        drawRainDrop(p5, element);
    });

    allRainDrops = allRainDrops.filter(element => element.y < window.innerHeight);

    // p5.strokeWeight(dim * 0.01);
    // p5.stroke(0, 0, 255, 255);
    // p5.noFill();
    // const values = analyzer.getValue();
    // p5.beginShape();
    // for (let i = 0; i < values.length; i++) {
    //   const amplitude = values[i] as number;
    //   const y = p5.map(i, 0, values.length - 1, 0, height);
    //   const x = height / 2 + amplitude * height;
    //   // Place vertex
    //   p5.vertex(x, y);
    // }
    // p5.endShape();

  },
);

/**
 * 
 * @param x x coordinate on grid
 * @param y y coodeinate on grid
 * @param speed speed of falling rain drop
 * @param color color of rain drop
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
 * 
 * @param droplet update y coordinate of object as it falls
 */
function updateRainDrop(droplet: rainDrop) {
  if (droplet.y < window.innerHeight) {
    droplet.y = droplet.y + droplet.speed;
    if (droplet.y > window.innerHeight)
      droplet.y = window.innerHeight;
  }
}
