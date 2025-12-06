(function() {
    
    window.addEventListener('load', function() {
        
        // NAVIGATION SCROLL BEHAVIOR //
        
        const navbarContainer = document.querySelector('.navbar-container');
        const navbarHeader = document.querySelector('.navbar-header');
        
        if (navbarContainer) {
            
            function handleNavScroll() {
                if (window.scrollY > 50) {
                    navbarContainer.classList.add('nav-normal');
                    if (navbarHeader) {
                        navbarHeader.style.setProperty('background', '#FBF9F5', 'important');
                    }
                } else {
                    navbarContainer.classList.remove('nav-normal');
                    if (navbarHeader) {
                        navbarHeader.style.setProperty('background', 'transparent', 'important');
                    }
                }
            }
            
            window.addEventListener('scroll', handleNavScroll);
            handleNavScroll();
        }
        // STATS COUNTER WITH ANIMATION
        // Ref: https://www.w3schools.com/tags/att_data-.asp
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        if (statNumbers.length > 0) {
            
            // Ref: https://www.w3schools.com/jsref/met_win_requestanimationframe.asp
            function animateCounter(element, target, suffix, duration) {
                suffix = suffix || '';
                duration = duration || 2000;
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentValue = Math.floor(target * easeProgress);
                    
                    element.textContent = currentValue.toLocaleString('en-IE') + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        element.textContent = target.toLocaleString('en-IE') + suffix;
                    }
                }
                
                requestAnimationFrame(update);
            }

            // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                        entry.target.setAttribute('data-animated', 'true');
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        const suffix = entry.target.getAttribute('data-suffix') || '';
                        setTimeout(() => animateCounter(entry.target, target, suffix), 200);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

            statNumbers.forEach(stat => counterObserver.observe(stat));
        }

        // ============================================
        // ACCREDITATION CAROUSEL
        // Ref: https://www.w3schools.com/css/css3_animations.asp
        const carouselInner = document.querySelector('.accreditation-carousel-inner');
        
        if (carouselInner) {

            carouselInner.innerHTML += carouselInner.innerHTML;
        }

    });

})();
