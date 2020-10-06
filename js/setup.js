'use strict';

const setup = document.querySelector(`.setup`);
const similar = document.querySelector(`.setup-similar`);
const WIZARD_COUNT = 4;
const template = document.querySelector(`#similar-wizard-template`);
const templateContent = template.content.querySelector(`.setup-similar-item`);

// setup.classList.remove(`hidden`);
similar.classList.remove(`hidden`);

const wizardName = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const wizardSurname = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const wizardColor = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const wizardEyes = [`black`, `red`, `blue`, `yellow`, `green`];

const getRandom = (array) => {
  const random = Math.floor(Math.random() * array.length);

  return array[random];
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

function generateWizards(name, surname, color, eyes) {
  const wizard = {
    name: `${getRandom(name)} ${getRandom(surname)}`,
    coatColor: getRandom(color),
    eyesColor: getRandom(eyes)
  };

  return wizard;
}

const getWizardClone = (data) => {
  let wizardClone = templateContent.cloneNode(true);

  wizardClone.querySelector(`.wizard-coat`).style.fill = data.coatColor;
  wizardClone.querySelector(`.wizard-eyes`).style.fill = data.eyesColor;
  wizardClone.querySelector(`.setup-similar-label`).textContent = data.name;

  return wizardClone;
};

const drawWizards = () => {
  const wizardContainer = document.querySelector(`.setup-similar-list`);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARD_COUNT; i++) {
    const wizardData = generateWizards(wizardName, wizardSurname, wizardColor, wizardEyes);
    const wizardClone = getWizardClone(wizardData);

    fragment.appendChild(wizardClone);
  }

  wizardContainer.appendChild(fragment);

};

drawWizards();

const setupOpen = document.querySelector(`.setup-open`);
const setupUserOpen = setupOpen.querySelector(`.setup-open-icon`);
const setupClose = setup.querySelector(`.setup-close`);

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};


const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupUserOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

const coatColorArray = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const eyesColorArray = [`black`, `red`, `blue`, `yellow`, `green`];
const fireballColorArray = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const player = document.querySelector(`.setup-player`);
let coatColor = player.querySelector(`.wizard-coat`);
let coatColorInput = player.querySelector(`input[name='coat-color']`);
let eyesColor = player.querySelector(`.wizard-eyes`);
let eyesColorInput = player.querySelector(`input[name='eyes-color']`);
let fireballColor = player.querySelector(`.setup-fireball-wrap`);
let fireballColorInput = player.querySelector(`input[name='fireball-color']`);

const paintWizard = (part, input, array) => {
  let color = getRandomElement(array);

  if (part.tagName === `use`) {
    part.style.fill = color;
  } else {
    part.style.background = color;
  }
  input.value = color;
};

coatColor.addEventListener(`click`, function () {
  paintWizard(coatColor, coatColorInput, coatColorArray);
});
eyesColor.addEventListener(`click`, function () {
  paintWizard(eyesColor, eyesColorInput, eyesColorArray);
});
fireballColor.addEventListener(`click`, function () {
  paintWizard(fireballColor, fireballColorInput, fireballColorArray);
});
