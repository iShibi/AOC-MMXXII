const inputFilePath = `${Deno.cwd()}/src/day_11/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const rawMonkiesData = inputText.split('\n\n');

type InspectionOperator = '+' | '-' | '*';
type InspectionOperand = `${number}` | 'old';

class Monkey {
	monkeyNumber: number;
	itemsInspectedCount = 0;
	itemsToInspect: Array<number> = [];
	inspectionOperator: InspectionOperator;
	inspectionOperand: InspectionOperand;
	testOperand: number;
	ifTrueMonkey: number;
	ifFalseMonkey: number;

	constructor(
		monkeyNumber: number,
		startingItems: Array<number>,
		inspectionOperator: InspectionOperator,
		inspectionOperand: InspectionOperand,
		testOperand: number,
		ifTrueMonkey: number,
		ifFalseMonkey: number,
	) {
		this.monkeyNumber = monkeyNumber;
		this.itemsToInspect = startingItems;
		this.inspectionOperator = inspectionOperator;
		this.inspectionOperand = inspectionOperand;
		this.testOperand = testOperand;
		this.ifTrueMonkey = ifTrueMonkey;
		this.ifFalseMonkey = ifFalseMonkey;
	}

	// this will be called by another monkey when it throws an item to this monkey
	addItem(item: number) {
		this.itemsToInspect.push(item);
	}

	inspect() {
		for (const item of this.itemsToInspect) {
			let worryLevel: number = eval(
				`${item}${this.inspectionOperator}${
					this.inspectionOperand === 'old' ? item : this.inspectionOperand
				}`,
			);

			const testOperandsProduct = monkies.reduce(
				(acc, monkey) => monkey.testOperand * acc,
				1,
			);
			worryLevel = worryLevel % testOperandsProduct;

			if (worryLevel % this.testOperand === 0) {
				monkies[this.ifTrueMonkey].addItem(worryLevel);
			} else {
				monkies[this.ifFalseMonkey].addItem(worryLevel);
			}
			this.itemsInspectedCount++;
		}
		this.itemsToInspect = [];
	}
}

const monkies: Array<Monkey> = [];

for (const rawMonkeyData of rawMonkiesData) {
	let monkeyNumber: number;
	let items: Array<number>;
	let inspectionOperator: InspectionOperator;
	let inspectionOperand: InspectionOperand;
	let testOperand: number;
	let ifTrueMonkey: number;
	let ifFalseMonkey: number;

	const lines = rawMonkeyData.split('\n');

	for (const [index, line] of lines.entries()) {
		switch (index) {
			case 0:
				monkeyNumber = Number.parseInt(line.slice(-2, -1));
				break;

			case 1:
				items = line.substring('Starting items: '.length + 2).split(', ').map(
					(n) => Number.parseInt(n),
				);
				break;

			case 2:
				[inspectionOperator, inspectionOperand] = line.substring(
					'Operation: new = old '.length + 2,
				).split(' ') as [InspectionOperator, InspectionOperand];
				break;

			case 3:
				testOperand = Number.parseInt(line.split(' ').at(-1)!);
				break;

			case 4:
				ifTrueMonkey = Number.parseInt(line.split(' ').at(-1)!);
				break;

			case 5:
				ifFalseMonkey = Number.parseInt(line.split(' ').at(-1)!);
				break;

			default:
				break;
		}
	}

	monkies.push(
		new Monkey(
			monkeyNumber!,
			items!,
			inspectionOperator!,
			inspectionOperand!,
			testOperand!,
			ifTrueMonkey!,
			ifFalseMonkey!,
		),
	);
}

for (let i = 1; i <= 10000; i++) {
	for (const monkey of monkies) {
		monkey.inspect();
	}
}

monkies.sort((a, b) => b.itemsInspectedCount - a.itemsInspectedCount);

console.log(monkies[0].itemsInspectedCount * monkies[1].itemsInspectedCount);
