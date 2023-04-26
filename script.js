const sectionHistory = document.querySelector(".workouts-history");
const sectionTypes = document.querySelector(".workouts-types");
const sectionExcercises = document.querySelector(".workouts-excercises");
const sectionTypesCloseBtn = document.querySelector("#close-typ");
const sectionExcercisesCloseBtn = document.querySelector("#close-exc");
const workoutsHistoryContainer = document.querySelector("#history");
const workoutsTypesContainer = document.querySelector("#workouts");
const excercisesContainer = document.querySelector("#excercises");
const addWorkoutBtn = document.querySelector(".add");
const saveWorkoutBtn = document.querySelector(".save");

const workouts = [
  {
    id: 1,
    name: "Push A",
    excercises: [
      {
        name: "Bench Press",
        sets: 3,
      },
      {
        name: "Incline DB Press",
        sets: 3,
      },
      {
        name: "Low-to-high Cable Flyes",
        sets: 3,
      },
      {
        name: "Barbell Overhead Press",
        sets: 3,
      },
      {
        name: "Cable Laterals",
        sets: 3,
      },
      {
        name: "Behind-the-head Extensions",
        sets: 3,
      },
      {
        name: "One-arm Overhead Extensions",
        sets: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Pull A",
    excercises: [
      {
        name: "Bent-over Row",
        sets: 3,
      },
      {
        name: "Chin-up",
        sets: 3,
      },
      {
        name: "Seated CNG Cable Row",
        sets: 3,
      },
      {
        name: "Face Pulls",
        sets: 3,
      },
      {
        name: "Barbell Shrugs",
        sets: 3,
      },
      {
        name: "Pinwheel Curls",
        sets: 3,
      },
      {
        name: "Incline DB Curls",
        sets: 3,
      },
    ],
  },
  {
    id: 3,
    name: "Legs A",
    excercises: [
      {
        name: "Squats",
        sets: 3,
      },
      {
        name: "Romanian Deadlift",
        sets: 5,
      },
      {
        name: "Leg Extensions",
        sets: 3,
      },
      {
        name: "Lying Leg Curls",
        sets: 3,
      },
      {
        name: "Standing Calf Raises",
        sets: 3,
      },
      {
        name: "Seated Calf Raises",
        sets: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Push B",
    excercises: [
      {
        name: "Incline Press",
        sets: 3,
      },
      {
        name: "Flat DB Press",
        sets: 3,
      },
      {
        name: "Incline Cable Flyes",
        sets: 3,
      },
      {
        name: "Machine Laterals",
        sets: 3,
      },
      {
        name: "Dips",
        sets: 3,
      },
      {
        name: "French Press",
        sets: 3,
      },
    ],
  },
  {
    id: 5,
    name: "Pull B",
    excercises: [
      {
        name: "Pull-ups",
        sets: 3,
      },
      {
        name: "One-arm DB Rows",
        sets: 3,
      },
      {
        name: "CNG Pulldowns",
        sets: 3,
      },
      {
        name: "Reverse Flyes",
        sets: 3,
      },
      {
        name: "DB Shrugs",
        sets: 3,
      },
      {
        name: "Alternating DB Curls",
        sets: 3,
      },
      {
        name: "Reverse Preacher Curls",
        sets: 3,
      },
    ],
  },
  {
    id: 6,
    name: "Legs B",
    excercises: [
      {
        name: "Deadlift",
        sets: 5,
      },
      {
        name: "Leg Press",
        sets: 5,
      },
      {
        name: "Seated Leg Curls",
        sets: 3,
      },
      {
        name: "Machine Hack Squats",
        sets: 3,
      },
      {
        name: "Standing Calf Raises",
        sets: 3,
      },
      {
        name: "Seated Calf Raises",
        sets: 3,
      },
    ],
  },
];

let history = [];

const generateHistoryDivs = function (workouts) {
  workoutsHistoryContainer.innerHTML = "";
  workouts.forEach((workout) => {
    const content = `<div class="workout" data-code="${workout.code}">
    <span class="name">${workout.name}</span>
    <span class="date">${workout.date}</span>
    <div class="button-wrapper"><button class="delete fa-solid fa-xmark"></button>
    <button class="edit fa-solid fa-pen"></button></div>
</div>`;
    workoutsHistoryContainer.innerHTML =
      content + workoutsHistoryContainer.innerHTML;
  });
};

const init = function () {
  const jsonString = localStorage.getItem("history");
  if (jsonString) {
    const array = JSON.parse(jsonString);
    history = array;
    generateHistoryDivs(array);
  }
};

init();

const saveInLocalStorage = function () {
  if (localStorage.getItem("history")) {
    localStorage.removeItem("history");
  }
  localStorage.setItem("history", JSON.stringify(history));
};

const generateWorkoutType = function (workout) {
  const content = `<div class="workout" data-index="${workout.id}">
    <span class="name">${workout.name}</span>
    <span class="excercises-number">${Object.keys(workout.excercises).length} ${
    Object.keys(workout.excercises).length === 1 ? "excercise" : "excercises"
  }</span>
    <div class="button-wrapper"><button class="show-excercises fa-regular fa-hand-pointer"></button></div>
</div>`;
  workoutsTypesContainer.innerHTML += content;
};

workouts.forEach((workout) => {
  generateWorkoutType(workout);
});

const generateSets = function (excercise) {
  const content = `<div class="set">
    <input class="repetitions input" type="number" name="repetitions" min="1" max="999" value="1">
    <span>x</span>
    <input class="weight input" type="number" name="weight" min="0" max="999" value="1">kg
</div>`;
  return content.repeat(excercise.sets);
};

const generateExcercise = function (excercise) {
  const content = `<div class="excercise">
    <div class="excercise-details">
        <span class="name">${excercise.name}</span>
        <span class="set-number">${excercise.sets} sets</span>
        <button class="show-repetitions fa-regular fa-square-caret-down"></button>
    </div>
    <div class="sets hide">
         ${generateSets(excercise)}
    </div>
</div>`;
  excercisesContainer.innerHTML += content;
};

const hide = function (section) {
  section.classList.add("hide");
};

const show = function (section) {
  section.classList.remove("hide");
};

const displayExcercises = function (workout) {
  excercisesContainer.innerHTML = "";
  for (const [key, value] of Object.entries(workout.excercises)) {
    generateExcercise(value);
  }
  hide(sectionTypes);
  show(sectionExcercises);
};

const displayData = function (workout) {
  if (workout === undefined) return;
  const excercises = excercisesContainer.querySelectorAll(".excercise");
  excercises.forEach((excercise) => {
    const name = excercise.querySelector(".name").textContent;
    const historyData = workout.excercises.find(
      (el) => el.name === name
    ).numbers;
    if (historyData === undefined) return;
    const sets = excercise.querySelectorAll(".set");
    sets.forEach((set, i) => {
      if (historyData[i] === undefined) return;
      set.querySelector(".repetitions").value = historyData[i][0];
      set.querySelector(".weight").value = historyData[i][1];
    });
  });
};

const addNewWorkout = function (workout) {
  const newWorkout = workout;
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate();
  newWorkout.date = `${day}.${month}.${year}`;
  newWorkout.code = `${generateCode()}`;
  const lastWorkouType = history.findLast((el) => el.id === workout.id);
  history.push(newWorkout);
  generateHistoryDivs(history);
  displayExcercises(newWorkout);
  excercisesContainer.dataset.code = newWorkout.code;
  displayData(lastWorkouType);
};

const selectWorkout = function (e) {
  if (e.target.classList.contains("show-excercises")) {
    excercisesContainer.innerHTML = "";
    const id = Number(e.target.closest(".workout").dataset.index);
    const workout = workouts.find((el) => el.id === id);
    addNewWorkout(JSON.parse(JSON.stringify(workout)));
    workoutsTypesContainer.removeEventListener("click", selectWorkout);
  }
};

sectionTypesCloseBtn.addEventListener("click", () => {
  workoutsTypesContainer.removeEventListener("click", selectWorkout);
  hide(sectionTypes);
  show(sectionHistory);
});

addWorkoutBtn.addEventListener("click", () => {
  hide(sectionHistory);
  show(sectionTypes);
  workoutsTypesContainer.addEventListener("click", selectWorkout);
});

const editWorkout = function (element) {
  if (element.classList.contains("edit")) {
    hide(sectionHistory);
    const code = element.closest(".workout").dataset.code;
    const workout = history.find((el) => el.code === code);
    excercisesContainer.dataset.code = workout.code;
    displayExcercises(workout);
    displayData(workout);
  }
};

const deleteWorkout = function (element) {
  if (element.classList.contains("delete")) {
    excercisesContainer.innerHTML = "";
    const code = element.closest(".workout").dataset.code;
    const indexOfElement = history.indexOf(
      history.find((el) => el.code === code)
    );
    history.splice(indexOfElement, 1);
    saveInLocalStorage();
    generateHistoryDivs(history);
  }
};

workoutsHistoryContainer.addEventListener("click", (e) => {
  editWorkout(e.target);
  deleteWorkout(e.target);
});

excercisesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-repetitions")) {
    e.target
      .closest(".excercise-details")
      .nextElementSibling.classList.toggle("hide");
    e.target.classList.toggle("fa-rotate-180");
  }
});

const generateCode = function () {
  return Math.random().toString(36).substring(2, 12);
};

const saveExcercise = function (excercise) {
  hide(sectionExcercises);
  show(sectionHistory);
  excercisesContainer.innerHTML = "";
  const code = excercisesContainer.dataset.code;
  const name = excercise.querySelector(".name").textContent;
  const targetWorkout = history.find((el) => el.code === code);
  const targetExcercise = targetWorkout.excercises.find(
    (el) => el.name === name
  );

  targetExcercise.numbers = [];
  for (const set of excercise.lastElementChild.children) {
    const repetitions = set.firstElementChild.value;
    const weight = set.lastElementChild.value;

    if (!targetExcercise.hasOwnProperty("numbers")) {
      targetExcercise.numbers = [];
    }
    targetExcercise.numbers.push([repetitions, weight]);
  }
};

const saveWorkout = function () {
  for (const excercise of [...excercisesContainer.children]) {
    saveExcercise(excercise);
    saveInLocalStorage();
  }
};

saveWorkoutBtn.addEventListener("click", saveWorkout);

sectionExcercisesCloseBtn.addEventListener("click", () => {
  hide(sectionExcercises);
  show(sectionHistory);
});

const changeInputColor = function (e) {
  if (e.target.classList.contains("input")) {
    e.target.addEventListener("input", () => {
      e.target.style.backgroundColor = "#98fb98";
    });
  }
};

excercisesContainer.addEventListener("click", changeInputColor);
