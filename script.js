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

function drawCursor(x, y, visible) {
    if (visible) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y - 15, 2, 20); // Adjust cursor size and position as needed
    }
}

function animateTextWithCursor(text, x, y, opacity, targetElement) {
    let index = 0;
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawText(text.substring(0, index), x, y, opacity);
            cursorVisible = !cursorVisible;
            drawCursor(x + ctx.measureText(text.substring(0, index)).width, y, cursorVisible);
            index++;
            requestAnimationFrame(typeNextLetter); // Use requestAnimationFrame for smoother animation
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
}, 3000); // Adjust the delay between animations as needed
