import { useState } from "react";

function MainAge() {
  const [getDate, setDate] = useState("");
  const [getMonth, setMonth] = useState("");
  const [getYear, setYear] = useState("");

  const [calDays, setCalDays] = useState("");
  const [calMonths, setCalMonths] = useState("");
  const [calYears, setCalYears] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const validateDateInput = (day, month, year) => {
    let currentDate = new Date();
    let dateObj = new Date(parseInt(year), parseInt(month - 1), parseInt(day));

    if (!day || !month || !year) {
      if (!day) {
        setDayError(true);
      }
      if (!month) {
        setMonthError(true);
      }
      if (!year) {
        setYearError(true);
      }
      if (!day && !month && !year) {
        setEmptyError(true);
      }
      return { isValid: false, error: `The field is empty` };
    }
    if (day < 1 || day > 31) {
      setDayError(true);
      setMonthError(false);
      return { isValid: false, error: `Please enter a valid date` };
    }
    if (month < 1 || month > 12) {
      setMonthError(true);
      return { isValid: false, error: `Please enter a valid month` };
    }
    if (year > currentDate.getFullYear() || year < 1800) {
      setYearError(true);
      return {
        isValid: false,
        error:
          year < 1800
            ? "Year must be after 1800"
            : "Birth year must be in the past",
      };
    }
    if (dateObj.getFullYear() != year) {
      setYearError(true);
      return { isValid: false, error: `Invalid year` };
    }
    if (dateObj.getMonth() != month - 1) {
      setMonthError(true);
      return { isValid: false, error: `Invalid date: Month doesn't exists` };
    }
    if (dateObj.getDate() != day) {
      setDayError(true);
      return {
        isValid: false,
        error: `Invalid date: Day doesn't exits in this month`,
      };
    }

    return { isValid: true, birthDate: dateObj, currentDate: currentDate };
  };

  const checkRealTimeValidation = (day, month, year) => {
    setDayError(false);
    setMonthError(false);
    setYearError(false);
    setEmptyError(false);
    setErrorMsg("");

    if (day || month || year) {
      // First check basic validations
      let currentDate = new Date();

      // Check day range
      if (day && (day < 1 || day > 31)) {
        setDayError(true);
        setErrorMsg("Please enter a valid date");
        return;
      }

      // Check month range
      if (month && (month < 1 || month > 12)) {
        setMonthError(true);
        setErrorMsg("Please enter a valid month");
        return;
      }

      // Check year
      if (year && (year > currentDate.getFullYear() || year < 1800)) {
        setYearError(true);
        setErrorMsg(
          year < 1800
            ? "Year must be after 1800"
            : "Birth year must be in the past"
        );
        return;
      }

      // Check if day exists in the specific month
      if (day && month && year) {
        let dateObj = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );

        // If the date object's day doesn't match what we entered,
        // it means that day doesn't exist in that month
        if (dateObj.getDate() != day) {
          setDayError(true);
          setErrorMsg("Invalid date: Day doesn't exist in this month");
          return;
        }

        // Check if month got adjusted
        if (dateObj.getMonth() != month - 1) {
          setMonthError(true);
          setErrorMsg("Invalid date: Month doesn't exist");
          return;
        }
      }
    }
  };

  const calculateAge = (day, month, year) => {
    const validation = validateDateInput(day, month, year);

    if (!validation.isValid) {
      setErrorMsg(validation.error);
      return;
    }

    let userDate = validation.birthDate;
    let currentDate = validation.currentDate;

    let ageYear = currentDate.getFullYear() - userDate.getFullYear();
    let ageMonth = currentDate.getMonth() - userDate.getMonth();
    let ageDays = currentDate.getDate() - userDate.getDate();

    if (ageDays < 0) {
      ageMonth--;
      let prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      ageDays += prevMonth.getDate();
    }

    if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
    }

    console.log(`entered date:${day}  month:${month} year:${year}`);
    console.log(` year:${ageYear}  month:${ageMonth} days:${ageDays}`);

    setCalDays(ageDays);
    setCalMonths(ageMonth);
    setCalYears(ageYear);
    setErrorMsg("");
    setDayError(false);
    setMonthError(false);
    setYearError(false);
    setEmptyError(false);
  };

  // Handle input changes with real-time validation
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    // Check validation after user types
    checkRealTimeValidation(newDate, getMonth, getYear);
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    // Check validation after user types
    checkRealTimeValidation(getDate, newMonth, getYear);
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    // Check validation after user types
    checkRealTimeValidation(getDate, getMonth, newYear);
  };

  console.log("temp error msg: ", errorMsg);

  return (
    <>
      <div className="flex flex-col justify-center  items-center min-h-screen p-4">
        <div className="flex flex-col  p-6 gap-6 bg-white h-auto w-full rounded-3xl justify-between rounded-br-[25vw] md:gap-4  lg:p-[2dvw] md:rounded-br-[8vw] md:w-[46dvw] ">
          <div className="flex flex-row w-full h-auto items-start gap-4  p-4 lg:gap-6 ">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-md font-semibold">DAY</label>
              <input
                required
                className={`border p-2 rounded-lg outline-none w-full appearance-none ${
                  dayError ? "border-red-500" : "border-gray-300"
                }`}
                type="number"
                placeholder="DD"
                value={getDate}
                onChange={handleDateChange}
                min={1}
                max={31}
              />
              <div className="h-6 flex items-start">
                {(dayError || emptyError) && (
                  <span className="text-red-500 text-sm">{errorMsg}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-md font-semibold">MONTH</label>
              <input
                required
                className={`border p-2 rounded-lg w-full outline-none appearance-none ${
                  monthError ? "border-red-500" : "border-gray-300"
                }`}
                type="number"
                placeholder="MM"
                value={getMonth}
                onChange={handleMonthChange}
                min={1}
                max={12}
              />
              <div className="h-6 flex items-start">
                {(monthError || emptyError) && (
                  <span className="text-red-500 text-sm">{errorMsg}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-md font-semibold">YEAR</label>
              <input
                required
                className={`border p-2 rounded-lg w-full outline-none appearance-none ${
                  yearError ? "border-red-500" : "border-gray-300"
                }`}
                type="number"
                placeholder="YYYY"
                value={getYear}
                onChange={handleYearChange}
              />
              <div className="h-6 flex items-start">
                {(yearError || emptyError) && (
                  <span className="text-red-500 text-sm">{errorMsg}</span>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center md:justify-end">
            <div className="absolute w-full h-px bg-gray-200 "></div>
            <button
              className="z-10 w-12 h-12 p-3 rounded-full flex items-center justify-center cursor-pointer bg-[hsl(259,100%,65%)] hover:bg-black lg:w-16 lg:h-16"
              onClick={() => calculateAge(getDate, getMonth, getYear)}
            >
              <img src="/assets/icon-arrow.svg" alt="arrow icon" />
            </button>
          </div>

          <div className="flex flex-col items-start font-bold gap-4 text-4xl lg:gap-6 lg:text-6xl md:p-6">
            <span className="flex gap-2 items-center">
              <span className="text-[#854dff]  ">{calYears || "- -"}</span>
              Years
            </span>

            <span className="flex gap-2 items-center">
              <span className="text-[#854dff]">{calMonths || "- -"}</span>
              Months
            </span>

            <span className="flex gap-2 items-center">
              <span className="text-[#854dff]">{calDays || "- -"}</span>
              Days
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainAge;
