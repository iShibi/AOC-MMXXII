const inputFilePath = `${Deno.cwd()}/src/day_1/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const calories = inputText.split('\n\n');

let maxCalories = -1;
let maxCaloriesElfNumber = -1;

for (const [elfNumber, elfCalories] of calories.entries()) {
	const currentElfTotalCalories = elfCalories.split('\n').reduce(
		(currentSum, currentValue) => Number.parseInt(currentValue) + currentSum,
		0,
	);
	if (currentElfTotalCalories > maxCalories) {
		maxCalories = currentElfTotalCalories;
		maxCaloriesElfNumber = elfNumber + 1;
	}
}

console.log(
	`Elf carrying the most Calories: ${maxCaloriesElfNumber}\nTotal Calories the Elf is carrying : ${maxCalories}`,
);
