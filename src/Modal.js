import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
	const {
		quiz,
		index,
		score,
		choices,
		handleNextQuestion,
		handleAnswer,
		handleReplay,
	} = useGlobalContext();
	const { question } = quiz[index];

	return (
		<main>
			<div
				className={`modal-container ${
					index === quiz.length - 1 && `isOpen`
				}`}
			>
				<div className="modal-content">
					<h2>congrats</h2>
					<p>{`You answered ${parseInt(
						(score / quiz.length) * 100
					)}% of questions correctly`}</p>
					<button className="close-btn" onClick={handleReplay}>
						play again
					</button>
				</div>
			</div>
			<section className="quiz">
				<p className="correct-answers">{`correct answers : ${score} / ${index}`}</p>
				<article className="container">
					<h2>
						<div dangerouslySetInnerHTML={{ __html: question }} />
					</h2>
					<div className="btn-container">
						{choices.map((choice, index) => {
							return (
								<button
									key={index}
									className="answer-btn"
									onClick={handleAnswer}
								>
									{choice}
								</button>
							);
						})}
					</div>
				</article>
				<button className="next-question" onClick={handleNextQuestion}>
					next question
				</button>
			</section>
		</main>
	);
};

export default Modal;
