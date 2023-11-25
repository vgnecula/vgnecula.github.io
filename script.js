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

function drawCursor(x, y, visible) {
    if (visible) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x, y - 8, 2, 16); // Adjusted position and size for better appearance
    }
}

function animateTextWithCursorInDiv(text, element, opacity, fontSize, callback) {
    let index = 0;
    let cursorX = element.offsetLeft + element.offsetWidth; // Initialize cursor position at the end of the text
    let cursorY = element.offsetTop + element.offsetHeight / 2; // Initialize cursor Y position
    let cursorVisible = true;

    function typeNextLetter() {
        if (index < text.length) {
            // Update cursor position based on the current letter and div position
            const divRect = element.getBoundingClientRect();
            const divLeft = divRect.left + window.scrollX; // Adjust for window scroll
            const divTop = divRect.top + window.scrollY;   // Adjust for window scroll
            const letterWidth = ctx.measureText(text[index]).width;
            cursorX = divLeft + ctx.measureText(text.substring(0, index + 1)).width - letterWidth + 10;
            cursorY = divTop + divRect.height / 2;
    
            // Clear the previous cursor drawing and draw text
            ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
            drawTextInDiv(text.substring(0, index + 1), element, opacity, fontSize);
    
            // Draw cursor
            drawCursor(cursorX, cursorY, cursorVisible);
    
            cursorVisible = !cursorVisible;
    
            setTimeout(() => {
                requestAnimationFrame(typeNextLetter); // Use requestAnimationFrame for smoother animation
            }, 800); // Adjust the delay between letters
            index++;
        } else {
            // Reset cursor visibility after the text is fully typed
            cursorVisible = true;
            drawCursor(cursorX, cursorY, cursorVisible);
            callback(); // Call the callback function when the animation is complete
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
