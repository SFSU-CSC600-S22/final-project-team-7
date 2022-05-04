// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List } from "immutable";
import React, { useEffect, useCallback } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";
import { useKeyboardNotes } from "../hooks/useKeyboardNotes";
import styles from "../styles/Hang.module.css";

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Hang.
 ** ------------------------------------------------------------------------ */

interface HangKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    degree: number; // to get the values
}

export function HangKey({
    note,
    synth,
    minor,
    // index,
    degree,
}: HangKeyProps): JSX.Element {
    return (
        <div
            onMouseDown={() => synth?.triggerAttackRelease(`${note}`, `8n`)} // Question: what is `onMouseDown`?
            className={classNames(
                "ba pointer absolute dim",
                {
                    "black bg-white": !minor, // major keys are white
                },
                styles.hangKey
            )}
            style={{
                transform: `rotate(${degree}deg) translate(140px) rotate(-${degree}deg)`,
            }}
        ></div>
    );
}

function Hang({ synth, setSynth }: InstrumentProps): JSX.Element {
    const octave = 4;
    const keys = List([
        { note: "C", degree: 0 },
        { note: "Db", degree: 30 },
        { note: "D", degree: 60 },
        { note: "Eb", degree: 90 },
        { note: "E", degree: 120 },
        { note: "F", degree: 150 },
        { note: "Gb", degree: 180 },
        { note: "G", degree: 210 },
        { note: "Ab", degree: 240 },
        { note: "A", degree: 270 },
        { note: "Bb", degree: 300 },
        { note: "B", degree: 330 },
    ]);

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth((oldSynth) => {
            oldSynth.disconnect();
            return new Tone.FMSynth({
                oscillator: { type: newType } as Tone.OmniOscillatorOptions,
                envelope: {
                    attack: 0.1,
                    decay: 1,
                    sustain: 0,
                    release: 1,
                },
            }).toDestination() as any;
        });
    };

    // order of keys are q,w,e,r,a,s,d,f,z,x,c,v
    const keyCodeLookUpTable: { [key: string]: string } = {
        q: (keys.get(0)?.note + octave.toString()) as string,
        w: (keys.get(1)?.note + octave.toString()) as string,
        e: (keys.get(2)?.note + octave.toString()) as string,
        r: (keys.get(3)?.note + octave.toString()) as string,
        a: (keys.get(4)?.note + octave.toString()) as string,
        s: (keys.get(5)?.note + octave.toString()) as string,
        d: (keys.get(6)?.note + octave.toString()) as string,
        f: (keys.get(7)?.note + octave.toString()) as string,
        z: (keys.get(8)?.note + octave.toString()) as string,
        x: (keys.get(9)?.note + octave.toString()) as string,
        c: (keys.get(10)?.note + octave.toString()) as string,
        v: (keys.get(11)?.note + octave.toString()) as string,
    };

    /*const keyStrokes = useCallback(
        (e) => {
            synth?.triggerAttack(keyCodeLookUpTable[e.keyCode]);
            synth?.triggerRelease("+0.5");
        },
        [synth]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyStrokes);
        return () => {
            document.removeEventListener("keydown", keyStrokes);
        };
    }, [keyStrokes]);*/

    useKeyboardNotes(keyCodeLookUpTable, synth);

    // init sound
    useEffect(() => {
        setOscillator("triangle5");
        return () => {};
    }, []);

    return (
        <div className="pv4">
            <div className={styles.ring}>
                {keys.map((key) => {
                    const note = `${key.note}${octave}`;
                    return (
                        <HangKey
                            key={note} //react key
                            note={note}
                            synth={synth}
                            octave={octave}
                            degree={key.degree}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export const HangInstrument = new Instrument("Hang", Hang);
