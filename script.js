// script.js
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');
const pixelCanvas = document.getElementById('pixelCanvas');
const ctx = pixelCanvas.getContext('2d');

// Set the canvas size based on the window's dimensions
pixelCanvas.width = window.innerWidth;
pixelCanvas.height = window.innerHeight;

function drawTextInDiv(text, element, opacity, fontSize) {
    element.textContent = text;
    element.style.fontSize = `${fontSize}px`;
    element.classList.add('visible'); // Add a class to make the element visible
}

function clearCanvas() {
    ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
}

function drawCursor(x, y, visible, fontSize) {
    if (visible) {
        // Adjust the cursor size based on the font size
        const cursorWidth = 2 * (fontSize / 36); // Adjust the factor as needed
        const cursorHeight = 16 * (fontSize / 36); // Adjust the factor as needed

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y, cursorWidth, cursorHeight);
        console.log("Heig", cursorHeight, "Wid", cursorWidth);
    }
}

function animateTextWithCursorInDiv(text, element, opacity, fontSize, callback) {
    let index = 0;
    let cursorX = element.offsetLeft + element.offsetWidth; // Initialize cursor position at the end of the text
    let cursorY = element.offsetTop + element.offsetHeight / 2; // Initialize cursor Y position
    let cursorVisible = true;

    function typeNextLetter() {Z
        if (index < text.length) {
            // Clear the entire canvas before drawing the new text and cursor
            clearCanvas();

            // Create a span for the current letter
            const span = document.createElement('span');
            span.textContent = text[index];

            // Set the font size for the span based on the element type
            span.style.fontSize = `${fontSize}px`;

            // Append the span to the element
            element.appendChild(span);

            // Get the position of the last letter in the div
            const lastLetterRect = span.getBoundingClientRect();
            const lastLetterLeft = lastLetterRect.left + window.scrollX;
            const lastLetterTop = lastLetterRect.top + window.scrollY;

            // Update cursor position based on the last letter
            cursorX = lastLetterLeft + lastLetterRect.width + 10;
            cursorY = lastLetterTop + lastLetterRect.height / 2;

            // Draw cursor
            drawCursor(cursorX, cursorY, cursorVisible, fontSize);

            cursorVisible = !cursorVisible;

            setTimeout(() => {
                requestAnimationFrame(typeNextLetter);
            }, 800); // Adjust the delay between letters

            index++;
        } else {
            // Reset cursor visibility after the text is fully typed
            cursorVisible = true;
            drawCursor(cursorX, cursorY, cursorVisible);
            callback();
        }
    }

    // Start typing animation after a short delay
    setTimeout(() => {
        typeNextLetter();
    }, 1000); // Adjust the delay as needed
}

// Start typing animation for the name with pixelated cursor
animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
    // Start typing animation for the subtitle with pixelated cursor after a delay
    animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 1, 18, () => {
        // Animation for both name and subtitle is complete
    });
});
