// TODO: This solution is giving wrong answer

const inputFilePath = `${Deno.cwd()}/src/day_7/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const lines = inputText.split('\n').slice(0, -1).reverse();

const dirSizes = new Map<string, number>();
let currentDirSize = 0;
let total = 0;

for (const line of lines) {
	const words = line.split(' ');
	if (words.at(0) === '$') {
		const [_, cmd, arg] = words as ['$', 'cd' | 'ls', string | undefined];
		if (cmd === 'cd') {
			if (arg === '..') continue;
			dirSizes.set(arg as string, currentDirSize);
			if (currentDirSize <= 100000) {
				total += currentDirSize;
			}
			currentDirSize = 0;
		}
	} else if (words.at(0) === 'dir') {
		const dirName = words.at(1);
		if (!dirName) continue;
		const dirSize = dirSizes.get(dirName);
		if (!dirSize) continue;
		currentDirSize += dirSize;
	} else {
		const [fileSize, _] = words.map((word) => Number.parseInt(word));
		currentDirSize += fileSize;
	}
}

const totalDiskSpace = 70000000;
const usedSpace = dirSizes.get('/') as number;
const totalUnusedSpaceRequired = 30000000;
const freeSpace = totalDiskSpace - usedSpace;

const spaceToFree = totalUnusedSpaceRequired - freeSpace;

let minSpaceToFree = usedSpace;

for (const dirSize of dirSizes.values()) {
	if (dirSize >= spaceToFree && dirSize < minSpaceToFree) {
		minSpaceToFree = dirSize;
	}
}

console.log(minSpaceToFree);
