// to check if the top ATC button is visible or not
let observer = new IntersectionObserver(function(entries) {
    let bottomATC = document.querySelector('.bottom-atc');

    if (entries[0].isIntersecting === true) {
        bottomATC.classList.add('hide');
        bottomATC.classList.remove('show');
    }else{
        bottomATC.classList.remove('hide');
        bottomATC.classList.add('show');
    }

})
observer.observe(document.querySelector('.product-action .addToCartBtn'));
// end


// to jump to the top ATC button while clicking on the bottom ATC button
document.querySelectorAll('.batc_content a[href^="#"]').forEach(element => {
    element.addEventListener('click', event => {
        var target = document.querySelector(element.getAttribute('href'));
        if (target) {
            event.preventDefault();
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            var windowHeight = window.innerHeight;
            var targetHeight = target.offsetHeight;
            var position = targetPosition - (windowHeight - targetHeight) / 2;
            window.scroll({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});

// for the reviews section
document.querySelectorAll('.jumpsection a[href^="#"]').forEach(element => {
    element.addEventListener('click', event => {
        var target = document.querySelector(element.getAttribute('href'));
        document.querySelector('.product-description-tab h2#title-r').click();

        if (target) {
            event.preventDefault();
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            var windowHeight = window.innerHeight;
            var targetHeight = target.offsetHeight;
            var position = targetPosition - (windowHeight - targetHeight) / 2;
            window.scroll({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});