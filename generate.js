export const generateHistoryDivs = function (workouts, container) {
  container.innerHTML = "";
  workouts.forEach((workout) => {
    const content = `
      <div class="workout" data-code="${workout.code}">
        <span class="name">${workout.name}</span>
        <span class="date">${workout.date}</span>
        <div class="button-wrapper"><button class="delete fa-solid fa-xmark"></button>
        <button class="edit fa-solid fa-pen"></button></div>
      </div>`;
    container.innerHTML = content + container.innerHTML;
  });
};

export const generateWorkoutType = function (workout, container) {
  const content = `
    <div class="workout" data-index="${workout.id}">
      <span class="name">${workout.name}</span>
      <span class="excercises-number">
      ${Object.keys(workout.excercises).length} ${
    Object.keys(workout.excercises).length === 1 ? "excercise" : "excercises"
  }</span>
    <div class="button-wrapper"><button class="show-excercises fa-solid fa-play"></button></div>
</div>`;
  container.innerHTML += content;
};

export const generateSets = function (excercise) {
  const content = `
    <div class="set">
      <input class="repetitions input" type="number" name="repetitions" min="0" placeholder="reps">
      <span>x</span>
      <input class="weight input" type="number" name="weight" min="0" placeholder="weigth">kg
  </div>`;
  return content.repeat(excercise.sets);
};

export const generateExcercise = function (excercise, container) {
  const content = `
    <div class="excercise">
      <div class="excercise-details">
          <span class="name">${excercise.name}</span>
          <span class="set-number">${excercise.sets} sets</span>
          <button class="show-repetitions fa-regular fa-square-caret-down"></button>
      </div>
      <div class="sets hide">
           ${generateSets(excercise)}
      </div>
    </div>`;
  container.innerHTML += content;
};

export const generateCode = function () {
  return Math.random().toString(36).substring(2, 12);
};
