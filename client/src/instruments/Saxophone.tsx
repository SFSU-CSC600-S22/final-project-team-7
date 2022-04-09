/******************************************************************************
 * Class: CSC 0600-01 Programming Paradigms and Languages Spring 2022
 * Team: Team 7
 * Name:  Justin Lam
 * 
 * File: Saxophone.tsx
 * 
 * Description: Saxophone instrument.
 *****************************************************************************/

// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

// 
function Saxophone({ synth, setSynth }: InstrumentProps): JSX.Element {
    return <div className="pv4"></div>;
}

export const SaxophoneInstrument = new Instrument('Saxophone', Saxophone);