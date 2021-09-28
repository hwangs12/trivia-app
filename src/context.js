import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
	sports: 21,
	history: 23,
	politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		amount: 10,
		category: "sports",
		difficulty: "easy",
	});
	const [quiz, setQuiz] = useState([]);
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [choices, setChoices] = useState([]);
	const [response, setResponse] = useState({
		status: undefined,
	});

	useEffect(() => {
		if (quiz.length > 0) {
			const { correct_answer, incorrect_answers } = quiz[index];
			const new_index = Math.floor(Math.random() * 4);
			const multipleChoiceList = [...incorrect_answers];
			multipleChoiceList.splice(new_index, 0, correct_answer);
			setChoices(multipleChoiceList);
		}
	}, [quiz, index]);

	const handleForm = (e) => {
		const { name, value } = e.target;
		setForm((form) => {
			return {
				...form,
				[name]: value,
			};
		});
	};

	const getUrl = async (url) => {
		const resp = await axios.get(url);
		const data = resp.data;
		return data;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = await getUrl(
			`${API_ENDPOINT}amount=${form.amount}&category=${
				table[form.category]
			}&difficulty=${form.difficulty}`
		);
		setLoading(false);
		setResponse({ status: data.response_code });
		setQuiz(data.results);
	};

	const handleNextQuestion = () => {
		setIndex((index) => index + 1);
	};

	const handleAnswer = (e) => {
		if (e.target.innerText === quiz[index].correct_answer) {
			setScore((score) => score + 1);
		}
		setIndex((index) => index + 1);
	};

	const handleReplay = () => {
		setQuiz([]);
		setIndex(0);
		setScore(0);
		setChoices([]);
		setResponse({ status: undefined });
	};

	return (
		<AppContext.Provider
			value={{
				choices,
				score,
				index,
				loading,
				form,
				quiz,
				response,
				handleForm,
				handleSubmit,
				handleNextQuestion,
				handleAnswer,
				handleReplay,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
