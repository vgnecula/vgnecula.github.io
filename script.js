// script.js
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const nameText = "Vladimir Necula";
const subtitleText = "Student @ Lafayette College";

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

function animateTextWithPixelatedCursor(text, x, y, opacity, fontSize, callback) {
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
const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

// Start typing animation for the name with pixelated cursor
animateTextWithPixelatedCursor(nameText, center.x, center.y - 20, 0, 36, () => {
    // Start typing animation for the subtitle with pixelated cursor after a delay
    animateTextWithPixelatedCursor(subtitleText, center.x, center.y + 20, 0, 18, () => {
        // Animation for both name and subtitle is complete
    });
});

// Handle window resize to reposition the text
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    // Restart the animations with updated positions
    animateTextWithPixelatedCursor(nameText, center.x, center.y - 20, 0, 36, () => {
        // Start typing animation for the subtitle with pixelated cursor after a delay
        animateTextWithPixelatedCursor(subtitleText, center.x, center.y + 20, 0, 18, () => {
            // Animation for both name and subtitle is complete
        });
    });
});
