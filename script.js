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

const completeButtons = document.querySelectorAll(".complete-btn");
const completedTaskElement = document.querySelector(".completed-task");
const taskCompletedList = document.querySelector(".task-completed ul");

let completedCount = parseInt(completedTaskElement.textContent) || 0;

completeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.disabled) {
      const taskCard = button.closest(".task-card");
      const taskTitle = taskCard.querySelector(".task-title").textContent;

      button.disabled = true;
      button.textContent = "Completed";
      button.classList.remove("bg-[#3752FD]");
      button.classList.add("bg-gray-400");

      completedCount += 1;
      completedTaskElement.textContent = completedCount;

      const listItem = document.createElement("li");
      listItem.textContent = `${taskTitle} - Completed on ${new Date().toLocaleDateString()}`;
      listItem.classList.add("py-2", "text-md", "text-black", "font-medium");
      taskCompletedList.appendChild(listItem);
    }
  });
});

const clearButton = document.querySelector(".clear-btn");

function clearHistory() {
  while (taskCompletedList.firstChild) {
    taskCompletedList.removeChild(taskCompletedList.firstChild);
  }
  const emptyItem = document.createElement("li");
  taskCompletedList.appendChild(emptyItem);
}

clearButton.addEventListener("click", clearHistory);
