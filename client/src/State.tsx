// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/JLamSFSU';
import { WaveformVisualizer } from './visualizers/Waveform';
import { WeifomVeezualizah } from './visualizers/V-ngo';
import { LyreInstrument } from './instruments/V-ngo';
import { HangInstrument } from "./instruments/eyun1988";
import { RecorderInstrument } from "./instruments/Recorder";
import { Rasengan } from "./visualizers/eyun1988";
import { BrianVis } from "./visualizers/BrianVis";
import { RainVisualizer } from './visualizers/JLamSFSU'


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>; // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, HangInstrument, LyreInstrument, GuitarInstrument, RecorderInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, Rasengan, WeifomVeezualizah, BrianVis, RainVisualizer]);    // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
    instruments: instruments,
    visualizers: visualizers,
});
