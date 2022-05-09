import { Instrument, InstrumentProps } from "../Instruments";
import * as Tone from "tone";

import styles from "../styles/Recorder.module.css";
import { useEffect } from "react";
import { useKeyboardNotes } from "../hooks/useKeyboardNotes";

const Recorder = ({ synth, setSynth }: InstrumentProps): JSX.Element => {
    const notes = ["B", "A", "G", "F", "E", "D", "C"];
    const keyCodeLookUpTable: { [key: string]: string } = {
        "q": "B5",
        "w": "A5",
        "e": "G5",
        "r": "F5",
        "t": "E5",
        "y": "D5",
        "u": "C5",
    };

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
            oldSynth.disconnect();
            return new Tone.MonoSynth({
                oscillator: { type: newType } as Tone.OmniOscillatorOptions,
            }).toDestination() as any;
        });
    };

    useEffect(() => {
        setOscillator("triangle");
        // eslint-disable-next-line
    }, []);

    useKeyboardNotes(keyCodeLookUpTable, synth);

    return (
        <div className={styles.wrapper}
            onMouseDown={(e) => {
                const target = (e.target as HTMLElement);
                if (target.id) {
                    const note = parseInt(target.id);
                    if(note < 0 || note > 7 ){
                        return;
                    }
                    synth?.triggerAttack(`${notes[note]}5`);
                }
            }}

            onMouseUp={(e) => {
                const target = (e.target as HTMLElement);
                if (target.id) {
                    synth?.triggerRelease(`+0.2`);
                }
            }}>
            <img src="/recorder.png" alt="recorder" />
            <div className={`${styles.hole} ${styles.one}`} id="0"></div>
            <div className={`${styles.hole} ${styles.two}`} id="1"></div>
            <div className={`${styles.hole} ${styles.three}`} id="2"></div>
            <div className={`${styles.hole} ${styles.four}`} id="3"></div>
            <div className={`${styles.hole} ${styles.five}`} id="4"></div>
            <div className={`${styles.hole} ${styles.six}`} id="5"></div>
            <div className={`${styles.hole} ${styles.seven}`} id="6"></div>
        </div>
    )
}

export const RecorderInstrument = new Instrument("Recorder", Recorder);