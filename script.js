// script.js
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const nameText = "Vladimir Necula";
const subtitleText = "Student @ Lafayette College";

// Set initial opacity to 0
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');
nameElement.style.opacity = 1; // Set initial opacity to 1 for the name

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawText(text, x, y, opacity, fontSize, targetElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = `${fontSize}px 'Press Start 2P', cursive`;
    ctx.fillText(text, x, y);

    // Set the text content and display for the respective HTML element
    targetElement.textContent = text;
}

function drawPixelatedCursor(x, y, visible) {
    if (visible) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y - 15, 2, 20);
        ctx.fillRect(x + 2, y - 15, 2, 20);
        ctx.fillRect(x + 4, y - 15, 2, 20);
    }
}

function animateTextWithPixelatedCursor(text, x, y, opacity, targetElement, fontSize, callback) {
    let index = 0;
    let cursorX = x;
    let cursorY = y - 15;
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawText(text.substring(0, index), x, y, opacity, fontSize, targetElement);
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
        } else {
            callback(); // Call the callback function when animation is complete
        }
    }

    // Start typing animation after a short delay
    setTimeout(() => {
        typeNextLetter();
    }, 2000); // Adjust the delay as needed
}

// Calculate the center dynamically based on the canvas size
const nameX = canvas.width / 2 - ctx.measureText(nameText).width / 2;
const nameY = canvas.height / 2 - 20;
const subtitleX = canvas.width / 2 - ctx.measureText(subtitleText).width / 2;
const subtitleY = canvas.height / 2 + 20;

// Start typing animation for the name with pixelated cursor
animateTextWithPixelatedCursor(nameText, nameX, nameY, 0, nameElement, 36, () => {
    // Start typing animation for the subtitle with pixelated cursor after a delay
    animateTextWithPixelatedCursor(subtitleText, subtitleX, subtitleY, 0, subtitleElement, 18, () => {
        // Animation for both name and subtitle is complete
    });
});

// Handle window resize to reposition the text
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recalculate the center dynamically based on the updated canvas size
    const nameX = canvas.width / 2 - ctx.measureText(nameText).width / 2;
    const nameY = canvas.height / 2 - 20;
    const subtitleX = canvas.width / 2 - ctx.measureText(subtitleText).width / 2;
    const subtitleY = canvas.height / 2 + 20;

    // Restart the animations with updated positions
    animateTextWithPixelatedCursor(nameText, nameX, nameY, 0, nameElement, 36, () => {
        // Start typing animation for the subtitle with pixelated cursor after a delay
        animateTextWithPixelatedCursor(subtitleText, subtitleX, subtitleY, 0, subtitleElement, 18, () => {
            // Animation for both name and subtitle is complete
        });
    });
});
