document.addEventListener('DOMContentLoaded', function() {
    
});


window.addEventListener('scroll', function() {
    var header = document.querySelector('.navbar-container');
    if (window.scrollY >= 300) {
        header.classList.add('nav-normal');
    } else {
        header.classList.remove('nav-normal');
    }
});

