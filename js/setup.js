'use strict';

const setup = document.querySelector(`.setup`);
const similar = document.querySelector(`.setup-similar`);
const WIZARD_COUNT = 4;
const template = document.querySelector(`#similar-wizard-template`);
const templateContent = template.content.querySelector(`.setup-similar-item`);

setup.classList.remove(`hidden`);
similar.classList.remove(`hidden`);

const wizardName = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const wizardSurname = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const wizardColor = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const wizardEyes = [`black`, `red`, `blue`, `yellow`, `green`];

const getRandom = (array) => {
  const random = Math.floor(Math.random() * array.length);

  return array[random];
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
