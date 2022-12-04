const inputFilePath = `${Deno.cwd()}/src/day_4/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);
const pairs = inputText.split('\n');

let pairsWithFullyContainedRange = 0;

for (const pair of pairs) {
	// A<---->B
	// C<---->D
	const [A, B, C, D] = pair.split(',')
		.flatMap(
			(range) => range.split('-').map((endpoint) => Number.parseInt(endpoint)),
		);
	if (A >= C && B <= D) {
		//    A<----->B
		// C<----------->D
		pairsWithFullyContainedRange += 1;
	} else if (A <= C && B >= D) {
		// A<----------->B
		//    C<----->D
		pairsWithFullyContainedRange += 1;
	}
}

console.log(pairsWithFullyContainedRange);
