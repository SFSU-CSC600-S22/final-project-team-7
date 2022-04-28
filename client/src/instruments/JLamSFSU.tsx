/******************************************************************************
 * Class: CSC 0600-01 Programming Paradigms and Languages Spring 2022
 * Team: Team 7
 * Name:  Justin Lam
 * 
 * File: JLamSFSU.tsx
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
import guitarImage from '../img/guitar.png';
import guitarCord from '../img/guitar_cord.png';

interface GuitarAcousticKeyProps {
    note: string; // E A D C G Eb Ab Db C7 G7 E7 A7 D7 F B7
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the piano key
}

/** 
 * 24 places for keys
 * Note = nodes to highlight
 * E = 9, 14, 18
 * A = 6, 10, 14
 * D = 2, 7, 10
 * C = 5, 14, 19
 * G = 3, 18, 23
 * Eb = 14, 18
 * Ab = 5, 10, 14
 * Db = 1, 7, 10
 * C7 = 5, 11, 14, 19
 * G7 = 1, 18, 23
 * E7 = 9, 18
 * A7 = 6, 14
 * D7 = 2, 5, 10
 * F = 1, 5, 10, 15
 * B7 = 2, 10, 13, 18
*/

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
  let nodes: number[] = [];
  switch(note) {
    case 'E4':
      nodes.push(9,14,18);
      break;
    case 'A4':
      nodes.push(6,10,14);
      break;
    case 'D4':
      nodes.push(2,7,10);
      break;
    case 'C4':
      nodes.push(5,14,19);
      break;
    case 'G4':
      nodes.push(3,18,23);
      break;
    case 'Eb4':
      nodes.push(14,18);
      break;
    case 'Ab4':
      nodes.push(5,10,14);
      break;
    case 'Db4':
      nodes.push(1,7,10);
      break;
    case 'C7':
      nodes.push(5,11,14,19);
      break;
    case 'G7':
      nodes.push(1,18,23);
      break;
    case 'E7':
      nodes.push(9,18);
      break;
    case 'A7':
      nodes.push(6,14);
      break;
    case 'D7':
      nodes.push(2,5,10);
      break;
    case 'F4':
      nodes.push(1,5,10,15);
      break;
    case 'B7':
      nodes.push(2,10,13,18);
      break;
    }

    function hoverNodeOn() {
      nodes.forEach(element => {
        let nodeID = document.getElementById('node'+element);
        if (nodeID) {
          nodeID.style.opacity = '100%';
        }
      });
    }
    function hoverNodeOff() {
      nodes.forEach(element => {
        let nodeID = document.getElementById('node'+element);
        if (nodeID) {
          nodeID.style.opacity = '0%';
        }
      });
    }

    return (
        <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)}
            onMouseUp={() => synth?.triggerRelease('+0.25')}
            onMouseEnter={() => hoverNodeOn()}
            onMouseLeave={() => hoverNodeOff()}
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
    {keys.map(key => {
          const isMinor = key.note.indexOf('b') !== -1;
          const note = (key.note.indexOf('7') === -1) ? `${key.note}${4}` : `${key.note}`;
          return (
            <GuitarAcousticNote
              key={note} //react key
              note={note}
              synth={synth}
              minor={isMinor}
              octave={4}
              index={key.idx}
            />
          );
        })}
      <div className='imageOverlay'>
        <img src={guitarCord} alt='guitar cords' height='150px' width='200px'></img>
        {Range(1,25).map(gridId => {
          const idValue = 'node' + gridId.toString();
          const topCoord = (Math.ceil(gridId/4)+3) * 10 + Math.floor(gridId/4);
          const leftCoord = 40 * ((gridId % 4) + 1);
          return (
          <div
            id={idValue}
            style={{
              opacity: '0%',
              position: 'absolute',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'yellow',
              top: `${topCoord}px`,
              left: `${leftCoord}px`,
            }}
            ></div>)
        })}
      </div>
      <img src={guitarImage} alt='guitar' height='230px' width='460px'></img>
    </div>
    </div>);
}

export const GuitarAcousticInstrument = new Instrument('GuitarAcoustic', GuitarAcoustic);