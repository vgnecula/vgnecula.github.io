// script.js
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');

function drawTextInDiv(text, element, opacity, fontSize, callback) {
    element.style.opacity = opacity;
    element.style.fontSize = `${fontSize}px`;
    element.textContent = text;

    // Callback when animation is complete
    if (callback) {
        callback();
    }
}

function animateTextWithCursorInDiv(text, element, opacity, fontSize, callback) {
    let index = 0;

    function typeNextLetter() {
        if (index <= text.length) {
            drawTextInDiv(text.substring(0, index), element, opacity, fontSize);
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

// Start typing animation for the name with pixelated cursor
animateTextWithCursorInDiv("Vladimir Necula", nameElement, 0, 36, () => {
    // Start typing animation for the subtitle with pixelated cursor after a delay
    animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 0, 18, () => {
        // Animation for both name and subtitle is complete
    });
});

// Handle window resize to reposition the text
window.addEventListener('resize', () => {
    // Restart the animations with updated positions
    animateTextWithCursorInDiv("Vladimir Necula", nameElement, 0, 36, () => {
        // Start typing animation for the subtitle with pixelated cursor after a delay
        animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 0, 18, () => {
            // Animation for both name and subtitle is complete
        });
    });
});
