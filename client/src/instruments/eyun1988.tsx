// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React from "react";

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
    index: number; // octave + index together give a location for the piano key
    degree: number; // to get the values
}

export function HangKey({
    note,
    synth,
    minor,
    index,
    degree,
}: HangKeyProps): JSX.Element {
    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `PianoKeyWithoutJSX` for the React component without JSX.
     */

    return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
            onMouseDown={() => synth?.triggerAttackRelease(`${note}`, `8n`)} // Question: what is `onMouseDown`?
            // onMouseUp={() => synth?.triggerRelease("+0.25")} // Question: what is `onMouseUp`?
            className={classNames("ba pointer absolute dim", {
                // "bg-black black h3": minor, // minor keys are black
                "black bg-white h4": !minor, // major keys are white
            })}
            style={{
                // CSS
                // top: 0,
                // left: `${index * 2}rem`,
                // zIndex: minor ? 1 : 0,
                // width: minor ? "1.5rem" : "2rem",
                // marginLeft: minor ? "0.25rem" : 0,
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

// function PianoType({ title, onClick, active }: any): JSX.Element {
//     return (
//         <div
//             onClick={onClick}
//             className={classNames("dim pointer ph2 pv1 ba mr2 br1 fw7 bw1", {
//                 "b--black black": active,
//                 "gray b--light-gray": !active,
//             })}
//         >
//             {title}
//         </div>
//     );
// }

function Hang({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: "C", idx: 0, degree: 0 },
        { note: "Db", idx: 0.5, degree: 30 },
        { note: "D", idx: 1, degree: 60 },
        { note: "Eb", idx: 1.5, degree: 90 },
        { note: "E", idx: 2, degree: 120 },
        { note: "F", idx: 3, degree: 150 },
        { note: "Gb", idx: 3.5, degree: 180 },
        { note: "G", idx: 4, degree: 210 },
        { note: "Ab", idx: 4.5, degree: 240 },
        { note: "A", idx: 5, degree: 270 },
        { note: "Bb", idx: 5.5, degree: 300 },
        { note: "B", idx: 6, degree: 330 },
    ]);

    // const setOscillator = (newType: Tone.ToneOscillatorType) => {
    //     setSynth((oldSynth) => {
    //         oldSynth.disconnect();

    //         return new Tone.Synth({
    //             oscillator: { type: newType } as Tone.OmniOscillatorOptions,
    //         }).toDestination();
    //     });
    // };

    // const oscillators: List<OscillatorType> = List([
    //     "sine",
    //     "sawtooth",
    //     "square",
    //     "triangle",
    //     "fmsine",
    //     "fmsawtooth",
    //     "fmtriangle",
    //     "amsine",
    //     "amsawtooth",
    //     "amtriangle",
    // ]) as List<OscillatorType>;

    return (
        <div className="pv4">
            <div className="relative dib h4 w-100 ml4">
                {Range(2, 7).map((octave) =>
                    keys.map((key) => {
                        const isMinor = key.note.indexOf("b") !== -1;
                        const note = `${key.note}${octave}`;
                        return (
                            <HangKey
                                key={note} //react key
                                note={note}
                                synth={synth}
                                minor={isMinor}
                                octave={octave}
                                index={(octave - 2) * 7 + key.idx}
                                degree={key.degree}
                            />
                        );
                    })
                )}
            </div>
            {/* <div className={"pl4 pt4 flex"}>
                {oscillators.map((o) => (
                    <PianoType
                        key={o}
                        title={o}
                        onClick={() => setOscillator(o)}
                        active={synth?.oscillator.type === o}
                    />
                ))}
            </div> */}
        </div>
    );
}

export const HangInstrument = new Instrument("Hang", Hang);
