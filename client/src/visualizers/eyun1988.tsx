// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const Rasengan = new Visualizer(
    "Eddy's Rasengan",
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);
        p5.background(0, 0, 0, 255);
        p5.strokeWeight(dim * 0.01);
        p5.noFill();
        const values = analyzer.getValue(); // amplitude

        p5.beginShape();
        p5.rotateX(p5.frameCount * 0.1 * 100);
        p5.rotateY(p5.frameCount * 0.1 * 100);
        p5.rotateZ(p5.frameCount * 0.1 * 100);
        for (let j = 0; j < 1; j++) {
            p5.push();
            let sum: number = 0;
            for (let i = 0; i < values.length; i++) {
                sum = values[i] as number;
                sum += sum;
            }

            const frequencyOfSummedAmplitude = 1 / sum;

            for (let i = 0; i < 15; i++) {
                p5.translate(
                    p5.sin(sum * 0.2 + j) * 100 * frequencyOfSummedAmplitude
                        ? frequencyOfSummedAmplitude
                        : 1,
                    p5.sin(sum * 0.2 + j) * 100,
                    i * 0.01 + sum
                );
                let r = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 200);
                let g = p5.map(i, 0, 50, 100, 200);
                let b = p5.map(p5.cos(p5.frameCount), -1, 1, 200, 100);
                p5.stroke(r, g, b);

                p5.rotateX(p5.frameCount * 0.1 * 100);
                p5.rotateY(p5.frameCount * 0.1 * 100);
                p5.rotateZ(p5.frameCount * 0.1 * 100);
                p5.push();
                p5.fill(p5.color(0, 0, 0));
                p5.scale(1 + p5.abs(sum) * 5);
                p5.sphere(40, 10, 10);
                p5.pop();
            }
        }
        p5.endShape();
    }
);
