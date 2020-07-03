import { CounterpointGenerator } from '../dist/bundle.js';

const cantusFirmus = ['C4', 'D4', 'E4', 'F4', 'G4', 'D4', 'F4', 'E4', 'D4', 'C4'];
const generator = new CounterpointGenerator();
const counterpoint = generator.generate(cantusFirmus);
const staffWidth = cantusFirmus.length * 100;

const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element 
const div = document.getElementById('vex-container')
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(staffWidth + 100, 500);
const context = renderer.getContext();
context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

// Create a stave at position 10, 40 on the canvas.
const stave = new VF.Stave(10, 40, staffWidth + 100);

// Add a clef 
stave.addClef('treble');

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

const voices = [
    new VF.Voice({ num_beats: cantusFirmus.length, beat_value: 4 })
        .addTickables(cantusFirmus.map(note => makeVFNote(note, Vex.Flow.StaveNote.STEM_DOWN))),
    new VF.Voice({ num_beats: cantusFirmus.length, beat_value: 4 })
        .addTickables(counterpoint.map(note => makeVFNote(note, Vex.Flow.StaveNote.STEM_UP))),
];

// Format and justify the notes 
const formatter = new VF.Formatter().joinVoices(voices).format(voices, staffWidth);

// Render voice
voices.forEach(voice => voice.draw(context, stave));

function makeVFNote(noteString, stemDirection = Vex.Flow.StaveNote.STEM_UP) {
    const noteName = noteString[0];
    const noteOctave = noteString[noteString.length - 1];
    const note = new VF.StaveNote({
        keys: [`${noteName}/${noteOctave}`],
        duration: 'q',
        clef: 'treble',
        stem_direction: stemDirection
    });
    if (noteString.length > 2) {
        return note.addAccidental(
            0,
            new VF.Accidental(noteString.slice(1, noteString.length - 1))
        );
    }
    return note;
}