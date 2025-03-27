/* To main.html */

const secondPage = document.querySelector(".second-page");

secondPage.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "./main.html";
});

/* Theme Change */

const themeBtn = document.querySelector(".theme-btn");
const body = document.body;

const colors = [
  "#F4F7FF",
  "#FFD700",
  "#FF6347",
  "#6A5ACD",
  "#2E8B57",
  "#FF69B4",
  "#20B2AA",
];
let currentColorIndex = 0;

themeBtn.addEventListener("click", function () {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  body.style.backgroundColor = colors[currentColorIndex];
});

/* Current Date and Time */

function updateDateTime() {
  const dateTime = document.querySelector(".date-time");
  const now = new Date();

  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);

  const [weekday, month, day, year] = dateString.split(" ");
  const formattedDate = `${weekday.toUpperCase()}, ${month.toUpperCase()} ${day}, ${year}`;

  dateTime.innerHTML = `
            <p>${weekday.toUpperCase()}</p>
            <h2 class="text-xl font-semibold">${month.toUpperCase()} ${day} ${year}</h2>
        `;
}

updateDateTime();

/* Task Completion Section */

const completeButtons = document.querySelectorAll(".complete-btn");
const completedTaskElement = document.querySelector(".completed-task");
const taskCompletedList = document.querySelector(".task-completed ul");
const assignedTasks = document.querySelector(".assigned-tasks");

let completedCount = parseInt(completedTaskElement.textContent) || 0;
let assignedTasksCount = parseInt(assignedTasks.textContent) || 0;

completeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.disabled) {
      const taskCard = button.closest(".task-card");
      const taskTitle = taskCard.querySelector(".task-title").textContent;

      button.disabled = true;
      button.textContent = "Completed";
      button.classList.remove("bg-[#3752FD]");
      button.classList.add("bg-gray-400");

      alert("Board Updated Successfully");

      completedCount += 1;
      completedTaskElement.textContent = completedCount;

      assignedTasksCount -= 1;
      assignedTasks.textContent = assignedTasksCount;

      const allDisabled = [...completeButtons].every(
        (button) => button.disabled
      );
      if (allDisabled) {
        alert("Congrats!! All tasks are finished!!!");
      }

      const listItem = document.createElement("li");
      listItem.textContent = `You have completed the task ${taskTitle} - Completed at ${new Date().toLocaleTimeString()}`;
      listItem.classList.add(
        "py-2",
        "px-1",
        "mt-2",
        "rounded-md",
        "text-md",
        "text-black",
        "font-medium",
        "bg-[#F4F7FF]"
      );
      taskCompletedList.appendChild(listItem);
    }
  });
});

/* Clear History */

const clearButton = document.querySelector(".clear-btn");

function clearHistory() {
  taskCompletedList.innerHTML = "";
}

clearButton.addEventListener("click", clearHistory);
