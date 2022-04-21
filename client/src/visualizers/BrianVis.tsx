import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from "../Visualizers";

const BrianVis = new Visualizer(
    'Retro',
    (p5: P5, analyzer: Tone.Analyser) => {
        if (!(window as any).brianLeftOffset || !(window as any).brianVisThrottle) {
            (window as any).brianLeftOffset = 16 * parseFloat(getComputedStyle(document.documentElement).fontSize);
            (window as any).brianVisThrottle = [];
            (window as any).brianVisTCount = 0;
            for (let i = 0; i < 22; i++) {
                (window as any).brianVisThrottle.push(0)
            }
        }

        const frameThrottle = 3;
        const addThrottle = 1.2;
        const subtractThrottle = .7;

        const width = window.innerWidth - (window as any).brianLeftOffset;
        const height = window.innerHeight / 2;

        const widthSquareCount = 22;
        const heightSquareCount = 20;
        const squareHeight = height / heightSquareCount;
        const squareWidth = width / widthSquareCount;

        let bottomOffset = 4;
        let topOffset = 4;

        (window as any).brianVisTCount >= frameThrottle && (window as any).brianVisThrottle.forEach((currentThrottle: number, index: number) => {
            const value = analyzer.getValue();
            if (value.length > index) {
                let currentAmp = Math.abs(p5.map(value[index] as number, 0, .23, 0, heightSquareCount));
                if (currentThrottle >= currentAmp) {
                    (window as any).brianVisThrottle[index] = Math.max(currentThrottle - subtractThrottle, currentThrottle - currentAmp === 0 ? .3 : currentAmp);
                } else {
                    (window as any).brianVisThrottle[index] = Math.min(currentThrottle + addThrottle, currentThrottle + currentAmp);
                }
            }
            (window as any).brianVisTCount = 0;
        })


        p5.background(30, 30, 30, 255);

        for (let i = 0; i < widthSquareCount; i++) {
            const currentThrottle = (window as any).brianVisThrottle[i];
            for (let j = heightSquareCount - topOffset; j >= bottomOffset; j--) {
                let invertJ = Math.abs(j - heightSquareCount);
                if (invertJ < currentThrottle) {
                    if (currentThrottle > heightSquareCount - topOffset - 2 && invertJ > heightSquareCount - topOffset - 2) {
                        p5.fill(140, 33, 0);
                    } else {
                        p5.fill(11, 140, 0);
                    }
                } else {
                    p5.fill(5, 64, 0);
                }
                p5.rect(i * squareWidth, j * squareHeight, squareWidth, squareHeight, 5);
            }
        }

        (window as any).brianVisTCount++;
    }
);

export { BrianVis }