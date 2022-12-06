const inputFilePath = `${Deno.cwd()}/src/day_6/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const datastreamBuffer = inputText.slice(0, -1);

const bufferSize = datastreamBuffer.length;
const windowSize = 4;

// Sliding window
// ..............
// [--]..........
// .[--].........
for (let i = 0; i < bufferSize; i++) {
	const window = datastreamBuffer.slice(i, i + windowSize);
	const uniqueCharsInWindow = new Set(window.split(''));
	if (uniqueCharsInWindow.size === windowSize) {
		console.log(i + windowSize);
		break;
	}
}
