const inputFilePath = `${Deno.cwd()}/src/day_8/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const grid = inputText.split('\n').slice(0, -1).map((row) =>
	row.split('').map((tree) => Number.parseInt(tree))
);

const isVisible = new Map<string, boolean>(); // <'x|y', boolean>

for (const [x, row] of grid.entries()) {
	let [left, right] = [1, row.length - 2];
	let leftMax = row[left - 1];
	let rightMax = row[right + 1];
	isVisible.set(`${x}|${left - 1}`, true);
	isVisible.set(`${x}|${right + 1}`, true);
	while (left < row.length && right >= 0) {
		if (row[left] > leftMax) {
			isVisible.set(`${x}|${left}`, true);
			leftMax = row[left];
		}
		if (row[right] > rightMax) {
			isVisible.set(`${x}|${right}`, true);
			rightMax = row[right];
		}
		left++;
		right--;
	}
}

for (let y = 0; y < grid[0].length; y++) {
	let [top, bottom] = [1, grid.length - 2];
	let topMax = grid[0][y];
	let bottomMax = grid[grid.length - 1][y];
	isVisible.set(`${top - 1}|${y}`, true);
	isVisible.set(`${bottom + 1}|${y}`, true);
	while (top < grid.length && bottom >= 0) {
		if (grid[top][y] > topMax) {
			isVisible.set(`${top}|${y}`, true);
			topMax = grid[top][y];
		}
		if (grid[bottom][y] > bottomMax) {
			bottomMax = grid[bottom][y];
			isVisible.set(`${bottom}|${y}`, true);
		}
		top++;
		bottom--;
	}
}

console.log(isVisible.size);
