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
const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const prevBtn = document.querySelector(".prev");
const monthEl = document.querySelector(".month");
const yearEl = document.querySelector(".year");
const nextBtn = document.querySelector(".next");
const weekDaysEl = document.querySelector(".week-days");
const daysEl = document.querySelector(".days");
const todayBtn = document.querySelector(".btn-today");
const selectedDateEl = document.querySelector(".selected-date");

const date = new Date();
const calendar = {
  today: date,
  selectedDate: date,
  month: date.getMonth(),
  year: date.getFullYear(),
};

const calendarProxy = new Proxy(calendar, {
  set: function (target, key, value) {
    if (key === "selectedDate") {
      target[key] = new Date(calendar.year, calendar.month, value);
      updateSelectedDate();
      return true;
    }

    target[key] = value;
    updateCalendar();
    calendar.selectedDate = new Date(
      calendar.year,
      calendar.month,
      calendar.today.getDate()
    );
    updateSelectedDate();
    return true;
  },
});
