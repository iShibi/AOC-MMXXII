const inputFilePath = `${Deno.cwd()}/src/day_8/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const grid = inputText.split('\n').slice(0, -1).map((row) =>
	row.split('').map((tree) => Number.parseInt(tree))
);

let maxScore = 0;

for (const [x, row] of grid.entries()) {
	for (const [y, tree] of row.entries()) {
		let score = 0;
		let [leftScore, topScore, rightScore, bottomScore] = [0, 0, 0, 0];
		let [left, top, right, bottom] = [y - 1, x - 1, y + 1, x + 1];
		let leftBlocked, topBlocked, rightBlocked, bottomBlocked;

		if (typeof row[left] !== 'undefined') {
			leftBlocked = row[left] >= tree ? true : false;
			leftScore++;
			left--;
		}
		if (top >= 0 && typeof grid[top][y] !== 'undefined') {
			topBlocked = grid[top][y] >= tree ? true : false;
			topScore++;
			top--;
		}
		if (typeof row[right] !== 'undefined') {
			rightBlocked = row[right] >= tree ? true : false;
			rightScore++;
			right++;
		}
		if (bottom < grid.length && typeof grid[bottom][y] !== 'undefined') {
			bottomBlocked = grid[bottom][y] >= tree ? true : false;
			bottomScore++;
			bottom++;
		}

		while (
			left >= 0 || top >= 0 || right < row.length || bottom < grid.length
		) {
			if (left >= 0 && !leftBlocked) {
				leftScore++;
				leftBlocked = row[left] >= tree ? true : false;
			}
			if (top >= 0 && !topBlocked) {
				topScore++;
				topBlocked = grid[top][y] >= tree ? true : false;
			}
			if (right < row.length && !rightBlocked) {
				rightScore++;
				rightBlocked = row[right] >= tree ? true : false;
			}
			if (bottom < grid.length && !bottomBlocked) {
				bottomScore++;
				bottomBlocked = grid[bottom][y] >= tree ? true : false;
			}

			left--;
			top--;
			right++;
			bottom++;
		}

		score = leftScore * rightScore * topScore * bottomScore;
		if (score > maxScore) {
			maxScore = score;
		}
	}
}

console.log(maxScore);
