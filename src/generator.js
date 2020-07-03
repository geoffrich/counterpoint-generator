import * as Note from '@tonaljs/note';
import Validator from './validator';

const harmonicConsonances = [
    '1P', '3m', '3M', '5P', '6m', '6M', '8P'
]

export default class CounterpointGenerator {
    generate(cantusFirmus) {
        const counterpoint = [];
        const validator = new Validator(cantusFirmus, counterpoint);

        if (generateRecursive(0)) {
            return counterpoint;
        }
        return [];

        function generateRecursive(index) {
            if (index >= cantusFirmus.length) {
                return true;
            }

            for (let i = 0; i < harmonicConsonances.length; i++) {
                const interval = harmonicConsonances[i];
                counterpoint[index] = Note.transpose(cantusFirmus[index], interval);
                if (validator.isValid(index)) {
                    if (generateRecursive(index + 1)) {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
