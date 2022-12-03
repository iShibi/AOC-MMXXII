const inputFilePath = `${Deno.cwd()}/src/day_3/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const rucksacks = inputText.split('\n');

const groupSize = 3;
const numberOfRucksacks = rucksacks.length;

const priorities = {
	'a': 1,
	'z': 26,
	'A': 27,
	'Z': 52,
};

let totalPriorities = 0;

for (let i = 0; i < numberOfRucksacks; i += groupSize) {
	const group = rucksacks.slice(i, i + groupSize);
	const commonItemsInFirstTwoRucksacks = group[0].split('').map((item) =>
		group[1].includes(item) ? item : undefined
	);
	const commonItem = commonItemsInFirstTwoRucksacks.find((item) =>
		item ? group[2].includes(item) : undefined
	);
	if (!commonItem) continue;
	const ascii = commonItem.charCodeAt(0);
	if (commonItem === commonItem.toLowerCase()) {
		// item is in a-z
		const offset = ascii - 97;
		totalPriorities += priorities.a + offset;
	} else {
		// item is in A-Z
		const offset = ascii - 65;
		totalPriorities += priorities.A + offset;
	}
}

console.log(totalPriorities);
