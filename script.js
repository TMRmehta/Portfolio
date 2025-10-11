// Bottom Navigation Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const bottomNav = document.querySelector('.bottom-navigation');
    const navHint = document.getElementById('navHint');
    const navHintPreview = document.getElementById('navHintPreview');
    let isNavVisible = false;
    let autoRevealTriggered = false;
    let hintHoverTimeout;

    // Toggle navigation on button click
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            toggleNavigation();
        });
    }

    // Hint button hover functionality - shows existing navigation
    if (navHint && bottomNav) {
        navHint.addEventListener('mouseenter', function() {
            clearTimeout(hintHoverTimeout);
            showNavigation();
        });

        navHint.addEventListener('mouseleave', function() {
            hintHoverTimeout = setTimeout(function() {
                if (!autoRevealTriggered) {
                    hideNavigation();
                }
            }, 200);
        });

        // Keep navigation visible when hovering over it
        bottomNav.addEventListener('mouseenter', function() {
            clearTimeout(hintHoverTimeout);
        });

        bottomNav.addEventListener('mouseleave', function() {
            if (!autoRevealTriggered) {
                hideNavigation();
            }
        });
    }

    // Auto-reveal when user reaches bottom of page
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if user is near bottom (within 100px)
        const isNearBottom = scrollPosition + windowHeight >= documentHeight - 100;
        
        if (isNearBottom && !autoRevealTriggered) {
            showNavigation();
            autoRevealTriggered = true;
        } else if (!isNearBottom && autoRevealTriggered) {
            autoRevealTriggered = false;
        }
    });

    function toggleNavigation() {
        if (isNavVisible) {
            hideNavigation();
        } else {
            showNavigation();
        }
    }

    function showNavigation() {
        if (bottomNav) {
            bottomNav.classList.add('show');
        }
        if (navToggle) {
            navToggle.classList.add('active');
        }
        isNavVisible = true;
    }

    function hideNavigation() {
        if (bottomNav) {
            bottomNav.classList.remove('show');
        }
        if (navToggle) {
            navToggle.classList.remove('active');
        }
        isNavVisible = false;
    }

    // Hide navigation when clicking outside
    document.addEventListener('click', function(event) {
        if (isNavVisible && 
            bottomNav && !bottomNav.contains(event.target) && 
            navToggle && !navToggle.contains(event.target)) {
            hideNavigation();
        }
    });

    // Prevent navigation from hiding when clicking on nav icons
    if (bottomNav) {
        bottomNav.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});
