// scripts.js

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below
const createArray = (length) => {
  const result = [];

  for (let q = 0; q < length; q++) {
    result.push(q);
  }
  return result;
};
const createData = () => {
  const current = new Date();
  current.setDate(1);

  const startDay = current.getDay();
  const daysInMonth = getDaysInMonth(current);
  const weeks = createArray(5);
  const days = createArray(7);

  for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
    let value = {
      week: weekIndex + 1,
      days: [],
    };

    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const day = weekIndex * 7 + dayIndex - startDay + 1;
      const isValid = day > 0 && day <= daysInMonth;
      let classString = "table__cell";

      if (dayIndex === 0 || dayIndex === 6) {
        classString += "table__cell_weekend";
      }
      value.days.push({
        dayOfWeek: dayIndex + 1,
        value: isValid ? day : "",
        class: classString,
      });
    }
    weeks[weekIndex] = value;
  }
  return weeks;
};

const addCell = function (existing, classString, value) {
  return `${existing}<td class="${classString}">${value}</td>`;
};

const createHtml = function (data) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    const week = data[i];
    let inner = "";
    inner = addCell(
      inner,
      "table__cell table__cell_sidebar",
      `Week ${week.week}`
    );
    for (let j = 0; j < week.days.length; j++) {
      const day = week.days[j];
      let classString = "table__cell";
      const currentDate = new Date();
      const isToday =
        currentDate.getDate() === day.value &&
        currentDate.getMonth() === currentDate.getMonth();
      const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7;
      const isAlternate = week.week % 2 === 0;
      if (isToday) {
        classString = `${classString} table__cell_today`;
      }
      if (isWeekend) {
        classString = `${classString} table__cell_weekend`;
      }
      if (isAlternate) {
        classString = `${classString} table__cell_alternate`;
      }
      inner = addCell(inner, classString, day.value || "");
    }
    result += `<tr>${inner}</tr>`;
  }
  return result;
};

// Only edit above

const current = new Date();
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);


/* BUG FIXES:
 * 
 * created a 'result' (numeric) array using length as its parameter where counting starts from 0 up to any number (q)
 * 'createData' object generates updated data for the calendar (uses current date to determine when first day of month will be and number of days in that month)
 * creates two(2) separate arrays, one for number of weeks and another for number of days respectively
 * created loop that goes through each week of the month and day of the week to calculate day number based on its week and starting day
 * checks if days are valid days of the current month
 * created object with information about each day
 * assigns class to day based on whether its today or during the weekend
 * pushes day object to list of days in its current week
 * loops process for all weeks and days
 * 'addCell' function uses existing html code, class names, and values to consolidates them to create table cell with the given class and value
 * 'createHtml' function generates the HTML code for calendar using data obtained earlier
 * loops through each week and day, and creates a table cell with appropriate class and value for each day
 * combines all table cells into rows
 * consolidates all rows to create final html code for calendar
 * 
*/