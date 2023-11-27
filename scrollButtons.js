// scrollAnimation.js

const scrollTextContainer = document.querySelector('.scroll-text-container');
scrollTextContainer.style.opacity = 0;

function fadeInAndOut() {
    anime({
        targets: '.scroll-text-container',
        opacity: [0, 1],
        duration: 2000,
        easing: 'easeInOutQuad',
        complete: function() {
            anime({
                targets: '.scroll-text-container',
                opacity: [1, 0],
                duration: 2000,
                easing: 'easeInOutQuad',
            });
        }
    });
}

// Initial call to start the animation
fadeInAndOut();

// Call the function in intervals for continuous loop
setInterval(fadeInAndOut, 4000); // Use a longer interval to avoid conflicts


