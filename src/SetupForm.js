import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
	const { form, handleForm, handleSubmit, response } = useGlobalContext();

	return (
		<main>
			<section className="quiz quiz-small">
				<form className="setup-form" onSubmit={handleSubmit}>
					<h2>setup quiz</h2>
					<div className="form-control">
						<label htmlFor="amount">number of questions</label>
						<input
							type="number"
							name="amount"
							id="amount"
							className="form-input"
							min="1"
							max="50"
							value={form.amount}
							onChange={handleForm}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="category">category</label>
						<select
							name="category"
							id="category"
							className="form-input"
							value={form.category}
							onChange={handleForm}
						>
							<option value="sports">sports</option>
							<option value="history">history</option>
							<option value="politics">politics</option>
						</select>
					</div>
					<div className="form-control">
						<label htmlFor="difficulty">select difficulty</label>
						<select
							name="difficulty"
							id="difficulty"
							className="form-input"
							value={form.difficulty}
							onChange={handleForm}
						>
							<option value="easy">easy</option>
							<option value="medium">medium</option>
							<option value="hard">hard</option>
						</select>
					</div>
					{response.status !== "0" &&
						response.status !== undefined && (
							<p className="error">
								Quiz Not Available. Choose other options
							</p>
						)}
					<button className="submit-btn" type="submit">
						start
					</button>
				</form>
			</section>
		</main>
	);
};

export default SetupForm;
