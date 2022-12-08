const inputFilePath = `${Deno.cwd()}/src/day_7/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const lines = inputText.split('\n').slice(0, -1);

const childToParent = new Map<string, string>();
const parentToChildren = new Map<string, Array<string>>();
const dirSizes = new Map<string, number>();
let currentDir = '';
let currentDirSize = 0;

for (const line of lines) {
	const words = line.split(' ');
	if (words.at(0) === '$') {
		const [_, cmd, arg] = words as ['$', 'cd' | 'ls', string | undefined];
		if (cmd === 'cd' && typeof arg !== 'undefined') {
			if (arg === '..') {
				const parent = childToParent.get(currentDir);
				if (parent) {
					currentDir = parent;
				}
			} else if (arg === '/') {
				currentDir = '/';
			} else {
				const moveInto = `${currentDir}>${arg}`;
				childToParent.set(moveInto, currentDir);
				currentDir = moveInto;
			}
			currentDirSize = 0;
		}
	} else if (words.at(0) === 'dir') {
		const [_, dirName] = words as ['dir', string];
		if (parentToChildren.has(currentDir)) {
			parentToChildren.get(currentDir)?.push(`${currentDir}>${dirName}`);
		} else {
			parentToChildren.set(currentDir, [`${currentDir}>${dirName}`]);
		}
	} else {
		const [fileSize, _] = words.map((word) => Number.parseInt(word));
		currentDirSize += fileSize;
		dirSizes.set(currentDir, currentDirSize);
	}
}

function calculateTotalSizeOfDir(dirName: string) {
	let totalDirSize = dirSizes.get(dirName) ?? 0;
	const children = parentToChildren.get(dirName);
	if (children?.length) {
		for (const child of children) {
			totalDirSize += calculateTotalSizeOfDir(child);
		}
	}
	dirSizes.set(dirName, totalDirSize);
	return totalDirSize;
}

calculateTotalSizeOfDir('/');

let total = 0;

for (const dirSize of dirSizes.values()) {
	if (dirSize <= 100000) {
		total += dirSize;
	}
}

console.log(total);
