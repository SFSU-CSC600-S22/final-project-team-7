// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List } from "immutable";
import React, { useEffect, useCallback } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

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
            className={classNames("ba pointer absolute dim", {
                "black bg-white h4": !minor, // major keys are white
            })}
            style={{
                height: `50px`,
                width: `50px`,
                position: `absolute`,
                transform: `rotate(${degree}deg) translate(140px) rotate(-${degree}deg)`,
                borderRadius: `100%`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                marginTop: `200px`,
                marginLeft: `200px`,
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
        "81": (keys.get(0)?.note + octave.toString()) as string,
        "87": (keys.get(1)?.note + octave.toString()) as string,
        "69": (keys.get(2)?.note + octave.toString()) as string,
        "82": (keys.get(3)?.note + octave.toString()) as string,
        "65": (keys.get(4)?.note + octave.toString()) as string,
        "83": (keys.get(5)?.note + octave.toString()) as string,
        "68": (keys.get(6)?.note + octave.toString()) as string,
        "70": (keys.get(7)?.note + octave.toString()) as string,
        "90": (keys.get(8)?.note + octave.toString()) as string,
        "88": (keys.get(9)?.note + octave.toString()) as string,
        "67": (keys.get(10)?.note + octave.toString()) as string,
        "86": (keys.get(11)?.note + octave.toString()) as string,
    };

    const keyStrokes = useCallback(
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
    }, [keyStrokes]);

    // init sound
    useEffect(() => {
        setOscillator("triangle5");
        return () => {};
    }, []);

    return (
        <div className="pv4">
            <div
                className=""
                style={{
                    height: `452px`,
                    width: `445px`,
                    borderRadius: `51%`,
                    border: `1px solid black`,
                    position: `relative`,
                    marginLeft: `100px`,
                }}
            >
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
