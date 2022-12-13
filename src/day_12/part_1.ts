const inputFilePath = `${Deno.cwd()}/src/day_12/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);

const grid = inputText.split('\n').slice(0, -1).map((row) => row.split(''));
const gridLen = grid.length;
const rowLen = grid[0].length;
// Direction vectors: North, South, East, West
const dirVecRow = [1, -1, 0, 0];
const dirVecCol = [0, 0, 1, -1];
const startRow = grid.findIndex((row) => row.includes('S'));
const startCol = grid[startRow].findIndex((val) => val === 'S');

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

function findNumberOfSteps() {
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

const stepCount = findNumberOfSteps();

if (stepCount) {
	console.log(stepCount);
} else {
	console.log('No path found');
}
