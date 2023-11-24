// script.js
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const nameText = "Vladimir Necula";
const subtitleText = "Student @ Lafayette College";

// Set initial opacity to 0
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');
nameElement.style.opacity = 0;
subtitleElement.style.opacity = 0;

function drawText(text, x, y, opacity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = '20px Courier New';
    ctx.fillText(text, x, y);
}

function animateText(text, x, y, opacity, targetElement) {
    let index = 0;

    function typeNextLetter() {
        if (index <= text.length) {
            drawText(text.substring(0, index), x, y, opacity);
            index++;
            setTimeout(typeNextLetter, 100); // Adjust the typing speed by changing the timeout
        }
    }

    // Display the target element immediately
    targetElement.style.display = 'block';

    // Start typing animation after a delay
    setTimeout(() => {
        typeNextLetter();
    }, 1000); // Adjust the delay as needed
}

// Start typing animation for the name
animateText(nameText, canvas.width / 2 - 80, canvas.height / 2 - 20, 0, nameElement);

// Start typing animation for the subtitle after a delay
setTimeout(() => {
    animateText(subtitleText, canvas.width / 2 - 80, canvas.height / 2 + 20, 0, subtitleElement);
}, 1500); // Adjust the delay between animations as needed
