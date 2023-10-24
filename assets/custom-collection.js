let seoContent = document.querySelector('.collectionseo');

// check if the seoContent contians readmore element
let hasReadMoreButton = Array.from(seoContent.children).some(child => child.classList.contains('readmore-text'));
console.log(hasReadMoreButton);

if (hasReadMoreButton) {
    // create the read more button element
    let readMoreButton = document.createElement('div');
    readMoreButton.classList.add('readmore');

    readMoreButton.textContent = 'Read More';

    seoContent.appendChild(readMoreButton);

    readMoreButton.addEventListener("click", function(e){
        e.preventDefault();

        let hiddenContent = document.querySelector('.collectionseo .readmore-text');

        if (hiddenContent.style.display === 'block') {
            hiddenContent.style.display = 'none'
            this.textContent = 'Read More'
        }else{
            hiddenContent.style.display = 'block';
            this.textContent = 'Close'
        }

        console.log('read button clicked');
    })
}