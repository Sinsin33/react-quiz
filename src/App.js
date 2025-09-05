import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Questions from "./Questions";
import StartScreen from "./StartScreen";
import { type } from "@testing-library/user-event/dist/type";
const initialState = {
  questions: [],
  status: "loading",
};
const reducer = function (state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "start",
      };
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const questionLength = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionLength={questionLength} dispatch={dispatch} />
        )}
        {status === "start" && <Questions />}
      </Main>
    </div>
  );
}

export default App;
