import { Note } from '@tonaljs/tonal';

const harmonicConsonances = [
    '1P', '3m', '3M', '5P', '6m', '6M', '8P'
]

function randomInterval() {
    const index = Math.floor(Math.random() * harmonicConsonances.length);
    return harmonicConsonances[index];
}

export default class CounterpointGenerator {
    generate(cantusFirmus) {
        const counterpoint = [];
        cantusFirmus.forEach(note => {
            const counterpointNote = Note.transpose(note, randomInterval());
            counterpoint.push(counterpointNote);
        })
        return counterpoint;
    }
}
