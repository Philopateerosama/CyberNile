document.addEventListener('DOMContentLoaded', () => {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // Add main-content class to the main content wrapper
    const mainContent = document.querySelector('main') || document.body;
    mainContent.classList.add('main-content');

    // Handle all learn more buttons
    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = button.getAttribute('href');
            if (!targetUrl) return;

            // Start transition
            performPageTransition(targetUrl);
        });
    });

    // Initialize GSAP animations for slide-in elements
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements with slide-in class
    gsap.utils.toArray('.slide-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.2
        });
    });

    // Add hover effect to learn more buttons
    gsap.utils.toArray('.learn-more').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

function performPageTransition(targetUrl) {
    const overlay = document.querySelector('.page-transition-overlay');
    const mainContent = document.querySelector('.main-content');
    
    // Prevent multiple transitions
    if (document.body.classList.contains('transitioning')) return;
    
    document.body.classList.add('transitioning');

    // Create a timeline for the transition
    const tl = gsap.timeline({
        onComplete: () => {
            window.location.href = targetUrl;
        }
    });

    // Animate the main content with a 3D rotation effect
    tl.to(mainContent, {
        opacity: 0,
        y: 50,
        rotationX: 10,
        duration: 0.8,
        ease: "power2.inOut"
    })
    // Animate the overlay with a ripple effect
    .to(overlay, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
    })
    // Add a subtle background color shift
    .to(overlay, {
        background: "linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)",
        duration: 0.5,
        ease: "power2.inOut"
    }, "-=0.3");
}

// Handle back button and initial page load
window.addEventListener('pageshow', (event) => {
    const overlay = document.querySelector('.page-transition-overlay');
    const mainContent = document.querySelector('.main-content');
    
    if (event.persisted) {
        // Page is loaded from back/forward cache
        const tl = gsap.timeline();
        
        tl.to(overlay, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        })
        .to(mainContent, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.4")
        .then(() => {
            document.body.classList.remove('transitioning');
        });
    } else {
        // Initial page load with a subtle entrance animation
        const tl = gsap.timeline();
        
        tl.from(mainContent, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
        
        gsap.set([overlay, mainContent], {
            clearProps: "all"
        });
        document.body.classList.remove('transitioning');
    }
}); 