import { useState } from "react";

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
        return "#434A59"; // Replace with the color for theme 1
      case 2:
        return "#E5E4E1"; // Replace with the color for theme 2
      case 3:
        return "#331C4D"; // Replace with the color for theme 3
      default:
        return "#434A59";
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
      className={`bg-[${getBackgroundColor(themeValue)}] 
      min-h-[100vh] min-w-[100vw] flex justify-center items-center`}
    >
      <div>
        <div className=" flex flex-row items-center justify-between">
          <h1 className=" text-[#FFFFFF] text-[32px] font-bold">calc</h1>
          <div className=" flex flex-row">
            <span className=" text-[12px] text-white pt-[35px] pr-[31px]  ">
              THEME
            </span>
            <label
              htmlFor="themerange"
              className=" flex flex-col mb-[32px] pt-[8px]"
            >
              <span className="pl-[10px] tracking-[14px]  text-white">123</span>
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
          <p className=" text-[#FFFFFF] text-[48px] pr-[24px]">
            {displayValue}
          </p>
        </div>
        <div className="bg-[#242D44] rounded-[10px]">
          <div className=" w-[327px] h-[430px] grid grid-cols-4 gap-y-[13px] p-[24px]">
            {[7, 8, 9, "DEL", 4, 5, 6, "+", 1, 2, 3, "-", ".", 0, "/", "*"].map(
              (item, index) => (
                <button
                  key={index}
                  className="box-shadow w-[60px] h-[64px] bg-[#EAE3DC]"
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
              className=" res-but w-[133px] h-[64px] bg-[#647198]"
            >
              {" "}
              RESET
            </button>{" "}
            <button
              onClick={handleEqualsClick}
              className=" eq-but w-[133px] h-[64px] bg-[#D03F2F] "
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
