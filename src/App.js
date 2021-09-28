import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
	const { loading, quiz } = useGlobalContext();

	if (loading) {
		return <Loading />;
	}
	return <>{quiz.length > 0 ? <Modal /> : <SetupForm />}</>;
}

export default App;
