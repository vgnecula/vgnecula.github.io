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

function drawTextWithCursor(text, x, y, opacity, targetElement, cursorVisible) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = '20px Courier New';
    ctx.fillText(text + (cursorVisible ? '|' : ''), x, y);
}

function animateTextWithCursor(text, x, y, opacity, targetElement) {
    let index = 0;
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawTextWithCursor(text.substring(0, index), x, y, opacity, targetElement, cursorVisible);
            cursorVisible = !cursorVisible;
            index++;
            setTimeout(typeNextLetter, 100); // Adjust the typing speed by changing the timeout
        }
    }

    // Display the target element after a delay
    setTimeout(() => {
        targetElement.style.display = 'block';
        typeNextLetter();
    }, 1000); // Adjust the delay as needed
}

// Start typing animation for the name with cursor
animateTextWithCursor(nameText, canvas.width / 2 - 80, canvas.height / 2 - 20, 0, nameElement);

// Start typing animation for the subtitle with cursor after a delay
setTimeout(() => {
    animateTextWithCursor(subtitleText, canvas.width / 2 - 80, canvas.height / 2 + 20, 0, subtitleElement);
}, 1500); // Adjust the delay between animations as needed
