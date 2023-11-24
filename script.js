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

function drawText(text, x, y, opacity, fontSize) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = `${fontSize}px 'Press Start 2P', cursive`;
    ctx.fillText(text, x, y);
}

function drawPixelatedCursor(x, y, visible) {
    if (visible) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y - 15, 2, 20);
        ctx.fillRect(x + 2, y - 15, 2, 20);
        ctx.fillRect(x + 4, y - 15, 2, 20);
    }
}

function animateTextWithPixelatedCursor(text, x, y, opacity, targetElement, fontSize) {
    let index = 0;
    let cursorX = x;
    let cursorY = y - 15;
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawText(text.substring(0, index), x, y, opacity, fontSize);
            drawPixelatedCursor(cursorX, cursorY, cursorVisible);
            cursorVisible = !cursorVisible;
            cursorX += ctx.measureText(text[index]).width; // Adjusted for better spacing
            index++;

            // Increase opacity gradually
            opacity += 0.05;
            if (opacity > 1) {
                opacity = 1;
            }

            requestAnimationFrame(typeNextLetter);
        }
    }

    // Display the target element after a delay
    setTimeout(() => {
        targetElement.style.display = 'block';
        typeNextLetter();
    }, 2000); // Adjust the delay as needed
}

// Start typing animation for the name with pixelated cursor
animateTextWithPixelatedCursor(nameText, canvas.width / 2 - 80, canvas.height / 2 - 20, 0, nameElement, 36);

// Start typing animation for the subtitle with pixelated cursor after a delay
setTimeout(() => {
    animateTextWithPixelatedCursor(subtitleText, canvas.width / 2 - 80, canvas.height / 2 + 40, 0, subtitleElement, 18);
}, 5000); // Adjust the delay between animations as needed
