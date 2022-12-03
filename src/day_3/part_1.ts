const inputFilePath = `${Deno.cwd()}/src/day_3/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const rucksacks = inputText.split('\n');

const priorities = {
	'a': 1,
	'z': 26,
	'A': 27,
	'Z': 52,
};

let totalPriorities = 0;

for (const rucksack of rucksacks) {
	const numberOfItems = rucksack.length;
	const midPoint = numberOfItems / 2;
	const firstCompartment = rucksack.slice(0, midPoint);
	const secondCompartment = rucksack.slice(midPoint);
	const duplicateItem = firstCompartment.split('').find((item) =>
		secondCompartment.includes(item)
	);
	if (!duplicateItem) continue;
	const ascii = duplicateItem.charCodeAt(0);
	if (duplicateItem === duplicateItem.toLowerCase()) {
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
