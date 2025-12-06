document.addEventListener('DOMContentLoaded', function() {
    
    // fade animations, works with the css code, activates when element is visible in viewport
    
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right');

    if (animatedElements.length > 0) {

        const options = {
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                    //observer.unobserve(entry.target);
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, options);

      
        animatedElements.forEach(entry => {
            observer.observe(entry);
        });
    }


    // mobile nav toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavWrapper = document.querySelector('.mobile_nav_wrapper');

    mobileMenuToggle.addEventListener('click', function() {
        console.log('clicked');
        if(mobileMenuToggle.classList.contains('active')){
            mobileMenuToggle.classList.remove('active');
            mobileNavWrapper.classList.remove('active');
        } else {
            mobileMenuToggle.classList.add('active');
            mobileNavWrapper.classList.add('active');
        }
    });


    // return to top arrow
    var arrowUp = document.querySelector('.arrow_up');

    window.addEventListener('scroll', function() {
        
        if (window.scrollY >= 800) {
            arrowUp.classList.add('show');
        } else {
            arrowUp.classList.remove('show');
        }
    });

    arrowUp.addEventListener('click', function() {
        window.scrollTo({top:0});
    });

    

});