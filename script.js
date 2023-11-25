// script.js
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');
const pixelCanvas = document.getElementById('pixelCanvas');
const ctx = pixelCanvas.getContext('2d');
const aboutLink = document.getElementById('aboutLink');

// Set the canvas size based on the window's dimensions
pixelCanvas.width = window.innerWidth;
pixelCanvas.height = window.innerHeight;

// Add event listener for the "About" link
aboutLink.addEventListener('click', handleAboutLinkClick);

function handleAboutLinkClick(event) {
    event.preventDefault(); // Prevent the default behavior of the link

    // Perform background image change and slide animation
    changeBackgroundAndSlide();
}

function changeBackgroundAndSlide() {
    // Change the background image
    document.body.style.background = "url('background_about.gif') center/cover no-repeat fixed";

    // You can add a class to trigger a CSS animation for the slide effect
    document.body.classList.add('slide-animation');

    // After a delay, remove the class to reset the background and animation
    setTimeout(() => {
        document.body.style.background = "url('background.gif') center/cover no-repeat fixed";
        document.body.classList.remove('slide-animation');
    }, 1000); // Adjust the delay as needed
}

function drawTextInDiv(text, element, opacity, fontSize) {
    element.textContent = text;
    element.style.fontSize = `${fontSize}px`;
    element.classList.add('visible'); // Add a class to make the element visible
}

function clearCanvas() {
    ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
}

function drawCursor(x, y, visible, fontSize) {
   
        // Adjust the cursor size based on the font size
        const cursorSize = (fontSize); // Adjust the factor as needed

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(x-cursorSize/(2.2), y-cursorSize/(2.2), 2, cursorSize/(1.1));
        
    
}

function animateTextWithCursorInDiv(text, element, opacity, fontSize, callback) {
    let index = 0;
    let cursorX = element.offsetLeft + element.offsetWidth; // Initialize cursor position at the end of the text
    let cursorY = element.offsetTop + element.offsetHeight / 2; // Initialize cursor Y position
    let cursorVisible = true;

    function typeNextLetter() {
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
            }, 80); // Adjust the delay between letters

            index++;
        } else {
            // Reset cursor visibility after the text is fully typed
            cursorVisible = true;
            
            drawCursor(cursorX, cursorY, cursorVisible);

            clearCanvas();
            callback();
        }
    }

    // Start typing animation after a short delay
    setTimeout(() => {
        typeNextLetter();
    }, 100); // Adjust the delay as needed
}

// Start typing animation for the name with pixelated cursor
animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
    // Start typing animation for the subtitle with pixelated cursor after a delay
    animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 1, 18, () => {
        // Animation for both name and subtitle is complete
    });
});

clearCanvas();
