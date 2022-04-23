import * as Tone from "tone";
import { useEffect, useRef, useState } from "react";

/*{
    key: note
}*/

interface IKeyNotes {
    [key: string]: string;
}


const useKeyboardNotes = (keyNotes: IKeyNotes, synth: Tone.Synth<Tone.SynthOptions>):
    [currentKeyNotes: IKeyNotes, setKeyNotes: React.Dispatch<React.SetStateAction<IKeyNotes>>] => {

    const [currentKeyNotes, setKeyNotes] = useState<IKeyNotes>(keyNotes);
    //const activeKeys = useRef<string[]>([]);
    useEffect(() => {
        const playNote = (e: KeyboardEvent) => {
            //TODO: If we want notes held, we need to implement this
            /*
            const found = activeKeys.current.findIndex(item => item === e.key);            
            if (found != -1) {
                //return;
            }     
            activeKeys.current = [...activeKeys.current, e.key]
            */
            synth?.triggerAttackRelease(currentKeyNotes[e.key],"4n");
        }

        const endNote = (e: KeyboardEvent) => {
            // TODO: If notes are held, add release logic here
            //activeKeys.current = activeKeys.current.filter(item => item !== e.key);
        }
        document.addEventListener('keydown', playNote);
        document.addEventListener('keyup', endNote);
        return () => {
            document.removeEventListener("keydown", playNote);
            document.removeEventListener('keyup', endNote);
        }

    }, [synth])

    return [currentKeyNotes, setKeyNotes];
}

export { useKeyboardNotes };