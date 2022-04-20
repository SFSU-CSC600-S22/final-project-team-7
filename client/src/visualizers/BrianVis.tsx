import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from "../Visualizers";

const BrianVis = new Visualizer(
    'Retro',
    (p5: P5, analyzer: Tone.Analyser) => {
        if (!(window as any).brianLeftOffset) {
            (window as any).brianLeftOffset = 16 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }

        const width = window.innerWidth - (window as any).brianLeftOffset;
        const height = window.innerHeight / 2;

        const widthSquareCount = 22;
        const heightSquareCount = 20;
        const squareHeight = height / heightSquareCount;
        const squareWidth = width / widthSquareCount;

        let bottomOffset = 4;
        let topOffset = 4;
        
        const value = analyzer.getValue();

        p5.background(30, 30, 30, 255);

        for (let i = 0; i < widthSquareCount; i++) {
            const ampVal = Math.abs(p5.map(value[i] as number, 0, .23, 0, heightSquareCount));
            for (let j = heightSquareCount - topOffset; j >= bottomOffset; j--) {
                let invertJ = Math.abs(j - heightSquareCount);
                if (invertJ < ampVal) {
                    if(ampVal > heightSquareCount - topOffset - 1 && invertJ > heightSquareCount - topOffset - 1){
                        p5.fill(140, 33, 0);
                    }else{
                        p5.fill(11, 140, 0);
                    }
                } else {
                    p5.fill(5, 64, 0);
                }
                p5.rect(i * squareWidth, j * squareHeight, squareWidth, squareHeight, 5);
            }
        }
    }
);

export { BrianVis }