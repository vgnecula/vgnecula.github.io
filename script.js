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

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawText(text, x, y, opacity) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = '20px Courier New';
    ctx.fillText(text, x, y);
}

function drawCursor(x, y, visible) {
    if (visible) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y - 15, 2, 20);
    }
}

function animateTextWithCursor(text, x, y, opacity, targetElement) {
    let index = 0;
    let cursorX = x;
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawText(text.substring(0, index), x, y, opacity);
            drawCursor(cursorX, y, cursorVisible);
            cursorVisible = !cursorVisible;
            cursorX += ctx.measureText(text[index]).width + 10; // Adjusted for better spacing
            index++;
            setTimeout(typeNextLetter, 150); // Adjust the typing speed by changing the timeout
        }
    }

    // Display the target element after a delay
    setTimeout(() => {
        targetElement.style.display = 'block';
        typeNextLetter();
    }, 1000);
}

// Start typing animation for the name with cursor
animateTextWithCursor(nameText, canvas.width / 2 - 80, canvas.height / 2 - 20, 0, nameElement);

// Start typing animation for the subtitle with cursor after a delay
setTimeout(() => {
    animateTextWithCursor(subtitleText, canvas.width / 2 - 80, canvas.height / 2 + 20, 0, subtitleElement);
}, 3000);
