import { Note, Interval, Key, PcSet } from '@tonaljs/tonal';

const perfectConsonances = [
    '1P', '5P', '8P'
];

export default class Validator {
    constructor(cantusFirmus, counterpoint) {
        this.cantusFirmus = cantusFirmus;
        this.counterpoint = counterpoint;
        this.key = Key.majorKey(cantusFirmus[0]);
    }

    isValid(index) {
        const cfNote = this.cantusFirmus[index];
        const cpNote = this.counterpoint[index];
        const interval = Interval.distance(cfNote, cpNote);
        if (index === 0) {
            // First interval should be P1, P5, or P8
            if (!perfectConsonances.includes(interval)) {
                return false;
            }
        }

        if (!this.isDiatonic(index)) {
            return false;
        }


        if (index === this.cantusFirmus.length - 1) {
            // Final note must be P1 or P8
            if (Note.pitchClass(cfNote) !== Note.pitchClass(cpNote)) {
                return false;
            }
            if (!this.isContraryMotion(index) || !this.isStepwiseMotion(index)) {
                return false;
            }
        }
        return true;
    }

    isStepwiseMotion(index) {
        const currentCpNote = this.counterpoint[index];
        const lastCpNote = this.counterpoint[index - 1];
        const interval = Interval.distance(currentCpNote, lastCpNote);
        return Math.abs(Interval.num(interval)) === 2;
    }

    isContraryMotion(index) {
        const currentCfNote = Note.get(this.cantusFirmus[index]);
        const currentCpNote = Note.get(this.counterpoint[index]);
        const lastCfNote = Note.get(this.cantusFirmus[index - 1]);
        const lastCpNote = Note.get(this.counterpoint[index - 1]);

        const cfDirection = Note.ascending(currentCfNote, lastCfNote);
        const cpDirection = Note.ascending(currentCpNote, lastCpNote);

        return (cfDirection > 0 && cpDirection < 0)
            || (cfDirection < 0 && cpDirection > 0);
    }

    isDiatonic(index) {
        const { scale } = this.key;
        return PcSet.isNoteIncludedIn(scale)(this.counterpoint[index]);
    }
}