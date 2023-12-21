import { useEffect, useRef, useState } from "react";
import { evaluate } from "mathjs"; // THIS PACKAGE IS A LIFESAVER
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

  const equationSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (equationDisplay.length <= 12) {
      equationSpanRef.current!.style.fontSize = "45px";
    }
    if (equationDisplay.length > 12) {
      equationSpanRef.current!.style.fontSize = "35px";
    }
    if (equationDisplay.length > 15) {
      equationSpanRef.current!.style.fontSize = "25px";
    }
  });

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
            if (t % 1 !== 0) {
              console.log("not whole number!");
              t = Number(t.toFixed(2));
              console.log(t);
            }
            setEquationDisplay(String(t));
          } catch (err) {
            setEquationDisplay("ERROR");
          }
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
            {recentEquation !== "" && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="lightgrey"
                >
                  <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
                </svg>{" "}
                {recentEquation}
              </>
            )}
          </span>
          <span ref={equationSpanRef}>
            {equationDisplay !== "" ? equationDisplay : undefined}
          </span>
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
                  ) : y === "÷" ||
                    y === "*" ||
                    y === "-" ||
                    y === "+" ||
                    y === "=" ? (
                    <button
                      onClick={() => {
                        ButtonClick(y);
                      }}
                      className="dark-button"
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

      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <a
          href="https://awoldt.com/"
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            color: "grey",
            fontFamily: "Silkscreen-Regular",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-brush"
            viewBox="0 0 16 16"
          >
            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"></path>
          </svg>
          Made by awoldt
        </a>
      </div>
    </div>
  );
}

export default App;
