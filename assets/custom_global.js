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
        this.closest('.footer-block').classList.toggle('active');
      }
      console.log('Footer dropdown clicked');
    })
  })



  // window.addEventListener('resize', checkWindowSizeFooter);
  // window.addEventListener('load', checkWindowSizeFooter);
  // end

  // loading animation on click
  let checkoutBtn = document.querySelector('button.cart__checkout-button');

  checkoutBtn.classList.remove('se-processed');
  
  checkoutBtn.addEventListener('click', function(event) {
    this.classList.add('loading_status');

    setTimeout(() => {
      this.classList.remove('loading_status');
      this.classList.remove('se-processed');
    }, 2000);

  })
  // end

    /* Changes to add free gifts based on discounts - START */
    function addGift(e) {
        const discountCode = 'ESSOILPACK2';
        const giftVariantId = 40044400705607;
        let giftEligible = false;
        if (e.discounts && e.discounts.find(d => d.title.toUpperCase() === discountCode.toUpperCase())) {
            giftEligible = true;
        }

        fetch('/cart.js', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
                .then(res => res.json())
                .then(json => {
                    let giftInCart = !!json.items.find(i => i.variant_id === giftVariantId);
                    if ((giftInCart && !giftEligible) || (giftInCart && json.items.length === 1)) {
                        setFreeGiftQuantity(giftVariantId, 0);
                    } else if (!giftInCart && giftEligible) {
                        setFreeGiftQuantity(giftVariantId, 1);
                    }
                })
                .catch((error) => {
                    console.error('Error getting cart: ', error);
                });
    }

    function setFreeGiftQuantity(giftVariantId, q) {
        const formData = {updates: {}};
        formData.updates[giftVariantId] = q;
        fetch('/cart/update.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.items.length) {
                    document.querySelector('cart-drawer-items')?.onChange({
                        target: {
                            dataset: {index: 1},
                            value: res.items[0].quantity
                        }
                    })
                } else {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Error adding gift: ', error);
            });
    }

    document.body.addEventListener('docapp-discount-applied', addGift);
    /* Changes to add free gifts based on discounts - END */
})