let currentNameAnimation;
let currentSubtitleAnimation;
let animationTimeout;
let cnt=0;

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
    

    const aboutParticles = document.createElement('div');
    aboutParticles.classList.add('about-particles');
    document.getElementById('about').appendChild(aboutParticles);

    function animateParticles() {
        const particleCount = 100; // Adjust the number of particles
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 5 + 1; // Random size between 1 and 6
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = '#42a5f5'; // Particle color
        particle.style.position = 'absolute';

        const startLeft = Math.random() * window.innerWidth;
        const startTop = Math.random() * window.innerHeight;

        particle.style.left = `${startLeft}px`;
        particle.style.top = `${startTop}px`;

        aboutParticles.appendChild(particle);

        // Animation
        anime({
            targets: particle,
            translateX: Math.random() * 200 - 100, // Random horizontal movement
            translateY: Math.random() * -100 - 50, // Random vertical movement
            opacity: 0, // Fade out
            easing: 'easeOutQuad',
            duration: 2000, // Animation duration
            complete: function () {
                aboutParticles.removeChild(particle);
            },
        });
    }

    // Intersection Observer for triggering particle animation
    const aboutObserver = new IntersectionObserver(handleAboutIntersection, {
        threshold: 0.5,
    });

    aboutObserver.observe(document.getElementById('about'));

    function handleAboutIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateParticles();
                aboutObserver.unobserve(entry.target); // Stop observing after triggering animation
            }
        });
    }
    

    sections.forEach(section => {
        observer.observe(section);
    });

    function clearNameAndSubtitle() {
        nameElement.innerHTML = '';
        
        subtitleElement.innerHTML = '';
        if (currentSubtitleAnimation) {
            currentSubtitleAnimation.kill();
            
            currentSubtitleAnimation = null;
        }

        // Pause and reset the subtitle animation
        if (currentNameAnimation) {
            currentNameAnimation.kill();
            
            currentNameAnimation = null;
        }
    
        nameElement.innerHTML = '';
    
        subtitleElement.innerHTML = '';
    }

        // Periodically check the current section and clear content if needed
    setInterval(() => {
        const currentSection = getCurrentSection();
        if (currentSection !== 'home') {
            clearNameAndSubtitle();
        }
        
    }, 500); // Adjust the interval as needed



    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                highlightNavLink(targetId);

                if (targetId === 'home') {
                    // Restart the writing animation
                    clearNameAndSubtitle();
                    const { currentNameAnimation, currentSubtitleAnimation } = restartWritingAnimation()
                }  else {
                    // Clear the content of name and subtitle when a different section is in view
                    clearNameAndSubtitle();
                }


                if (targetId === 'about') {
                    // About section is in view, start the particle animation
                    animateParticles();
                }
            }
        });
    }

    function getCurrentSection() {
        // Find the section that is currently in view based on scroll position
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        for (const section of sections) {
            const targetId = section.getAttribute('id');
            const targetElement = document.getElementById(targetId);

            if (targetElement.offsetTop <= scrollPosition && targetElement.offsetTop + targetElement.offsetHeight > scrollPosition) {
                return targetId;
            }
        }

        // If no section is in view, return a default value
        return 'unknown';
    }

    let animationTimeout;

    function restartWritingAnimation() {
        
        clearNameAndSubtitle();

        // Terminate existing animations
        
        if (currentNameAnimation) {
            currentNameAnimation.kill();
            currentNameAnimation = null;
        }
        
        if (currentSubtitleAnimation) {
            currentSubtitleAnimation.kill();
            currentSubtitleAnimation = null;
        }
        // Clear any existing timeout for subtitle animation
        clearTimeout(animationTimeout);
    

        // Your code to restart the writing animation here
        currentNameAnimation = animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
            // Start typing animation for the subtitle with pixelated cursor after a delay
            animationTimeout = setTimeout(() => {
                subtitleElement.innerHTML = '';
                
                console.log(cnt++);
                currentSubtitleAnimation = animateTextWithCursorInDiv("Student @ Lafayette College", subtitleElement, 1, 18, () => {
                    // Animation for both name and subtitle is complete
                });
            }, 500); // Adjust the delay as needed
        });
    
        return { currentNameAnimation, currentSubtitleAnimation };
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
        // Clear the canvas before drawing the cursor
        clearCanvas();
    
        if (visible) {
            // Adjust the cursor size based on the font size
            const cursorSize = fontSize; // Adjust the factor as needed
    
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.fillRect(x - cursorSize / 2.2, y - cursorSize / 2.2, 2, cursorSize / 1.1);
        }
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


    const scrollTextContainer = document.querySelector('.scroll-text-container');
    scrollTextContainer.style.opacity = 0;

    anime({
        targets: '.scroll-text-container',
        opacity: 1,
        duration: 1000, // Adjust the duration as needed
        easing: 'easeInOutQuad', // Optional: Choose the easing function
        delay: 1000, // Optional: Add a delay before the fade-in starts
    });

    setInterval(() => {
        anime({
            targets: '.scroll-text-container',
            opacity: [0, 1],
            duration: 1000, // Adjust the duration as needed
            easing: 'easeInOutQuad', // Optional: Choose the easing function
        });
    }, 1000);



});