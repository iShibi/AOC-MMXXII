const inputFilePath = `${Deno.cwd()}/src/day_10/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const instructions = inputText.split('\n').slice(0, -1);

const crtScreen = [[], [], [], [], [], []] as Array<Array<string>>;
let row: number;
let X = 1;
let cycle = 1;
let operationCycle = 1;
let indexOfInstructionToFetch = 0;

type Operator = 'addx' | 'noop';

while (cycle <= 240) {
	if (cycle >= 1 && cycle <= 40) {
		row = 1;
	} else if (cycle >= 41 && cycle <= 80) {
		row = 2;
	} else if (cycle >= 81 && cycle <= 120) {
		row = 3;
	} else if (cycle >= 121 && cycle <= 160) {
		row = 4;
	} else if (cycle >= 161 && cycle <= 200) {
		row = 5;
	} else {
		row = 6;
	}
	// convert cycle count to pixel position between [0, 39]
	if ([X - 1, X, X + 1].includes(cycle % 40 === 0 ? 39 : (cycle % 40) - 1)) {
		crtScreen[row - 1].push('#');
	} else {
		crtScreen[row - 1].push('.');
	}
	const instruction = instructions[indexOfInstructionToFetch];
	const [op, n] = instruction.split(' ') as [Operator, string | undefined];
	if (op === 'noop') {
		indexOfInstructionToFetch++;
	} else {
		if (operationCycle === 1) {
			operationCycle++;
		} else {
			indexOfInstructionToFetch++;
			operationCycle = 1;
			X += Number.parseInt(n!);
		}
	}
	cycle++;
}

const image = crtScreen.map((row) => row.join(''));
console.log(image);
