const inputFilePath = `${Deno.cwd()}/src/day_4/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const pairs = inputText.split('\n');

let nonOverlappingRanges = 0;

for (const pair of pairs) {
	// A<---->B
	// C<---->D
	const [A, B, C, D] = pair.split(',')
		.flatMap(
			(range) => range.split('-').map((endpoint) => Number.parseInt(endpoint)),
		);
	if (A < C && B < C) {
		// A<---->B
		//           C<---->D
		nonOverlappingRanges += 1;
	} else if (A > D && B > D) {
		//           A<---->B
		// C<---->D
		nonOverlappingRanges += 1;
	}
}

const overlappingRanges = pairs.length - nonOverlappingRanges - 1; // The last pair is an empty array due to newline

console.log(overlappingRanges);
