import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import EndGamePopup from './EndGamePopup.tsx';

type TriviaQuestion = {
    category: string;
    type: "multiple" | "boolean";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

function decodeHTMLEntities(text: string) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

export default function Game() {
    const [message, setMessage] = useState<string>('');
    const [lives, setLives] = useState(3);
    const [showNext, setShowNext] = useState(false);
    const [points, setPoints] = useState(0);

    const [question, setQuestion] = useState<TriviaQuestion | null>(null);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [questionType, setQuestionType] = useState<'multiple' | 'boolean'>('boolean');


    const calculatePoints = (difficulty: "easy" | "medium" | "hard") => {
        switch (difficulty) {
            case "easy":
                return 1;
            case "medium":
                return 3;
            case "hard":
                return 5;
            default:
                return 0;
        }
    }

    const fetchNewQuestion = () => {
        return fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=${questionType}&category=9`)
            .then(response => response.json())
            .then(data => {
                const decodedQuestion = {
                    ...data.results[0],
                    question: decodeHTMLEntities(data.results[0].question),
                };
                setQuestion(decodedQuestion);
                setMessage('');
                setShowNext(false);
            })
            .catch(error => console.error("Error fetching question:", error));
    };

    useEffect(() => {
        fetchNewQuestion();
    }, [difficulty, questionType]);

    const handleAnswer = (selectedAnswer: string | boolean) => {
        let isCorrect = false;

        if (question!.type === "boolean") {
            isCorrect = (selectedAnswer === true && question!.correct_answer === "True") ||
                (selectedAnswer === false && question!.correct_answer === "False");
        } else {
            isCorrect = question!.correct_answer === selectedAnswer;
        }

        if (isCorrect) {
            setMessage("Correct!");
            setPoints(prevPoints => prevPoints + calculatePoints(difficulty));
        } else {
            setMessage(`Wrong. The correct answer was: ${question!.correct_answer}.`);
            setLives(prevLives => prevLives - 1);
        }
        setShowNext(true);
    }

    const handleRestart = () => {
        setDifficulty('easy');
        setQuestionType('boolean');
        setLives(3);
        setPoints(0);
        fetchNewQuestion();
    }

    const handleNextQuestion = () => {
        if (questionType === 'boolean' && difficulty === 'easy') {
            setQuestionType('multiple');
        } else if (questionType === 'multiple' && difficulty === 'easy') {
            setQuestionType('boolean');
            setDifficulty('medium');
        } else if (questionType === 'boolean' && difficulty === 'medium') {
            setQuestionType('multiple');
        } else if (questionType === 'multiple' && difficulty === 'medium') {
            setQuestionType('boolean');
            setDifficulty('hard');
        } else if (questionType === 'boolean' && difficulty === 'hard') {
            setQuestionType('multiple');
        } else if (questionType === 'multiple' && difficulty === 'hard') {
            handleRestart();
        }
    }

    return (
        <Card className='m-3' style={{ width: '90vw', height: '90vh', boxSizing: 'border-box' }}>
            <div className="d-flex justify-content-between mb-3">
                <div><span role="img" aria-label="heart">❤️</span> x {lives}</div>
                <div>{points} <span role="img" aria-label="star">⭐</span></div>
            </div>
    
            {lives <= 0 && points < 15 ? (
                <div>
                    <EndGamePopup points={points} onRestart={handleRestart} />
                    <button className="answer-btn" onClick={handleRestart}>Play Again</button>
                </div>
            ) : points >= 15 ? (
                <div>
                    <p>Congratulations, you won with {points} points!</p>
                    <button className="answer-btn" onClick={handleRestart}>Play Again</button>
                </div>
            ) : (
                <>
                    {question && !showNext && (
                        <>
                            <div className="question-section">
                                <p>Difficulty: {question.difficulty}</p>
                                <h2>{question.question}</h2>
                            </div>
    
                            <div className="answers-section">
                                {question.type === 'boolean' ? (
                                    <>
                                        <button className="answer-btn" onClick={() => handleAnswer(true)}>True</button>
                                        <button className="answer-btn" onClick={() => handleAnswer(false)}>False</button>
                                    </>
                                ) : (
                                    [...question.incorrect_answers, question.correct_answer]
                                        .sort(() => Math.random() - 0.5)
                                        .map((answer, idx) => (
                                            <button key={idx} className="answer-btn" onClick={() => handleAnswer(answer)}>
                                                {answer}
                                            </button>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                    {message && <p>{message}</p>}
                    {showNext && (
                        <button className="answer-btn" onClick={() => {
                            setShowNext(false);
                            handleNextQuestion();
                        }}>{lives === 0 || points >= 15 ? "Play again?" : "Next question"}</button>
                    )}
                </>
            )}
        </Card>
    );
}