const inputFilePath = `${Deno.cwd()}/src/day_5/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const lines = inputText.split('\n');

const stacks: Record<number, Array<string>> = {
	1: ['J', 'Z', 'G', 'V', 'T', 'D', 'B', 'N'],
	2: ['F', 'P', 'W', 'D', 'M', 'R', 'S'],
	3: ['Z', 'S', 'R', 'C', 'V'],
	4: ['G', 'H', 'P', 'Z', 'J', 'T', 'R'],
	5: ['F', 'Q', 'Z', 'D', 'N', 'J', 'C', 'T'],
	6: ['M', 'F', 'S', 'G', 'W', 'P', 'V', 'N'],
	7: ['Q', 'P', 'B', 'V', 'C', 'G'],
	8: ['N', 'P', 'B', 'Z'],
	9: ['J', 'P', 'W'],
};

const instructions = lines.slice(10, -1);

for (const instruction of instructions) {
	const [numOfCratesToMove, from, to] = instruction.split(' ').map((
		word,
	) => Number.parseInt(word)).filter(
		(word) => !Number.isNaN(word),
	);
	const cratesToMove = stacks[from].splice(
		0,
		numOfCratesToMove,
	);
	stacks[to].unshift(...cratesToMove.reverse());
}

let cratesOnTop = '';

Object.values(stacks).forEach((stack) => cratesOnTop += stack[0]);

console.log(cratesOnTop);
