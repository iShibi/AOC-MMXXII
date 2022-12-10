const inputFilePath = `${Deno.cwd()}/src/day_10/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const instructions = inputText.split('\n').slice(0, -1);

let X = 1;
let cycle = 1;
let operationCycle = 1;
let indexOfInstructionToFetch = 0;
let totalInterestingSignalStrength = 0;
const interestingCycles = [20, 60, 100, 140, 180, 220];

type Operator = 'addx' | 'noop';

while (cycle <= 220) {
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
	if (interestingCycles.includes(cycle)) {
		totalInterestingSignalStrength += cycle * X;
	}
}

console.log(totalInterestingSignalStrength);
