document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
    });

    const sections = document.querySelectorAll('.container section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        observer.observe(section);
    });

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                highlightNavLink(targetId);
            }
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

document.addEventListener('DOMContentLoaded', function () {

    const nameElement = document.getElementById('name');
    const subtitleElement = document.getElementById('subtitle');
    const pixelCanvas = document.getElementById('pixelCanvas');
    const ctx = pixelCanvas.getContext('2d');
    const navLinks = document.querySelectorAll('.nav-link');
    const aboutLink = document.getElementById('aboutLink');
    const homeLink = document.getElementById('homeLink');
    const portfolioLink = document.getElementById('portfolioLink');
    const contactLink = document.getElementById('contactLink');

    

    if (!nameElement || !subtitleElement || !pixelCanvas) {
        console.error("Error: One or more elements not found");
        return;
    }

    pixelCanvas.width = window.innerWidth;
    pixelCanvas.height = window.innerHeight;

    // Add click event listeners to all nav links
    // Initialize IntersectionObserver with a callback
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5, // Adjust the threshold as needed
    });

    // Get all the sections
    const sections = document.querySelectorAll('.container section');

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

    // Callback function for IntersectionObserver
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is in the viewport
                const targetId = entry.target.getAttribute('id');
                highlightNavLink(targetId);
            }
        });
    }

    // Function to highlight the corresponding nav link
    function highlightNavLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('underline');
            if (link.getAttribute('href').substring(1) === targetId) {
                link.classList.add('underline');
            }
        });
    }
    // ... (rest of the JavaScript remains the same)


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

});
