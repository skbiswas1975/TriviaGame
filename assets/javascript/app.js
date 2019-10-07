
const questionList=[
	{
		question: "What is a capital?",
		choices: ["A cap", "A tall person", "A cap of a tall person", "Main city of a country"],
		correctAnswer: "Main city of a country"
	},
	
	{
		question: "What is a city?",
		choices: ["A person", "A place", "A creature", "A bridge"],
		correctAnswer: "A place"
	},
	
	{
		question: "What is a town?",
		choices: ["A small place", "Name of a rock", "A food", "Name of a sport"],
		correctAnswer: "A small place"
	},
	
	{
		question: "What is a village?",
		choices: ["A rural area", "An urban area", "None of the above", "All of the above"],
		correctAnswer: "A rural area"
	}
];

const celebGif=[
	'assets/images/correct1.gif',
	'assets/images/correct2.gif',
	'assets/images/correct3.gif',
	'assets/images/correct4.gif'
];

const sadGif=[
	'assets/images/wrong1.gif',
	'assets/images/wrong2.gif',
	'assets/images/wrong3.gif',
	'assets/images/wrong4.gif'
];

const missedGif=[
	'assets/images/unanswered1.gif',
	'assets/images/unanswered2.gif',
	'assets/images/unanswered3.gif',
	'assets/images/unanswered4.gif'
];






let counter=5;
let currentQuestion=0;
let score=0;
let lost=0;
let missed=0;
let timer;

function timeOut()
{
	clearInterval(timer);
	missed++;
	loadImages('missed');
	setTimeout(displayNextQuestion, 3*1000);
}

function displayNextQuestion()
{
	const isEndOfQuestions=questionList.length-1===currentQuestion;
	if(isEndOfQuestions)
	{
		displayFinalScore();
		console.log("Game over");
	}
	else
	{
		currentQuestion++;
		displayQuestion();
	}
	
}

function countDownTimer()
{
	counter--;
	$('#time').html("Time Remaining: "+ counter);
	if(counter===0)
	{
		timeOut();
	}
}

function startGame()
{
	$('#game').html(`
		<button class="btn btn-primary" id="start">Start</button>
	`);
}

$(document).on('click', '#start', function(){
	counter=5;
	currentQuestion=0;
	score=0;
	lost=0;
	missed=0;
	timer=null;
	$('#correctAns').html();
	
	displayQuestion();
});

function displayQuestion(){
	
	counter=5;
	timer=setInterval(countDownTimer, 1000);
	
	const question=questionList[currentQuestion].question;
	const choices=questionList[currentQuestion].choices;
	
	$('#time').html("Time Remaining: "+ counter);
	$('#game').html(`
		<h4>${question}</h4>
		${displayChoices(choices)}
	`);
}

function displayChoices(choices){
	let result='';
	
	for (let i=0; i<choices.length; i++)
	{
		result+=`<p class="choice col-sm-6" data-answer="${choices[i]}">${choices[i]}</p>`;
	}
	
	return result;
}

$(document).on('click', '.choice', function(){
	clearInterval(timer);
	const selectedAnswer=$(this).attr('data-answer');
	const correctAnswer=questionList[currentQuestion].correctAnswer;
	if(selectedAnswer===correctAnswer)
	{
		score++;
		loadImages('win');
		setTimeout(displayNextQuestion, 3*1000);
	}
	else
	{
		lost++;
		loadImages('lost');
		setTimeout(displayNextQuestion, 3*1000);
	}
	console.log("clicked"+selectedAnswer);
	
	
});




$(document).on('click', '#reset', function(){
	counter=5;
	currentQuestion=0;
	score=0;
	lost=0;
	missed=0;
	timer=null;
	$('#correctAns').html();
	
	displayQuestion();
});

function displayFinalScore(){
	const finalScore=`
	<h3 class="load-img">All done, heres how you did!</h3>
	<p>Correct answer(s): ${score}</p>
	<p>Incorrect answer(s): ${lost}</p>
	<p>Unanswered: ${missed}</p>
	<button class="btn btn-primary" id="reset">Start Over?</button>
	`;
	
	$('#game').html(finalScore);
}

function randomImg(images){
	const random=Math.floor(Math.random()*images.length);
	const randomImage=images[random];
	
	return randomImage;
}

function loadImages(status){
	const correctAnswer=questionList[currentQuestion].correctAnswer;
	
	if(status==='win')
	{
		$('#game').html(`
			<h3 class="load-img">Correct!</h3>
			<img class="img" src="${randomImg(celebGif)}">
		`);
	}
	
	else if(status==='lost')
	{
		$('#game').html(`
		<h3 class="load-img">Nope!</h3>
		<p class="load-img">The Correct Answer was:   <b>${correctAnswer}</b></p>
		<img class="img" src="${randomImg(sadGif)}">
		`);
	}
	
	else
	{
		$('#game').html(`
		<h3 class="load-img">Out of Time!</h3>
		<p class="load-img">The Correct Answer was:   <b>${correctAnswer}</b></p>
		<img class="img" src="${randomImg(missedGif)}">
		`);
	}
}


startGame();


