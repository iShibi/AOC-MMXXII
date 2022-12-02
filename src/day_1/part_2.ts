const inputFilePath = `${Deno.cwd()}/src/day_1/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const calories = inputText.split('\n\n');

const topThreeElves = [-1, -1, -1];
const topThreeTotalCalories = [-1, -1, -1];

for (const [elfNumber, elfCalories] of calories.entries()) {
	const currentElfTotalCalories = elfCalories.split('\n').reduce(
		(currentSum, currentValue) => Number.parseInt(currentValue) + currentSum,
		0,
	);
	if (currentElfTotalCalories > topThreeTotalCalories[0]) {
		// Push each elf one spot down to make space for current top elf
		topThreeTotalCalories[2] = topThreeTotalCalories[1];
		topThreeElves[2] = topThreeElves[1];
		topThreeTotalCalories[1] = topThreeTotalCalories[0];
		topThreeElves[1] = topThreeElves[0];
		topThreeTotalCalories[0] = currentElfTotalCalories;
		topThreeElves[0] = elfNumber + 1;
	} else if (currentElfTotalCalories > topThreeTotalCalories[1]) {
		// Push each elf one spot down except the top elf to make space for current second best elf
		topThreeTotalCalories[2] = topThreeTotalCalories[1];
		topThreeElves[2] = topThreeElves[1];
		topThreeTotalCalories[1] = currentElfTotalCalories;
		topThreeElves[1] = elfNumber + 1;
	} else if (currentElfTotalCalories > topThreeTotalCalories[2]) {
		// Replace the previous third best elf with current third best elf
		topThreeTotalCalories[2] = currentElfTotalCalories;
		topThreeElves[2] = elfNumber + 1;
	}
}

const topThreeElvesNumber = topThreeElves.join(', ');
const sumOfTopThreeTotalCalories = topThreeTotalCalories.reduce(
	(sum, currentValue) => sum + currentValue,
	0,
);

console.log(
	`Top three Elves carrying the most Calories: ${topThreeElvesNumber}\nTotal Calories the top three Elves are carrying : ${sumOfTopThreeTotalCalories}`,
);
