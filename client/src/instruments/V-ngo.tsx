// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List } from "immutable";
import React, { useEffect } from "react";
import lyrePic from "../img/lyre.png";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Lyre.
 ** ------------------------------------------------------------------------ */

interface LyreKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the Lyre key
}

export function LyreKey({
    note,
    synth,
    minor,
    index,
}: LyreKeyProps): JSX.Element {
    /**
     * This React component corresponds to either a major or minor key in the Lyre.
     * See `LyreKeyWithoutJSX` for the React component without JSX.
     */
    return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
            onMouseUp={() => synth?.triggerRelease("+0.25")} // Question: what is `onMouseUp`?
            className={classNames("ba pointer absolute dim", {
                "bg-black black h3": minor, // minor keys are black
                "black bg-white h4": !minor, // major keys are white
            })}
            style={{
                // CSS
                marginLeft: "21.05rem",
                top: 40,
                left: `${index * 1.17}rem`,
                width: "0.38rem",
                height: "13rem",
                color: "#1f1f1f",
                backgroundColor: "#1f1f1f",
            }}
        ></div>
    );
}

function Lyre({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: "C", idx: 0 },
        { note: "D", idx: 1 },
        { note: "E", idx: 2 },
        { note: "F", idx: 3 },
        { note: "G", idx: 4 },
        { note: "A", idx: 5 },
        { note: "B", idx: 6 },
    ]);

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth((oldSynth) => {
            oldSynth.disconnect();

      return new Tone.AMSynth({
          harmonicity: 2,
          // onsilence: true,
      }).toDestination() as any;
    });
  };

    useEffect(() => {
        setOscillator("sine");
        return () => {};
    }, []);

    return (
        <div className="pv4">
            <div className="relative dib h4 w-100 ml4">
                <img
                    src={lyrePic}
                    alt=""
                    style={{
                        marginLeft: "20rem",
                        marginTop: "-1rem",
                        width: "18rem",
                        height: "18rem",
                    }}
                />
                {keys.map((key) => {
                    const note = `${key.note}${5}`;
                    return (
                        <LyreKey
                            key={note} //react key
                            note={note}
                            synth={synth}
                            octave={8}
                            index={8 - 4.3 + key.idx}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export const LyreInstrument = new Instrument("Lyre", Lyre);
