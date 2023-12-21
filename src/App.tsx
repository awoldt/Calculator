import { useState } from "react";
import { evaluate, log } from "mathjs"; // THIS PACKAGE IS A LIFESAVER
import "./App.css";

const buttonValues = [
  ["C", "BACKSPACE", "%", "÷"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const operationSymbols = ["/", "*", "-", "+", "%"];

function App() {
  const [equationDisplay, setEquationDisplay] = useState(""); // what is shown in the display above buttons
  const [recentEquation, setRecentEquation] = useState("");

  function ButtonClick(value: any) {
    switch (value) {
      case "C":
        setRecentEquation("");
        setEquationDisplay("");
        break;

      case "=":
        if (
          equationDisplay.includes("/") ||
          equationDisplay.includes("*") ||
          equationDisplay.includes("-") ||
          equationDisplay.includes("+") ||
          equationDisplay.includes("%")
        ) {
          try {
            setRecentEquation(equationDisplay);

            let t: number = evaluate(equationDisplay);
            console.log("total is " + t);
            if (t % 1 === 0) {
              console.log("whole number!");
            } else {
              console.log("not whole number!");
              t = Number(t.toFixed(2));
              console.log(t);
            }

            setEquationDisplay(String(t));
          } catch (err) {}
        }
        break;

      default:
        if (value === "÷") {
          value = "/";
        }

        if (
          !operationSymbols.includes(
            equationDisplay[equationDisplay.length - 1]
          ) ||
          !operationSymbols.includes(value)
        ) {
          setEquationDisplay((prev) => (prev += value));
        }

        break;
    }
  }

  return (
    <div>
      <div id="calculator">
        <div id="calc_display_area">
          <span id="recent_equation_area">
            {recentEquation !== "" && recentEquation}
          </span>
          {equationDisplay !== "" ? equationDisplay : undefined}
        </div>

        <div id="calc_buttons_area">
          {buttonValues.map((x) => {
            return (
              <div>
                {x.map((y) => {
                  return y === "0" ? (
                    <button
                      className="half_stretch"
                      onClick={() => {
                        ButtonClick(y);
                      }}
                    >
                      {y}
                    </button>
                  ) : y === "BACKSPACE" ? (
                    <button
                      onClick={() => {
                        if (equationDisplay !== "") {
                          setEquationDisplay((prev) => prev.slice(0, -1));
                        }
                      }}
                    >
                      &#8592;
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        ButtonClick(y);
                      }}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
