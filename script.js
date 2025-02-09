const letterboxes = document.querySelectorAll('.letterbox');

letterboxes.forEach((letterbox, index) => {
  const letter = letterbox.querySelector('h1');
  const fullName = document.createElement('span');
  fullName.classList.add('full-name');
  fullName.textContent = ['essica', 'race', 'ogerson', 'eromella'][index];
  fullName.style.opacity = 0;
  letterbox.appendChild(fullName);

  setTimeout(() => {
    letter.style.opacity = 1;
  }, index * 1000); // Adjust delay between each letter (1 second in this example)

  letterbox.addEventListener('mouseover', () => {
    fullName.style.opacity = 1;
  });

  letterbox.addEventListener('mouseout', () => {
    fullName.style.opacity = 0;
  });
});

// function updateClock() {
//   const now = new Date();
//   const hours = now.getHours().toString().padStart(2, '0');
//   const minutes = now.getMinutes().toString().padStart(2, '0');
//   const seconds = now.getSeconds().toString().padStart(2, '0');
//   const date = now.toLocaleDateString();
  
//   document.getElementById('date').textContent = date;
//   document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
// }
// setInterval(updateClock, 1000);
// updateClock(); // Initialize clock on load

function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let angle = (totalSeconds / 86400) * 360;
  document.getElementById('hour-hand').style.transform = `rotate(${angle}deg)`;
}
setInterval(updateClock, 1000);
updateClock();

const fortunes = [
  "Your heart is a garden of joy.",
  "Stars shine brighter when you smile.",
  "Wander where the magic lives.",
  "Your kindness lights up the world.",
  "You are a dream woven from moonbeams.",
  "The universe dances in your eyes.",
  "Your laughter is a melody of happiness.",
  "A sprinkle of stardust follows your path.",
  "Embrace the wonder of today.",
  "You are the rainbow after the storm.",
  "Magic is in the little things you do.",
  "Your spirit is a symphony of light.",
  "Every step you take is a graceful dance.",
  "The wind whispers secrets just for you.",
  "Your dreams are the seeds of future wonders.",
  "You are the sparkle in the twilight.",
  "Joy follows you like a faithful friend.",
  "Your words paint colors in the air.",
  "You bring warmth to the coldest days.",
  "Believe in the magic that is you."
];

document.getElementById("magicButton").addEventListener("click", function() {
  const fortuneDisplay = document.getElementById("fortuneDisplay");
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  // Reset the display
  fortuneDisplay.textContent = "";
  fortuneDisplay.classList.remove("shimmer");

  // Update the fortune and apply the shimmer effect
  setTimeout(() => {
      fortuneDisplay.textContent = randomFortune;
      fortuneDisplay.classList.add("shimmer");
  }, 10);
});

function calculateLifePathNumber() {
  // Get the user's inputs
  const firstName = document.getElementById('firstName').value.toUpperCase();
  const lastName = document.getElementById('lastName').value.toUpperCase();
  const birthYear = parseInt(document.getElementById('birthYear').value);
  const birthMonth = parseInt(document.getElementById('birthMonth').value);
  const birthDay = parseInt(document.getElementById('birthDay').value);

  // Function to calculate the sum of digits until a single digit is obtained
  function reduceToSingleDigit(number) {
      while (number > 9) {
          number = number
              .toString()
              .split('')
              .reduce((acc, digit) => acc + parseInt(digit), 0);
      }
      return number;
  }

  // Calculate the sum of birth year, month, and day
  const yearSum = reduceToSingleDigit(birthYear);
  const monthSum = reduceToSingleDigit(birthMonth);
  const daySum = reduceToSingleDigit(birthDay);

  // Sum these values and reduce to a single digit
  const lifePathNumber = reduceToSingleDigit(yearSum + monthSum + daySum);

  // Display the result
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `Your Life Path Number is: <strong>${lifePathNumber}</strong>`;
}
