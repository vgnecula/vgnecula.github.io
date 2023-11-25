// script.js
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');
const canvas = document.getElementById('pixelCanvas');

function drawTextInDiv(text, element, opacity, fontSize, cursorX, cursorVisible) {
    const ctx = canvas.getContext('2d');
    element.style.opacity = opacity;
    element.style.fontSize = `${fontSize}px`;
    element.textContent = text;

    // Draw cursor
    drawCursor(cursorX, element.offsetTop + element.offsetHeight / 2, cursorVisible);
}

function drawCursor(x, y, visible) {
    const ctx = canvas.getContext('2d');
    
    if (visible) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y - 15, 2, 20);
    }
}

function animateTextWithCursorInDiv(text, element, opacity, fontSize, callback) {
    const ctx = canvas.getContext('2d');
    let index = 0;
    let cursorX = element.offsetLeft; // Initialize cursor position
    let cursorVisible = true;

    function typeNextLetter() {
        if (index <= text.length) {
            drawTextInDiv(text.substring(0, index), element, opacity, fontSize, cursorX, cursorVisible);

            // Update cursor position
            cursorX += ctx.measureText(text[index]).width + 10; // Adjusted for better spacing
            index++;
            cursorVisible = !cursorVisible;

            setTimeout(typeNextLetter, 150); // Adjust the typing speed by changing the timeout
        } else {
            callback(); // Call the callback function when animation is complete
        }
    }

    // Start typing animation after a short delay
    setTimeout(() => {
        typeNextLetter();
    }, 2000); // Adjust the delay as needed
}

// Start typing animation for the name with pixelated cursor
animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
    // Start typing animation for the subtitle with pixelated cursor after a delay
    animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 1, 18, () => {
        // Animation for both name and subtitle is complete
    });
});

// Handle window resize to reposition the text
window.addEventListener('resize', () => {
    // Restart the animations with updated positions
    animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
        // Start typing animation for the subtitle with pixelated cursor after a delay
        animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 1, 18, () => {
            // Animation for both name and subtitle is complete
        });
    });
});
