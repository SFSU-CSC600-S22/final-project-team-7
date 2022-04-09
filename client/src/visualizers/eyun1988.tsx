// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const WaveformVisualizer1 = new Visualizer(
    "Eddy's Rasengan",
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255);
        p5.noFill();

        const values = analyzer.getValue();
        p5.beginShape();

        p5.rotateX(p5.frameCount * 0.6);
        p5.rotateY(p5.frameCount * 0.6);
        p5.rotateZ(p5.frameCount * 0.6);
        for (let j = 0; j < 1; j++) {
            p5.push();
            let sum: number = 0;
            for (let i = 0; i < values.length; i++) {
                sum = values[i] as number;
                sum += sum;
            }

            for (let i = 0; i < 25; i++) {
                p5.translate(
                    p5.sin(sum * 90 * 0.01 + j) * 100,
                    p5.sin(sum * 90 * 0.01 + j) * 100,
                    i * 0.01
                );
                p5.rotateZ(p5.frameCount * 0.002);
                p5.push();
                p5.fill(p5.color(0, 0, 0));
                p5.sphere(20, 10, 10);
                p5.pop();
            }
            p5.pop();
        }
        p5.endShape();
    }
);
