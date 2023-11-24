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

function drawText(text, opacity, fontSize) {
    // Calculate the center dynamically based on the canvas size
    const x = canvas.width / 2 - ctx.measureText(text).width / 2;
    const y = canvas.height / 2 + fontSize / 2;

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

function animateTextWithPixelatedCursor(text, opacity, targetElement, fontSize) {
    let index = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawText(text.substring(0, index), opacity, fontSize);
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

    // Display the target element
    targetElement.style.display = 'block';

    // Start typing animation after a short delay
    setTimeout(() => {
        typeNextLetter();
    }, 2000); // Adjust the delay as needed
}

// Start typing animation for the name with pixelated cursor
animateTextWithPixelatedCursor(nameText, 0, nameElement, 36);

// Start typing animation for the subtitle with pixelated cursor after a delay
animateTextWithPixelatedCursor(subtitleText, 0, subtitleElement, 18);

// Handle window resize to reposition the text
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Restart the animations with updated canvas size
    animateTextWithPixelatedCursor(nameText, 0, nameElement, 36);
    animateTextWithPixelatedCursor(subtitleText, 0, subtitleElement, 18);
});
