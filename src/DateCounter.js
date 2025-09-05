import { useReducer, useState } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + state.step };
    case "decrease":
      return { ...state, count: state.count - state.step };
    case "changeStep":
      return { ...state, step: action.payload };
    case "reset":
      return { count: 0, step: 1 };
    case "manuallChange":
      return { ...state, count: action.payload };
    default:
      return state;
  }
}
function DateCounter() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");

  date.setDate(date.getDate() + state.count);

  // const dec = function () {
  //   // setCount((count) => count - 1);
  //   setCount((count) => count - step);
  // };

  // const inc = function () {
  //   // setCount((count) => count + 1);
  //   setCount((count) => count + step);
  // };

  // const defineCount = function (e) {
  //   setCount(Number(e.target.value));
  // };

  // const defineStep = function (e) {
  //   setStep(Number(e.target.value));
  // };

  // const reset = function () {
  //   // setCount(0);
  //   setStep(1);
  // };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "changeStep", payload: Number(e.target.value) })
          }
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "decrease" });
          }}
        >
          -
        </button>
        <input
          value={state.count}
          onChange={(e) => {
            dispatch({
              type: "manuallChange",
              payload: Number(e.target.value),
            });
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: "increase" });
          }}
        >
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
