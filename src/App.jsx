import { useState } from "react";
// import styles from "Style.css";

function App() {
  const [themeValue, setThemeValue] = useState(1);
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleThemeChange = (e) => {
    setThemeValue(parseInt(e.target.value, 10));
  };

  const getBackgroundColor = (themeValue) => {
    console.log("Theme Value:", themeValue);
    switch (themeValue) {
      case 1:
        return "#434A59";
      case 2:
        return "#E5E4E1";
      case 3:
        return "#331C4D";
      default:
        return "#434A59";
    }
  };
  const getTextColor = (themeValue) => {
    console.log("Theme text:", themeValue);
    switch (themeValue) {
      case 1:
        return "#FFFFFF";
      case 2:
        return "#36362C";
      case 3:
        return "#FFE53D";
      default:
        return "#FFFFFF";
    }
  };
  const getButtonTextColor = (themeValue) => {
    switch (themeValue) {
      case 1:
        return "#434A59";
      case 2:
        return "#36362C";
      case 3:
        return "#FFE53D";
      default:
        return "#434A59";
    }
  };

  const getDelBoxShadow = (themeValue) => {
    switch (themeValue) {
      case 1:
        return "0px -4px 0px 0px #414E73 inset";
      case 2:
        return "0px -4px 0px 0px #1B6066 inset";
      case 3:
        return "0px -4px 0px 0px #BE15F4 inset";
      default:
        return "0px -4px 0px 0px #414E73 inset";
    }
  };
  const getOtherBoxShadow = (themeValue) => {
    switch (themeValue) {
      case 1:
        return "0px -4px 0px 0px #B3A497 inset";
      case 2:
        return "0px -4px 0px 0px #A79E91 inset";
      case 3:
        return "0px -4px 0px 0px #881C9E inset";
      default:
        return "0px -4px 0px 0px #B3A497 inset";
    }
  };

  const handleNumberClick = (number) => {
    setDisplayValue((prevValue) =>
      prevValue === "0" ? String(number) : prevValue + number
    );
  };

  const handleOperatorClick = (operator) => {
    setOperator(operator);
    setPreviousValue(displayValue);
    setDisplayValue("0");
  };

  const handleEqualsClick = () => {
    if (previousValue !== null && operator !== null) {
      const currentNumber = parseFloat(displayValue);
      const previousNumber = parseFloat(previousValue);

      switch (operator) {
        case "+":
          setDisplayValue(String(previousNumber + currentNumber));
          break;
        case "-":
          setDisplayValue(String(previousNumber - currentNumber));
          break;
        case "*":
          setDisplayValue(String(previousNumber * currentNumber));
          break;
        case "/":
          setDisplayValue(String(previousNumber / currentNumber));
          break;
        default:
          break;
      }

      setOperator(null);
      setPreviousValue(null);
    }
  };

  const handleResetClick = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
  };
  return (
    <div
      className={` min-h-[100vh] min-w-[100vw] flex justify-center pt-[30px]`}
      style={{ backgroundColor: getBackgroundColor(themeValue) }}
    >
      <div>
        <div className=" flex flex-row items-center justify-between pl-[10px]">
          <h1
            className={` text-[32px] font-bold`}
            style={{ color: getTextColor(themeValue) }}
          >
            calc
          </h1>
          <div className=" flex flex-row">
            <span
              className=" text-[12px] text-white pt-[45px] pr-[31px] font-bold"
              style={{ color: getTextColor(themeValue) }}
            >
              THEME
            </span>
            <label
              htmlFor="themerange"
              className=" flex flex-col mb-[32px] pt-[20px]"
            >
              <span
                className="pl-[10px] tracking-[14px]  text-white"
                style={{ color: getTextColor(themeValue) }}
              >
                123
              </span>
              <input
                className=" w-[71px] h-[26px] appearance-none bg-[#242D44] rounded-[13px] pl-[5px] pr-[5px]"
                type="range"
                min="1"
                max="3"
                id="themerange"
                value={themeValue}
                onChange={handleThemeChange}
              />
            </label>
          </div>
        </div>
        <div className=" flex items-center justify-end w-[327px] h-[88px] bg-[rgb(24,31,51)] rounded-[10px] mb-[24px]">
          <p
            className=" text-[#FFFFFF] text-[40px] pr-[24px]"
            style={{ color: getTextColor(themeValue) }}
          >
            {displayValue}
          </p>
        </div>
        <div className="bg-[#242D44] rounded-[10px]">
          <div className=" w-[327px]  grid grid-cols-4 gap-y-[13px] gap-x-[13px] p-[24px]">
            {[7, 8, 9, "DEL", 4, 5, 6, "+", 1, 2, 3, "-", ".", 0, "/", "*"].map(
              (item, index) => (
                <button
                  key={index}
                  className={`box-shadow w-[60px] h-[64px]
                  ${
                    item === "DEL" ? "bg-[#647198]" : "bg-[#EAE3DC]"
                  } rounded-[5px]`}
                  style={
                    item === "DEL"
                      ? {
                          boxShadow: getDelBoxShadow(themeValue),
                        }
                      : {
                          boxShadow: getOtherBoxShadow(themeValue),
                          color: getButtonTextColor(themeValue),
                        }
                  }
                  onClick={() => {
                    if (Number.isInteger(item) || item === ".") {
                      handleNumberClick(item);
                    } else if (item === "DEL") {
                      setDisplayValue((prevValue) =>
                        prevValue.length === 1 ? "0" : prevValue.slice(0, -1)
                      );
                    } else if (["+", "-", "*", "/"].includes(item)) {
                      handleOperatorClick(item);
                    }
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
          <div className=" flex flex-row justify-evenly pb-[24px]">
            {" "}
            <button
              onClick={handleResetClick}
              className=" res-but w-[133px] h-[64px] bg-[#647198] rounded-[5px]"
            >
              {" "}
              RESET
            </button>{" "}
            <button
              onClick={handleEqualsClick}
              className=" eq-but w-[133px] h-[64px] bg-[#D03F2F] rounded-[5px]"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
