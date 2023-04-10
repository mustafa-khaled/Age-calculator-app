// Inputs
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// Data values
const dayValue = document.getElementById("day-value");
const monthValue = document.getElementById("month-value");
const yearValue = document.getElementById("year-value");

// Errors
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

// Labels
const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

// Button
const btn = document.getElementById("btn");

function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Get the current date
const currentDate = new Date();

// Validate inputs on button click
btn.addEventListener("click", function () {
  const year = parseInt(yearInput.value);
  const month = parseInt(monthInput.value);
  const day = parseInt(dayInput.value);
  let error = false;

  // Validate year input
  if (isNaN(year) || year > currentDate.getFullYear() || year === 0) {
    showError(yearInput, yearLabel, yearError);
    error = true;
  } else {
    hideError(yearInput, yearLabel, yearError);
  }

  // Validate month input
  if (isNaN(month) || month < 1 || month > 12) {
    showError(monthInput, monthLabel, monthError);
    error = true;
  } else {
    hideError(monthInput, monthLabel, monthError);
  }

  // Validate day input
  if (isNaN(day) || day < 1 || day > 31) {
    showError(dayInput, dayLabel, dayError);
    error = true;
  } else {
    hideError(dayInput, dayLabel, dayError);
  }

  // Calculate age if inputs are valid
  if (!error && isValidDate(year, month, day)) {
    const birthDate = new Date(year, month - 1, day);
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Update the UI
    yearValue.textContent = Math.floor(ageInYears);
    const remainingMonths = (ageInYears - Math.floor(ageInYears)) * 12;
    monthValue.textContent = Math.floor(remainingMonths);
    const remainingDays = (remainingMonths - Math.floor(remainingMonths)) * 30;
    dayValue.textContent = Math.floor(remainingDays);
  } else {
    // Clear age display
    yearValue.textContent = "--";
    monthValue.textContent = "--";
    dayValue.textContent = "--";
  }
});

function showError(input, label, errorText) {
  input.style.borderColor = "hsl(0, 100%, 67%)";
  label.style.color = "hsl(0, 100%, 67%)";
  errorText.style.display = "block";
}

function hideError(input, label, errorText) {
  input.style.borderColor = "hsl(0, 0%, 86%)";
  label.style.color = "hsl(0, 1%, 44%)";
  errorText.style.display = "none";
}
