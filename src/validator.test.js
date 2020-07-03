import Validator from './validator';

let defaultCantusFirmus, defaultCounterpoint;
const cfLength = 10;

function checkValidity(index) {
    const validator = new Validator(defaultCantusFirmus, defaultCounterpoint);
    return validator.isValid(index);
}

beforeEach(() => {
    defaultCounterpoint = ['A4', 'B4', 'C#5', 'D5', 'E5', 'D5', 'B4', 'A4', 'C#5', 'D5'];
    defaultCantusFirmus = ['D4', 'G4', 'F#4', 'B4', 'A4', 'F#4', 'G4', 'F#4', 'E4', 'D4'];
})

test('valid counterpoint passes', () => {
    defaultCounterpoint.forEach((note, index) => {
        expect(checkValidity(index)).toBe(true);
    });
})

test('non-diatonic note is invalid', () => {
    defaultCounterpoint[cfLength - 2] = 'C5';
    expect(checkValidity(cfLength - 2)).toBe(false);
});

test('non-perfect consonance at start is invalid', () => {
    defaultCounterpoint[0] = 'F#4';
    expect(checkValidity(0)).toBe(false);
});

test('non-unison at end is invalid', () => {
    defaultCounterpoint[cfLength - 2] = 'G4';
    defaultCounterpoint[cfLength - 1] = 'A4';
    expect(checkValidity(cfLength - 1)).toBe(false);
});

test('non-contrary motion at end is invalid', () => {
    defaultCounterpoint[cfLength - 2] = 'E5';
    expect(checkValidity(cfLength - 1)).toBe(false);
})

test('non-stepwise motion at end is invalid', () => {
    defaultCounterpoint[cfLength - 2] = 'B4';
    expect(checkValidity(cfLength - 1)).toBe(false);
})