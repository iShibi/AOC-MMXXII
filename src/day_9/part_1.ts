const inputFilePath = `${Deno.cwd()}/src/day_9/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const instructions = inputText.split('\n').slice(0, -1);

type Direction = 'U' | 'R' | 'D' | 'L';

const tailLocationHistory = new Map<string, boolean>(); // <'x|y', boolean>;

let [hx, hy] = [0, 0];
let [tx, ty] = [0, 0];

for (const instruction of instructions) {
	const [direction, n] = instruction.split(' ') as [Direction, `${number}`];
	const stepsToMove = Number.parseInt(n);
	for (let i = 1; i <= stepsToMove; i++) {
		if (direction === 'D') {
			hy--;
		} else if (direction === 'L') {
			hx--;
		} else if (direction === 'R') {
			hx++;
		} else {
			hy++;
		}
		const [xd, yd] = [Math.abs(hx - tx), Math.abs(hy - ty)];
		if (xd > 1 || yd > 1) {
			// move
			if (hx !== tx && hy !== ty) {
				// move diagonally
				if (hy > ty) {
					// move diagonally up
					if (hx > tx) {
						// move diagonally up-right
						ty++;
						tx++;
					} else {
						// move diagonally up-left
						ty++;
						tx--;
					}
				} else {
					// move diagonally down
					if (hx > tx) {
						// move diagonally down-right
						ty--;
						tx++;
					} else {
						// move diagonally down-left
						ty--;
						tx--;
					}
				}
			} else {
				// move straight
				if (hy === ty) {
					// move horizontally straight
					if (hx > tx) {
						// move horizontally straight-right
						tx++;
					} else {
						// move horizontally straight-left
						tx--;
					}
				} else {
					// move vertically straight
					if (hy > ty) {
						// move vertically straight-up
						ty++;
					} else {
						// move vertically straight-down
						ty--;
					}
				}
			}
		}
		tailLocationHistory.set(`${tx}|${ty}`, true);
	}
}

console.log(tailLocationHistory.size);
