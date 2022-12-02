const inputFilePath = `${Deno.cwd()}/src/day_2/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);

type OpponentChoice = 'A' | 'B' | 'C';
type MyChoice = 'X' | 'Y' | 'Z';

const rounds = inputText.split('\n') as Array<`${OpponentChoice} ${MyChoice}`>;

const opponentChoices = {
	'Rock': 'A',
	'Paper': 'B',
	'Scissors': 'C',
};

const myChoices = {
	'Rock': 'X',
	'Paper': 'Y',
	'Scissors': 'Z',
};

const myChoicePoints = {
	'Rock': 1,
	'Paper': 2,
	'Scissors': 3,
};

const resultPoints = {
	'lost': 0,
	'draw': 3,
	'won': 6,
};

let totalScore = 0;

for (const round of rounds) {
	const [opponentChoice, myChoice] = round.split(' ') as [
		OpponentChoice,
		MyChoice,
	];
	switch (opponentChoice) {
		case opponentChoices.Rock:
			myChoice === myChoices.Rock
				? totalScore += resultPoints.draw + myChoicePoints.Rock
				: myChoice === myChoices.Paper
				? totalScore += resultPoints.won + myChoicePoints.Paper
				: totalScore += resultPoints.lost + myChoicePoints.Scissors;
			break;

		case opponentChoices.Paper:
			myChoice === myChoices.Rock
				? totalScore += resultPoints.lost + myChoicePoints.Rock
				: myChoice === myChoices.Paper
				? totalScore += resultPoints.draw + myChoicePoints.Paper
				: totalScore += resultPoints.won + myChoicePoints.Scissors;
			break;

		case opponentChoices.Scissors:
			myChoice === myChoices.Rock
				? totalScore += resultPoints.won + myChoicePoints.Rock
				: myChoice === myChoices.Paper
				? totalScore += resultPoints.lost + myChoicePoints.Paper
				: totalScore += resultPoints.draw + myChoicePoints.Scissors;
			break;

		default:
			break;
	}
}

console.log(`My total score: ${totalScore}`);
