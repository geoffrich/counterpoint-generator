import Generator from '../src/generator.js';

const cantusFirmus = ['C#4', 'B3', 'A3', 'G#3', 'F#3'];
const generator = new Generator();
const counterpoint = generator.generate(cantusFirmus);
const staffWidth = cantusFirmus.length * 100;

const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element 
var div = document.getElementById('vex-container')
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
var context = renderer.getContext();
context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

// Create a stave at position 10, 40 on the canvas.
var stave = new VF.Stave(10, 40, staffWidth);

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
var formatter = new VF.Formatter().joinVoices(voices).format(voices, staffWidth);

// Render voice
voices.forEach(voice => voice.draw(context, stave));

function makeVFNote(noteString, stemDirection = Vex.Flow.StaveNote.STEM_UP) {
    const noteName = noteString.slice(0, noteString.length - 1);
    const noteOctave = noteString[noteString.length - 1];
    return new VF.StaveNote({
        keys: [`${noteName}/${noteOctave}`],
        duration: 'q',
        clef: 'treble',
        stem_direction: stemDirection
    });
}