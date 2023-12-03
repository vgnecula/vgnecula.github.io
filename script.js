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
    

    sections.forEach(section => {
        observer.observe(section);
    });

    function clearNameAndSubtitle() {
        nameElement.innerHTML = '';
        subtitleElement.innerHTML = '';
    
        if (currentNameAnimation) {
            currentNameAnimation.stopAnimation();
        }
    
        if (currentSubtitleAnimation) {
            currentSubtitleAnimation.stopAnimation();
        }
    
        console.log("kiki");
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
                removeAllParticles();
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

    function restartWritingAnimation() {
        
        clearNameAndSubtitle();
        // Clear any existing timeout for subtitle animation
        clearTimeout(animationTimeout);
    

        // Your code to restart the writing animation here
        currentNameAnimation  = animateTextWithCursorInDiv("Vladimir Necula", nameElement, 1, 36, () => {
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
        let animationRunning = true; // Flag to control animation
    
        function stopAnimation() {
            animationRunning = false;
        }
    
        function typeNextLetter() {
            if (animationRunning && index < text.length) {
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
    
        // Expose the stopAnimation function
        return { stopAnimation };
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


    

    const particles = [];
    const maxParticles = 300; // Set the maximum number of particles
    
    // Function to remove particles
    function removeAllParticles() {
        particles.forEach(particle => {
            aboutParticles.removeChild(particle.element);
        });
        particles.length = 0; // Clear the particles array
    }
    
    // Expose the removeParticles function
    window.removeParticles = removeAllParticles;
    
    // Additional: Update navbar underline on scroll
    function animateParticles() {
        // Ensure that the number of particles does not exceed the maximum
        const particleCount = Math.min(maxParticles, particles.length);
    
        for (let i = 0; i < particleCount; i++) {
            const particle = particles[i];
            animateParticle(particle);
        }
    
        // Create new particles if the count is below the maximum
        while (particles.length < maxParticles) {
            const particle = createParticle();
            particles.push(particle);
            animateParticle(particle);
        }
    
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 1; // Random size between 1 and 6
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = getRandomColor(); // Get a random color
            particle.style.position = 'absolute';
            particle.style.opacity = '0'; // Set initial opacity to 0
    
            // Generate initial velocities with a wider range
            const velocityX = Math.random() * 8 - 4; // Random horizontal movement between -4 and 4
            const velocityY = Math.random() * 8 - 4; // Random vertical movement between -4 and 4
    
            particle.velocity = { x: velocityX, y: velocityY };
    
            const startLeft = Math.random() * window.innerWidth;
            const startTop = Math.random() * window.innerHeight;
    
            particle.style.left = `${startLeft}px`;
            particle.style.top = `${startTop}px`;
    
            // Append the particle directly to the aboutParticles element
            aboutParticles.appendChild(particle);
    
            return {
                element: particle,
                velocity: particle.velocity,
            };
        }
    
        function animateParticle(particle) {
            particle.element.style.opacity = '0'; // Set initial opacity to 0
    
            const fadeSpeed = 0.1; // Adjust the fade speed
            const slowdownFactor = 0.995; // Adjust the slowdown factor
    
            function update() {
                const deltaX = particle.velocity.x;
                const deltaY = particle.velocity.y;
            
                const rect = particle.element.getBoundingClientRect();
                let newX = rect.left + deltaX;
                let newY = rect.top + deltaY;
            
                // Reset position if out of bounds
                if (newX < 0 || newX > window.innerWidth || newY < 0 || newY > window.innerHeight) {
                    // Remove the particle from the DOM only if it's still a child of aboutParticles
                    if (particle.element.parentNode === aboutParticles) {
                        aboutParticles.removeChild(particle.element);
            
                        // Find the index of the particle in the array
                        const particleIndex = particles.findIndex(p => p === particle);
            
                        if (particleIndex !== -1) {
                            // Remove the particle from the array
                            particles.splice(particleIndex, 1);
                        }
            
                        // Create a new particle and add it to the array
                        const newParticle = createParticle();
                        particles.push(newParticle);
                        animateParticle(newParticle);
                    }
            
                    return; // Skip the rest of the update for this frame
                }
            
                particle.element.style.left = `${newX}px`;
                particle.element.style.top = `${newY}px`;
            
                // Quick fade-in effect on the first appearance
                if (parseFloat(particle.element.style.opacity) < 1) {
                    particle.element.style.opacity = `${parseFloat(particle.element.style.opacity) + fadeSpeed}`;
                }
            
                // Apply slowdown effect
                particle.velocity.x *= slowdownFactor;
                particle.velocity.y *= slowdownFactor;
            
                // Randomly reset particle's velocity and opacity
                if (Math.random() < 0.01) {
                    particle.velocity.x = Math.random() * 4 - 2;
                    particle.velocity.y = Math.random() * 4 - 2;
                    particle.element.style.opacity = '0';
                }
            
                requestAnimationFrame(update);
            }
            
    
            // Start the animation loop
            requestAnimationFrame(update);
        }
    
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
    
    
    
   
    


});


