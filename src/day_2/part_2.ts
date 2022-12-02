const inputFilePath = `${Deno.cwd()}/src/day_2/input.txt`;
const inputText = await Deno.readTextFile(inputFilePath);

type OpponentChoice = 'A' | 'B' | 'C';
type Result = 'X' | 'Y' | 'Z';

const rounds = inputText.split('\n') as Array<`${OpponentChoice} ${Result}`>;

const opponentChoices = {
	'Rock': 'A',
	'Paper': 'B',
	'Scissors': 'C',
};

const myChoicePoints = {
	'Rock': 1,
	'Paper': 2,
	'Scissors': 3,
};

const results = {
	'lost': 'X',
	'draw': 'Y',
	'won': 'Z',
};

const resultPoints = {
	'lost': 0,
	'draw': 3,
	'won': 6,
};

let totalScore = 0;

for (const round of rounds) {
	const [opponentChoice, result] = round.split(' ') as [OpponentChoice, Result];
	switch (opponentChoice) {
		case opponentChoices.Paper:
			result === results.draw
				? totalScore += resultPoints.draw + myChoicePoints.Paper
				: result === results.lost
				? totalScore += resultPoints.lost + myChoicePoints.Rock
				: totalScore += resultPoints.won + myChoicePoints.Scissors;
			break;

		case opponentChoices.Rock:
			result === results.draw
				? totalScore += resultPoints.draw + myChoicePoints.Rock
				: result === results.lost
				? totalScore += resultPoints.lost + myChoicePoints.Scissors
				: totalScore += resultPoints.won + myChoicePoints.Paper;
			break;

		case opponentChoices.Scissors:
			result === results.draw
				? totalScore += resultPoints.draw + myChoicePoints.Scissors
				: result === results.lost
				? totalScore += resultPoints.lost + myChoicePoints.Paper
				: totalScore += resultPoints.won + myChoicePoints.Rock;
			break;

		default:
			break;
	}
}

console.log(`My total score: ${totalScore}`);
