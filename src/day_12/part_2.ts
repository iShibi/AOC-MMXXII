const inputFilePath = `${Deno.cwd()}/src/day_12/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);

const grid = inputText.split('\n').slice(0, -1).map((row) => row.split(''));
const gridLen = grid.length;
const rowLen = grid[0].length;
// Direction vectors: North, South, East, West
const dirVecRow = [1, -1, 0, 0];
const dirVecCol = [0, 0, 1, -1];
const startingPositions: Array<[number, number]> = []; // [[row, col], ...]

for (let row = 0; row < gridLen; row++) {
	for (let col = 0; col < rowLen; col++) {
		if (['a', 'S'].includes(grid[row][col])) {
			startingPositions.push([row, col]);
		}
	}
}

function isBlocked(
	currentRow: number,
	currentCol: number,
	newRow: number,
	newCol: number,
): boolean {
	const currentChar = grid[currentRow][currentCol] === 'S'
		? 'a'
		: grid[currentRow][currentCol];
	const newChar = grid[newRow][newCol] === 'E' ? 'z' : grid[newRow][newCol];
	if (currentChar.charCodeAt(0) + 1 >= newChar.charCodeAt(0)) return false;
	return true;
}

function findNumberOfSteps(startRow: number, startCol: number) {
	const distances: Array<Array<number>> = Array.from(
		Array(gridLen),
		() => Array(rowLen).fill(0),
	);
	const visited: Array<Array<boolean>> = Array.from(
		Array(gridLen),
		() => Array(rowLen).fill(false),
	);
	const Q: Array<[number, number]> = []; // [[row, col], ...]
	Q.push([startRow, startCol]);
	visited[startRow][startCol] = true;
	while (Q.length !== 0) {
		const [currentRow, currentCol] = Q.shift()!;
		for (let i = 0; i < 4; i++) {
			const newRow = currentRow + dirVecRow[i];
			const newCol = currentCol + dirVecCol[i];
			if (newRow < 0 || newRow >= gridLen || newCol < 0 || newCol >= rowLen) {
				continue;
			}
			if (visited[newRow][newCol]) continue;
			if (isBlocked(currentRow, currentCol, newRow, newCol)) continue;
			if (grid[newRow][newCol] === 'E') {
				return distances[currentRow][currentCol] + 1;
			}
			Q.push([newRow, newCol]);
			visited[newRow][newCol] = true;
			distances[newRow][newCol] = distances[currentRow][currentCol] + 1;
		}
	}
}

let minSteps = Number.MAX_VALUE;

for (const [row, col] of startingPositions) {
	const stepCount = findNumberOfSteps(row, col);
	if (typeof stepCount === 'undefined') continue;
	if (stepCount < minSteps) {
		minSteps = stepCount;
	}
}

console.log(minSteps);
