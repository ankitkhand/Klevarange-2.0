window.addEventListener('DOMContentLoaded', function() {

  // display the side cart
  // document.querySelector('cart-drawer.drawer').style.display = "flex";
  // // end

  // to make the header sub menu visible on hover
  let items = document.querySelector(".header__inline-menu").querySelectorAll("details");
    items.forEach(item => {
      item.addEventListener("mouseover", () => {
        item.setAttribute("open", true);
        item.querySelector("ul").addEventListener("mouseleave", () => {
          item.removeAttribute("open");
        });
      item.addEventListener("mouseleave", () => {
        item.removeAttribute("open");
      });
    });
    
    });
  // end

const elements = document.querySelectorAll('.globalcustomdropdown');

for (const element of elements) {
  element.addEventListener('click', function(event) {

    element.classList.add('plusicon');

    const dropdownTitle = this.closest('.seocontentsection').querySelectorAll('.globalcustomdropdown');
    for(const dp of dropdownTitle){
      dp.classList.remove('current');
    }

    // open up the content
    //this.querySelector('.globalcustomdropdowncontent')
    const dropdowns = document.querySelectorAll('.globalcustomdropdowncontent');
    for(let dropEl of dropdowns){
      dropEl.style.display = 'none';
    }

    // close all the dropdown contents
    this.querySelector('.globalcustomdropdowncontent');
    let currentDropDown = this.querySelector('.globalcustomdropdowncontent');

    if (this.querySelector('.globalcustomdropdowncontent').style.display === 'block') {
      this.querySelector('.globalcustomdropdowncontent').style.display = 'none';
      this.querySelector('.globalcustomdropdowncontent').classList.remove('animateout');

    }else{
      //element.classList.remove('current');
      this.querySelector('.globalcustomdropdowncontent').style.display = 'block';
      this.querySelector('.globalcustomdropdowncontent').classList.add('animatein');

      this.classList.add('current');
    }
  });
}


  // footer dropdown
  let footerTitle = document.querySelectorAll('footer .footer-block__heading');

  footerTitle.forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();

      if (window.innerWidth <= 930) {
        if (this.closest('.footer-block').querySelector('.dropdownlink').style.display === 'block') {
          this.closest('.footer-block').querySelector('.dropdownlink').style.display = 'none';
        }else{
          this.closest('.footer-block').querySelector('.dropdownlink').style.display = 'block';
        } 
      }
      console.log('Footer dropdown clicked');
    })
  })



  // window.addEventListener('resize', checkWindowSizeFooter);
  // window.addEventListener('load', checkWindowSizeFooter);
  // end

  // loading animation on click
  let checkoutBtn = document.querySelector('button.cart__checkout-button');
  checkoutBtn.addEventListener('click', function(event) {

    this.classList.add('loading_status');

    setTimeout(() => {
      this.classList.remove('loading_status');
    }, 10000);

  })
  // end
})