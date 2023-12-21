import { useState } from "react";
import { evaluate } from "mathjs"; // THIS PACKAGE IS A LIFESAVER
import "./App.css";

const buttonValues = [
  ["C", "+/-", "%", "÷"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const operationSymbols = ["/", "*", "-", "+", "%"];

function App() {
  const [equationDisplay, setEquationDisplay] = useState(""); // what is shown in the display above buttons

  function ButtonClick(value: any) {
    switch (value) {
      case "C":
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
            setEquationDisplay(String(evaluate(equationDisplay)));
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
        <div id="calc_display_area">{equationDisplay}</div>

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
