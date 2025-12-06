/**
 * Jeffrey.js - DewValley Foods Interactive Features
 * Handles: Navigation scroll, Stats counters, Accreditation carousel
 * For GitHub Pages deployment
 */

(function() {
    'use strict';
    
    window.addEventListener('load', function() {
        
        // ============================================
        // NAVIGATION SCROLL BEHAVIOR
        // Changes navbar style when user scrolls down
        // ============================================
        
        var navbarContainer = document.querySelector('.navbar-container');
        var navbarHeader = document.querySelector('.navbar-header');
        
        if (navbarContainer) {
            
            function handleNavScroll() {
                if (window.scrollY > 50) {
                    // User has scrolled - apply solid background
                    navbarContainer.classList.add('nav-normal');
                    if (navbarHeader) {
                        navbarHeader.style.setProperty('background', '#FBF9F5', 'important');
                    }
                } else {
                    // At top of page - transparent background
                    navbarContainer.classList.remove('nav-normal');
                    if (navbarHeader) {
                        navbarHeader.style.setProperty('background', 'transparent', 'important');
                    }
                }
            }
            
            // Listen for scroll events
            window.addEventListener('scroll', handleNavScroll);
            
            // Run once on load to set initial state
            handleNavScroll();
        }
        
        // ============================================
        // MOBILE MENU TOGGLE
        // Handles hamburger menu for mobile navigation
        // ============================================
        
        var mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        var mobileNavWrapper = document.querySelector('.mobile_nav_wrapper');
        
        if (mobileMenuToggle && mobileNavWrapper) {
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNavWrapper.classList.toggle('active');
            });
            
            // Close menu when clicking a link
            var mobileLinks = mobileNavWrapper.querySelectorAll('a');
            mobileLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    mobileNavWrapper.classList.remove('active');
                });
            });
        }
        
        // ============================================
        // STATS COUNTER WITH ANIMATION
        // Animates numbers when they come into view
        // Ref: https://www.w3schools.com/tags/att_data-.asp
        // ============================================
        
        var statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        if (statNumbers.length > 0) {
            
            /**
             * Animates a counter from 0 to target value
             * Ref: https://www.w3schools.com/jsref/met_win_requestanimationframe.asp
             */
            function animateCounter(element, target, suffix, duration) {
                suffix = suffix || '';
                duration = duration || 2000;
                var startTime = performance.now();
                
                function update(currentTime) {
                    var elapsed = currentTime - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    
                    // Ease-out exponential for smooth deceleration
                    var easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    var currentValue = Math.floor(target * easeProgress);
                    
                    // Format number with locale (adds commas for thousands)
                    element.textContent = currentValue.toLocaleString('en-IE') + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        // Ensure final value is exact
                        element.textContent = target.toLocaleString('en-IE') + suffix;
                    }
                }
                
                requestAnimationFrame(update);
            }
            
            /**
             * Intersection Observer to trigger animation when visible
             * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
             */
            var counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                        // Mark as animated to prevent re-triggering
                        entry.target.setAttribute('data-animated', 'true');
                        
                        // Get target value and optional suffix from data attributes
                        var target = parseInt(entry.target.getAttribute('data-target'), 10);
                        var suffix = entry.target.getAttribute('data-suffix') || '';
                        
                        // Small delay for better visual effect
                        setTimeout(function() {
                            animateCounter(entry.target, target, suffix);
                        }, 200);
                    }
                });
            }, { 
                threshold: 0.2, 
                rootMargin: '0px 0px -100px 0px' 
            });
            
            // Observe all stat number elements
            statNumbers.forEach(function(stat) {
                counterObserver.observe(stat);
            });
        }
        
        // ============================================
        // ACCREDITATION CAROUSEL
        // Infinite scrolling logo carousel
        // Ref: https://www.w3schools.com/css/css3_animations.asp
        // ============================================
        
        var carouselInner = document.querySelector('.accreditation-carousel-inner');
        
        if (carouselInner) {
            // Duplicate content for seamless infinite scroll
            carouselInner.innerHTML += carouselInner.innerHTML;
        }
        
        // ============================================
        // FADE-IN ANIMATIONS ON SCROLL
        // Handles .fade-in and .fade-up classes
        // ============================================
        
        var fadeElements = document.querySelectorAll('.fade-in, .fade-up');
        
        if (fadeElements.length > 0) {
            var fadeObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Stop observing after animation
                        fadeObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            fadeElements.forEach(function(el) {
                fadeObserver.observe(el);
            });
        }
        
        // ============================================
        // SCROLL TO TOP BUTTON
        // Arrow in footer scrolls to top
        // ============================================
        
        var arrowUp = document.querySelector('.arrow_up');
        
        if (arrowUp) {
            arrowUp.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Add cursor pointer style
            arrowUp.style.cursor = 'pointer';
        }
        
    });
    
})();
