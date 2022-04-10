// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const WeifomVeezualizah = new Visualizer(
  'Veezualizah',
  (p5: P5, analyzer: Tone.Analyser) => {
    const values = analyzer.getValue()

    p5.background(0, 0, 0, 255);
    p5.noFill();
;
    p5.beginShape();
    p5.translate(500, 200);
    for (let i = 0; i < values.length * 2; i++) {
        let amp = values[i] as number;
        p5.ellipse(
            0 + amp * 0,
            80 + amp * 70,
            20 + amp * 0,
            130 + amp * 100
        );

        p5.strokeWeight(7);
        p5.stroke(p5.random(1,255), p5.random(20,255), 150, p5.map(0,0,100,255,0));
        p5.rotate(p5.PI / 5);
    }
    p5.pop();
    p5.endShape();
  },
);
