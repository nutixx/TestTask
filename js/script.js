const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('.spinBtn');
const drumItems = [
  { id: 1, value: 'iPhone' },
  { id: 2, value: 'iPad' },
  { id: 3, value: 'MacBook' },
  { id: 4, value: 'Apple Watch' },
  { id: 5, value: 'AirPods' },
  { id: 6, value: 'iMac' },
  { id: 7, value: 'Cash' },
  { id: 8, value: 'Apple Vision' },
  // { id: 9, value: 'Cash' },
  // { id: 10, value: 'Apple Vision' },
  // { id: 11, value: 'iPhone' },
  // { id: 12, value: 'iPad' },
  // { id: 13, value: 'MacBook' },
  // { id: 14, value: 'Apple Watch' },
  // { id: 15, value: 'AirPods' },
  // { id: 16, value: 'iMac' },
  // { id: 17, value: 'Cash' },
  // { id: 18, value: 'Apple Vision' },
  // { id: 19, value: 'Cash' },
  // { id: 20, value: 'Apple Vision' },
];

const sectorAngle = 360 / drumItems.length

const spinTime = 2;
setSpinTime(spinTime);

function setSpinTime(seconds) {
  wheel.style.transition = `transform ${seconds}s ease-in-out`;
}

function segmentCreator(value,) {
  const segment = document.createElement('div');
  segment.classList.add('segment');

  const span = document.createElement('span');
  span.textContent = value;

  segment.appendChild(span);

  const size = 100 / drumItems.length * 5;
  const clipPathValue = `polygon(0 0, ${size}% 0, 100% 100%, 0 ${size}%)`;
  segment.style.clipPath = clipPathValue;

  wheel.appendChild(segment);
}

drumItems.forEach((item) => {
  segmentCreator(item.value);
});

const segments = document.querySelectorAll('.segment');

for (let i = 0; i < drumItems.length; i++) {
  segments[i].style.transform = `rotate(calc(${135}deg + (${sectorAngle}deg * ${i})))`;
}

let spinDegrees = 0;

function randomizeWin() {
  return Math.floor(Math.random() * (drumItems.length)) + 1;
}

function calculateWinningSector(sector, i) {
  spinDegrees = (i + sector * sectorAngle - sectorAngle);
  console.log(sector, spinDegrees);
  iGlobal += 360 * 5;
}

let iGlobal = 360 * 5;
let isSpinning = false;

spinBtn.onclick = function () {
  if (isSpinning) return;
  isSpinning = true;

  winPosition = randomizeWin();
  calculateWinningSector(winPosition, iGlobal);
  wheel.style.transform = `rotate(${-(spinDegrees)}deg)`;

  setTimeout(() => {
    isSpinning = false;
    alert(`Виграшний приз: ${drumItems[winPosition - 1].value}`);
  }, spinTime * 1000);
}