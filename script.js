const workoutsHistoryContainer = document.querySelector("#history");
const workoutsTypesContainer = document.querySelector("#workouts");
const excercisesContainer = document.querySelector("#excercises");
const addWorkoutBtn = document.querySelector(".add");

const workouts = [
  {
    id: 1,
    name: "Push",
    excercises: {
      deadlift: {
        name: "Deadlift",
        sets: 2,
        weight: [],
      },
      squat: {
        name: "Squat",
        sets: 2,
        weight: [],
      },
    },
  },
  {
    id: 2,
    name: "Pull",
    excercises: {
      deadlift: {
        name: "Deadlift",
        sets: 4,
        weight: [],
      },
      squat: {
        name: "Squat",
        sets: 3,
        weight: [],
      },
    },
  },
];

const history = [];

const generateWorkoutType = function (workout) {
  const content = `<div class="workout" data-index="${workout.id}">
    <span class="name">${workout.name}</span>
    <span class="excercises-number">${Object.keys(workout.excercises).length} ${
    Object.keys(workout.excercises).length === 1 ? "excercise" : "excercises"
  }</span>
    <div class="button-wrapper"><button class="show-excercises">></button></div>
</div>`;
  workoutsTypesContainer.innerHTML += content;
};

workouts.forEach((workout) => {
  generateWorkoutType(workout);
});

const generateSets = function (number) {
  const content = `<div class="set">
    <input class="weight" type="number" name="weight" min="0.1" max="999">
    <span>x</span>
    <input class="repetitions" type="number" name="repetitions" min="1" max="999">
</div>`;
  return content.repeat(number);
};

const generateExcercise = function (excercise) {
  const content = `<div class="excercise"">
    <div class="excercise-details">
        <span class="name">${excercise.name}</span>
        <span class="set-number">${excercise.sets} sets</span>
        <div class="button-wrapper"><button class="show-repetitions">></button></div>
    </div>
    <div class="sets hide">
         ${generateSets(excercise.sets)}
    </div>
</div>`;
  excercisesContainer.innerHTML += content;
};

const displayExcercises = function (workout) {
  for (const [key, value] of Object.entries(workout.excercises))
    generateExcercise(value);
};

excercisesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-repetitions")) {
    e.target
      .closest(".excercise-details")
      .nextElementSibling.classList.toggle("hide");
  }
});

const generateHistoryDiv = function (workout) {
  const content = `<div class="workout">
      <span class="name">${workout.name}</span>
      <span class="date">${workout.date}</span>
      <div class="button-wrapper"><button class="delete">X</button></div>
  </div>`;
  workoutsHistoryContainer.innerHTML += content;
};

const addNewWorkout = function (workout) {
  const newWorkout = Object.create(workout);
  var date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate();
  newWorkout.date = `${day}.${month}.${year}`;
  history.push(newWorkout);
  console.log(workout);
  generateHistoryDiv(newWorkout);
  displayExcercises(newWorkout);
};

const selectWorkout = function (e) {
  if (e.target.classList.contains("show-excercises")) {
    excercisesContainer.innerHTML = "";
    const id = Number(e.target.closest(".workout").dataset.index);
    const workout = workouts.find((el) => el.id === id);
    addNewWorkout(workout);
    workoutsTypesContainer.removeEventListener("click", selectWorkout);
    console.log("yyy");
  }
};

addWorkoutBtn.addEventListener("click", () => {
  console.log("xxx");
  workoutsTypesContainer.addEventListener("click", selectWorkout);
});
