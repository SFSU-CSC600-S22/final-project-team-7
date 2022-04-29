// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const WeifomVeezualizah = new Visualizer(
  'Veezualizah',
  (p5: P5, analyzer: Tone.Analyser) => {
    const values = analyzer.getValue()

    var flowerPetal = 1;

    p5.background(0, 0, 0, 255);
    p5.noFill();
    p5.beginShape();

    // Background flying particles
    for (let i = 0; i < Math.floor(window.innerWidth / 30); i++) {
        p5.circle(p5.random(window.innerWidth), p5.random(window.innerHeight), 5);
        p5.stroke(p5.random(140, 255), p5.random(140, 255), p5.random(140, 255), p5.map(0, 0, 100, 255, 0));
        p5.frameRate(10);
    }

    // A pwetty flower
    p5.translate(500, 200);
    p5.strokeWeight(7);
    p5.stroke(p5.random(120, 255), p5.random(120, 255), p5.random(120, 255), p5.map(0, 0, 100, 255, 0));

    for (let i = 0; i < values.length * 2; i++) {
        let amp = values[i] as number;
        let freq = 1 / amp;

        if (flowerPetal % 2 === 0) {
            p5.ellipse(
              amp * 100,
              100 + amp * 500,
              5 + amp * 0,
              5 + amp * 0
            );
            p5.ellipse(
              freq,
              amp * 10,
              amp * 10,
              amp * 10
            )
        }
        else {
            p5.ellipse(
              0,
              68 + amp * 100,
              20 + amp * 100,
              130 + amp * 100
            );
            p5.ellipse(
              freq,
              amp * 10,
              amp * 10,
              amp * 10
            )
        }

        flowerPetal++;

        p5.rotate(p5.PI / 8);
    }

    p5.pop();
    p5.endShape();
  },
);
