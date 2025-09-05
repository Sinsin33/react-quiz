function StartScreen({ questionLength, dispatch }) {
  return (
    <div className="start">
      <h2> wlcome to react quiz</h2>
      <h3>{questionLength} quiz to test your knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        start
      </button>
    </div>
  );
}

export default StartScreen;
