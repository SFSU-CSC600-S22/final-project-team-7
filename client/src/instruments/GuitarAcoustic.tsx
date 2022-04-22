/******************************************************************************
 * Class: CSC 0600-01 Programming Paradigms and Languages Spring 2022
 * Team: Team 7
 * Name:  Justin Lam
 * 
 * File: GuitarAcoustic.tsx
 * 
 * Description: Acoustic Guitar instrument.
 *****************************************************************************/

// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { useEffect } from 'react';
import guitarImage from '../img/guitar.png'

interface GuitarAcousticKeyProps {
    note: string; // E A D C G Eb Ab Db C7 G7 E7 A7 D7 F B7
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the piano key
}

/**
 * Establish prop object to be played
 * @param param0 
 * @returns 
 */
export function GuitarAcousticNote({
    note,
    synth,
    minor,
    index,
}: GuitarAcousticKeyProps): JSX.Element {
  const display = (note.indexOf('4') === -1) ? note : note.slice(0, note.length -1);
    return (
        <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)}
            onMouseUp={() => synth?.triggerRelease('+0.25')}
            className={classNames('ba pointer absolute dim black bg-white h4')}
            style={{
                top: 0,
                left: `${index * 2}rem`,
                zIndex: 1,
                width:'2rem',
                height: '1rem',
                marginLeft: '0.25rem',
            }}
        >{display}</div>
    );
}

// What is this for?
function GuitarAcousticKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: GuitarAcousticKeyProps): JSX.Element {
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim black bg-white h4'),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: 1,
        width:'2rem',
        height: '1rem',
        marginLeft: '0.25rem',
      },
    },
    []
  );
}


function GuitarAcousticType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1 gray b--light-gray')}
    >
      {title}
    </div>
  );
}

/**
 * The Guitar itself
 */
function GuitarAcoustic({ synth, setSynth }: InstrumentProps): JSX.Element {
  // Set keys/notes for the instruments
  const keys = List([
    { note: 'E', idx: 0 },
    { note: 'A', idx: 1 },
    { note: 'D', idx: 2 },
    { note: 'C', idx: 3 },
    { note: 'G', idx: 4 },
    { note: 'Eb', idx: 5 },
    { note: 'Ab', idx: 6 },
    { note: 'Db', idx: 7 },
    { note: 'C7', idx: 8 },
    { note: 'G7', idx: 9 },
    { note: 'E7', idx: 10 },
    { note: 'A7', idx: 11 },
    { note: 'D7', idx: 12 },
    { note: 'F', idx: 13 },
    { note: 'B7', idx: 14 },
  ]);

  /**
   * Change synth type to plucksynth
   */
  const setOscillator = () => {
    setSynth(oldSynth => {
      oldSynth.disconnect();
      return new Tone.PluckSynth({
        attackNoise: 4,
        release: 5,
        dampening: 6500,
        resonance: 0.9
      }).toDestination() as any;
    });};

    // set synth to plucksynth
    useEffect(() => {
      setOscillator();
      return () => {};
    }, []);

    // return object that makes up the guitar
    return (
    <div className="pv4">
    <div className="relative dib h4 w-100 ml4">
      {Range(4,5).map(octave =>
        keys.map(key => {
          const isMinor = key.note.indexOf('b') !== -1;
          const note = (key.note.indexOf('7') === -1) ? `${key.note}${octave}` : `${key.note}`;
          return (
            <GuitarAcousticNote
              key={note} //react key
              note={note}
              synth={synth}
              minor={isMinor}
              octave={octave}
              index={(octave - 4) * 7 + key.idx}
            />
          );
        }),
      )}
      
      <img src={guitarImage} alt='guitar' height='230px' width='460px'></img>
    </div>
    </div>);
}

export const GuitarAcousticInstrument = new Instrument('GuitarAcoustic', GuitarAcoustic);