document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for highlighting nav links
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
    });

    const sections = document.querySelectorAll('.container section');
    const navLinks = document.querySelectorAll('.nav-link');
    const homeSection = document.getElementById('home');
    const nameElement = document.getElementById('name');
    const subtitleElement = document.getElementById('subtitle');
    const pixelCanvas = document.getElementById('pixelCanvas');
    const ctx = pixelCanvas.getContext('2d');

    sections.forEach(section => {
        observer.observe(section);
    });

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                highlightNavLink(targetId);

                // Check if the home section is in view
                if (targetId === 'home') {
                    restartWritingAnimation();
                }
            }
        });
    }

    function restartWritingAnimation() {
        // Clear existing text
        nameElement.innerHTML = '';
        subtitleElement.innerHTML = '';

        // Your code to restart the writing animation here
        animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
            // Start typing animation for the subtitle with pixelated cursor after a delay
            animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 1, 18, () => {
                // Animation for both name and subtitle is complete
            });
        });
    }

    function highlightNavLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('underline');
            if (link.getAttribute('href').substring(1) === targetId) {
                link.classList.add('underline');
            }
        });
    }

    // Animation for typing text with a pixelated cursor
    pixelCanvas.width = window.innerWidth;
    pixelCanvas.height = window.innerHeight;

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

    function clearCanvas() {
        ctx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
    }

    function drawCursor(x, y, visible, fontSize) {
        // Your existing drawing functions and code go here
    }

    // Additional code for handling click events on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    function handleNavLinkClick(event) {
        event.preventDefault();

        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Smooth scroll effect
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',  // Scroll to the top of the target element
        });

        // Optional: Highlight the clicked link in the navbar
        navLinks.forEach(link => {
            link.classList.remove('underline');
        });
        event.target.classList.add('underline');
    }

    // Additional: Update navbar underline on scroll
    document.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const targetId = section.getAttribute('id');
            const targetElement = document.getElementById(targetId);

            if (targetElement.offsetTop <= scrollPosition && targetElement.offsetTop + targetElement.offsetHeight > scrollPosition) {
                highlightNavLink(targetId);
            }
        });
    });
});
