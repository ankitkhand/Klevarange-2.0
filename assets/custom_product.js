if ((typeof Shopify) === 'undefined') { window.Shopify = {}; }
if ((typeof Shopify.getCart) === 'undefined') {
  Shopify.getCart = function(callback, cart) {
    if(!cart){
    return jQuery.getJSON('/cart.js', function (cart, textStatus, xhr) {
        if ((typeof callback) === 'function') {
        callback(cart,textStatus, xhr);
      }
      else {
        Shopify.onCartUpdate(cart);
          }
      });
    }else{
      if ((typeof callback) === 'function') {
      callback(cart);
    }else if(typeof Shopify.onCartUpdate ==='function') {
      Shopify.onCartUpdate(cart);
        }
    }
  };
}

// for popup while clicking on icon
let productZoomIcon = document.querySelector('#product-top .single-nav-img svg.customimagezoom');
productZoomIcon.addEventListener('click', function(e){
  e.preventDefault();

  console.log('Product zoom icon clicked');

  let activeZoomIcon = this.closest('.single-nav-img').querySelector('.img_producto_container.is-selected a.fslightbox');
  activeZoomIcon.click();

})
// end

// const { publishEvent } = require('./events.js');

//Get all the variant options
// var variantOptions = document.querySelectorAll('.variant-option');

//function to find the selected variant
// function findSelectedVariant(variants, selectedValues) {
//   return variants.find(variant => {
//     var variantOptions = variant.options;
//     var selectedOptions = selectedValues.map(function(value, index) {
//       return { name: variantOptions[index].name, value: value };
//     }).sort(function(a, b) { // order the select variants if it has multiple variant options 
//       var indexA = variantOptions.findIndex(function(option) { return option.name === a.name; });
//       var indexB = variantOptions.findIndex(function(option) { return option.name === b.name; });
//       return indexA - indexB;
//     }).map(function(option) {
//       return option.value;
//     }).join(',');

//     return variant.options.join(',') === selectedOptions;
//   });
// } 

//loop through each variant option
// variantOptions.forEach(function(option) {
//     //add change event listener to each option
//     option.addEventListener('change', function() {
//         var selectedValues = [];

//         variantOptions.forEach(function(selectedOption) {
//             selectedValues.push(selectedOption.value);
//         });

//         var variants = window.productVariants;
//         var selectedVariant = findSelectedVariant(variants, selectedValues);

//         //get all the selected values
//         let $form = this.closest(".globalatc"),
//         $hiddenInput = $form.querySelector("form input.hiddenform"),
//         $quantityInput = document.querySelector(".product-form__buttons input.quntityInput"),
//         variantNewPrice = $form.querySelector(".price_diff .formattedMainPrice"),
//         variantOldPrice = $form.querySelector("span.js-old-price"),
//         percentOff = $form.querySelectorAll(".js-percent-off"),
//         $addButton = document.querySelector(".product-form__buttons button.addToCartBtn"),
//         inventory_quantity = selectedVariant.inventory_quantity,
//         inventory_policy = selectedVariant.inventory_policy,
//         $addButtonStatus = inventory_quantity <= 0 && inventory_policy === 'deny' ? false : true,
//         $rewardPoints = $form.querySelector("span.ssp_js_points"),
//         $afterpay = $form.querySelector("span.js-afterpay-payments"),
//         $priceDiff = $form.querySelector("span.js-save");

//         // console.log(selectedVariant);
//         // console.log('Button Status: ' + $addButtonStatus);
        
//         // console.log($quantityInput);

//         addToCartButton($addButton, $addButtonStatus, selectedVariant);
//         updateURL(selectedVariant);
//         updateHiddenInput(selectedVariant, $hiddenInput);
//         let updateButtonFrom = document.querySelector('form.buttonproduct input.product-variant-id');
//         updateButtonFrom.setAttribute("value", selectedVariant.id);
      
//         setQuantityInputValue(selectedVariant, $quantityInput);
//         changePrice(selectedVariant, variantNewPrice, variantOldPrice, percentOff, $rewardPoints, $afterpay, $priceDiff);

//         // hide compare at price if it is zero
//         hideCompareAtPriceElement(selectedVariant);
//         // end

//         // update the product image based on the varaint image
//         updateMedia(selectedVariant);

//     });
// });

// Get all the variant options (radio buttons and select dropdowns)
var variantRadioButtons = document.querySelectorAll('.variant-radio');
var variantSelects = document.querySelectorAll('.variant-option');

// Function to find the selected variant
function findSelectedVariant(variants, selectedValues) {
  // Convert the array of selected values into a comma-separated string
  const selectedValuesString = selectedValues.join(',');

  // Find the variant that matches the selected values
  const selectedVariant = variants.find(variant => {
    // Convert the array of variant options into a comma-separated string
    const variantOptionsString = variant.options.join(',');

    // Compare the variant's options with the selected values
    return variantOptionsString === selectedValuesString;
  });

  return selectedVariant;
}

// Function to handle variant changes
function handleVariantChange() {
  var selectedValues = [];
  var clickedRadio = this;

  // Loop through all radio buttons
  variantRadioButtons.forEach(function(radio) {
    // Check if the radio button is currently checked
    if (radio.checked) {
      // Push the value of the checked radio button to the selectedValues array
      selectedValues.push(radio.value);
    }

    // remove the active class from all radio buttons
    radio.closest('div').querySelector('label').classList.remove('active');

    // add the active class to the clciked radio button
    clickedRadio.closest('div').querySelector('label').classList.add('active');
  });


  // Loop through all select dropdowns
  variantSelects.forEach(function(select) {
    // Push the value of the selected option in the dropdown to the selectedValues array
    selectedValues.push(select.value);
  });

  // Get the list of product variants (assuming it's defined globally)
  var variants = window.productVariants;

  // Call the findSelectedVariant function to find the selected variant object
  var selectedVariant = findSelectedVariant(variants, selectedValues);

  // Check if a selected variant was found
  if (selectedVariant) {
    // Log the selected variant object to the console
    console.log(selectedVariant);

    // get all the selected values

    let $form = this.closest(".globalatc"),
    $hiddenInput = $form.querySelector("form input.hiddenform"),
    $quantityInput = document.querySelector(".product-form__buttons input.quntityInput"),
    variantNewPrice = $form.querySelector(".price_diff .formattedMainPrice"),
    variantCent = $form.querySelector(".price_diff .formattedCentsPrice"),
    variantOldPrice = $form.querySelector("span.js-old-price"),
    percentOff = $form.querySelectorAll(".js-percent-off"),
    $addButton = document.querySelector(".product-form__buttons button.addToCartBtn"),
    inventory_quantity = selectedVariant.inventory_quantity,
    inventory_policy = selectedVariant.inventory_policy,
    $addButtonStatus = inventory_quantity <= 0 && inventory_policy === 'deny' ? false : true,
    $rewardPoints = $form.querySelector("span.ssp_js_points"),
    $afterpay = $form.querySelector("span.js-afterpay-payments"),
    $priceDiff = $form.querySelector("span.js-save"),
    $tags = selectedVariant.tags;
    // console.log('Button Status: ' + $addButtonStatus);
    
    // console.log($quantityInput);

    addToCartButton($addButton, $addButtonStatus, selectedVariant);
    updateURL(selectedVariant);
    updateHiddenInput(selectedVariant, $hiddenInput);
    let updateButtonFrom = document.querySelector('form.buttonproduct input.product-variant-id');
    updateButtonFrom.setAttribute("value", selectedVariant.id);
  
    setQuantityInputValue(selectedVariant, $quantityInput);
    changePrice(selectedVariant, variantNewPrice, variantCent, variantOldPrice, percentOff, $rewardPoints, $afterpay, $priceDiff);

    // hide compare at price if it is zero
    hideCompareAtPriceElement(selectedVariant);
    // end

    // update the product image based on the varaint image
    updateMedia(selectedVariant);
  }
}

// Add event listeners to radio buttons
variantRadioButtons.forEach(function(radio) {
  radio.addEventListener('click', handleVariantChange);
});

// Add event listeners to select dropdowns
variantSelects.forEach(function(select) {
  select.addEventListener('change', handleVariantChange);
});

function hideCompareAtPriceElement(selectedVariant) {
  if (selectedVariant.compare_at_price <= 0) {
    document.querySelector('.product-action').classList.add('hide_compare_at');
  }else{
    document.querySelector('.product-action').classList.remove('hide_compare_at');
  }

}

function addToCartButton($addButton, $addButtonStatus, selectedVariant) {
    // to make add to cart button enable or disable
    $addButton.disabled = !$addButtonStatus;

    if ($addButton.hasAttribute('disabled')) {
        $addButton.classList.add('disabled');
        return $addButton.querySelector('span').innerHTML = "Sold Out";
    }

    $addButton.classList.remove('disabled');
  
    if(selectedVariant.inventory_policy === 'continue' && selectedVariant.inventory_quantity <= 0 && selectedVariant.tags.includes("preorder")){
        $addButton.querySelector('span').innerHTML = "Pre Order";
        return;
    }
  
    return $addButton.querySelector('span').innerHTML = "Add to Cart";
}

function updateURL(selectedVariant) {
    window.history.replaceState(null, null, `?variant=${selectedVariant.id}`);
}

function updateHiddenInput(selectedVariant, $hiddenInput) {
    $hiddenInput.value = selectedVariant.id;
    let updateButtonFrom = document.querySelector('form.buttonproduct input.product-variant-id');
    updateButtonFrom.setAttribute("value", selectedVariant.id);
}

function setQuantityInputValue(selectedVariant, $quantityInput) {
    $quantityInput.value = 1;

    if(selectedVariant.inventory_policy === 'continue' && selectedVariant.inventory_quantity <= 0){
      $quantityInput.setAttribute("max", 12);
      return;
    }
  
    $quantityInput.setAttribute("max", selectedVariant.inventory_quantity);
}

function updateMedia(selectedVariant) {
    if (!selectedVariant) return;
    if (!selectedVariant.featured_media) return;
    var current_media_id = selectedVariant.featured_media.id;
  
    // For product page with flickity
    if (document.querySelector('.product__image-slider')) {
  
      var media_len = document.querySelector('.product__image-slider .flickity-slider').childElementCount;
      
      var media_id_array = [];
      for (let i = 0; i < media_len; i++) {
        
        media_id_array.push(parseInt(document.querySelector('.product__image-slider').querySelectorAll("img")[i].getAttribute('data-media-id')));
      }
      flkty.select(media_id_array.indexOf(current_media_id));
    }
    // For featured products on homepage without flickity
    else if (document.querySelector('.product__media-list')) {
      var featured_product_media_len = document.querySelector('.product__media-list').childElementCount;
      for (let i = 0; i < featured_product_media_len; i++) {
        var child = document.querySelector('.product__media-list').children[i];
        if (child.getAttribute('data-media-id').indexOf(current_media_id) > 0) {
          child.style.display = "block";
        } else {
          child.style.display = "none";
        }
      }
    }
  } 

  function changePrice(selectedVariant, variantNewPrice, variantCent, variantOldPrice, percentOff, $rewardPoints, $afterpay, $priceDiff) {
    var globalProductVariantPrice = 0,
        globalProductOldPrice = 0;
  
      if ((selectedVariant.price / 100) % 1 === 0) {
        globalProductVariantPrice = ((selectedVariant.price)/100).toFixed(0);
        variantNewPrice.innerHTML = globalProductVariantPrice;
  
        variantCent.style.display = 'none';
  
      }else{
        globalProductVariantPrice = ((selectedVariant.price)/100).toFixed(2);
        // console.log(globalProductVariantPrice);
  
        variantCent.style.display = 'block';
  
        // Convert the number to a string
        const numberString = globalProductVariantPrice.toString();
        // Find the index of the decimal point
        const decimalIndex = numberString.indexOf('.');
        // Extract the substring after the decimal point
        const digitsAfterDecimal = numberString.substring(decimalIndex + 1);
  
  
        variantCent.innerHTML = '.'+digitsAfterDecimal;
  
  
        // convert to string
        let stringVariantPrice = globalProductVariantPrice.toString();
  
        // split the price starting from . and store in an array
        let intergerpart = stringVariantPrice.split('.');
        //console.log(globalProductVariantPrice);
        variantNewPrice.innerHTML = intergerpart[0];
      }
  
      if ((selectedVariant.compare_at_price / 100) % 1 === 0) {
        console.log(((selectedVariant.compare_at_price)/100).toFixed(0));
        variantOldPrice.innerHTML = '$'+((selectedVariant.compare_at_price)/100).toFixed(0);
  
        globalProductOldPrice = ((selectedVariant.compare_at_price)/100).toFixed(0);
      
      }else{
        variantOldPrice.innerHTML = '$'+(((selectedVariant.compare_at_price)/100).toFixed(2));
        globalProductOldPrice = ((selectedVariant.compare_at_price)/100).toFixed(2);
      }
  
      // to display the saving price
      let overallPriceDiff = (globalProductOldPrice - globalProductVariantPrice)/4;
      $priceDiff.innerHTML = '$' + twoDigitDecimals(globalProductOldPrice - globalProductVariantPrice);
      //
  
      // to calculate the percentage off
      let getpercentOff = ((selectedVariant.compare_at_price - selectedVariant.price)/selectedVariant.compare_at_price) * 100;
      getpercentOff = getpercentOff.toString();
      let decimalPercent = getpercentOff.split('.');
  
      // console.log(decimalPercent[0]);
      percentOff.forEach(el => {
          el.innerHTML = decimalPercent[0];
      })
  
      document.querySelector('.product_displaytag .toppercentoff .js-percent-off').innerHTML = decimalPercent[0];
  
      //console.log(percentOff.toFixed(0));
  
      // upate reward points
      $rewardPoints.innerHTML = parseInt(globalProductVariantPrice) * 5;
  
      // update afterpay
      let $newafterpayPrice = selectedVariant.price/4;
      $afterpay.innerHTML = '$' + ((selectedVariant.price/4/100).toFixed(2));
      console.log(globalProductVariantPrice/4);
      // twoDigitDecimals()
      // end afterpay
  
      let confirmationTitle = document.querySelector('.please_select_size .customerSelectedSize');
      confirmationTitle.innerHTML = selectedVariant.title;
  }

  function twoDigitDecimals(num){
    if ((num/100) % 1 === 0) {
      console.log('yo');
      return (num).toFixed(0);
    }else{
      console.log('ya');
      return (num).toFixed(2);
    }
  }

// update input quantity value
let quantityPicker = document.querySelectorAll('.quantity-selector span.quantitybutton');
let input = document.querySelector('.quantity-selector input.quantity__input');
quantityPicker.forEach(qp => {
    qp.addEventListener('click', function(e) {
        e.preventDefault();

        if (this.classList.contains("quantity_minus")) {
            // console.log('minus quantity clicked');

            if (input.value > input.min) {
                input.value = parseInt(input.value) - 1;
            }

            if (input.value <= input.min) {
                this.setAttribute("disabled", true);
            }else{
                this.removeAttribute("disabled");
            }

            this.closest('.quantity-selector').querySelector('.quantity_plus').removeAttribute("disabled");

        }else if (this.classList.contains("quantity_plus")) {
            // console.log('plus quantity clicked');

            if (parseInt(input.value) < parseInt(input.max)) {
              input.value = parseInt(input.value) + 1;
            }

            if (parseInt(input.value) >= parseInt(input.max)) {
              this.setAttribute("disabled", true);
            }

            this.closest('.quantity-selector').querySelector('.quantity_minus').removeAttribute("disabled");
        }

    })
})
// end

// to have opacity after some seconds
setTimeout(() => {
    document.querySelector(".product__image-thumbnail").style.opacity = 1;
    // document.querySelector('.firstProductImg').style.opacity = 0;
    // document.querySelector('.firstProductImg').style.zIndex = -1;

    //document.querySelector('.single-nav-img').classList.add('rmbg');

}, 500);

setTimeout(() => {
    let flickityButtons = document.querySelectorAll('.flickity-button');
    flickityButtons.forEach(button => {
        button.style.opacity = 1;
    });
}, 100);

// to add the loading class in the ATC button while clicking on it
let productATCBtn = document.querySelector('.product-action .add_btn');
// productATCBtn.addEventListener('click', function (e) {
//     //e.preventDefault();
    
//     var productID = this.closest('form').querySelector('input.hiddenform').value;
//     productATCBtn.classList.add('load');
//     console.log(productID);

//     // retrieve the contents of the cart to see if the produc thas been added
//     fetch('/cart.js')
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(cart) {
//             // check if the product is in the cart
//             var productInCart = false;
//             for (let j = 0; j < cart.items.length; j++) {
//                 if (cart.items[j].id === productID ) {
//                     productInCart = true;
//                     break;
//                 }
//             }

//             // remove the 'load' class once the cart has been updated
//             setTimeout(() => {
//                 productATCBtn.classList.remove('load');                
//             }, 1500);

//         })
//         .catch(function(error) {
//             console.error('Error Checking if the product is in the cart: ', error);
//         })

// })
// end
// productATCBtn.addEventListener('click', function(e) {
//     e.preventDefault();

//     let formData = new FormData(document.querySelector('.product_mainform'));

//     console.log('ATC button clicked');
       
//     fetch(window.Shopify.routes.root + 'cart/add.js', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         return response.json();
//     })
//     .then(response => {
//         console.log(response);

//         // run ajax to update the sidecart

//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// })
//

let cartSection = document.querySelector('.drawer .js-contents');

const ajaxify = {
    onAddToCart: function(event) {
      event.preventDefault();
      
      const formData = new FormData(document.querySelector('.product_mainform'));

      // if (this.classList.contains('js-disabled-add-to-cart')) {
      //   this.closest('.product-action').querySelector('.please_select_size').style.display = 'grid';
      // }else{
      //   document.querySelector('.global_quantity_selector .add-to-cart').classList.add('loadingAnimation');
      // }

      if (this.classList.contains('yes')) {
        // console.log('disabled add to cart');
        this.closest('.please_select_size').style.display = 'none';
        // document.querySelector('.global_quantity_selector .add-to-cart').classList.add('loadingAnimation');
        document.querySelector('.add-to-cart button.addToCartBtn').classList.remove('js-disabled-add-to-cart');
        document.querySelector('.add-to-cart button.addToCartBtn').click();

        setTimeout(() => {
          document.querySelector('.add-to-cart button.addToCartBtn').classList.add('js-disabled-add-to-cart');
        }, 400);
      }
      
      // if (this.classList.contains('js-disabled-add-to-cart')){
      //   return;
      // }
  
      // fetch('/cart/add.js', {
      //     method: 'POST',
      //     body: formData
      //   })
      //   .then(response => {
      //     return response.json();
      //   })
      //   .then(response => {
      //     Shopify.getCart(function(cart) {
      //       ajaxify.onCartUpdated(response);
      //     }.bind(this));  
      //   })
      //   .catch(error => {
      //     ajaxify.onError(error);
      //   });
    },
  
    onCartUpdated: function(cart) {
      fetch('/cart', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then(response => {
          return response.text();
        })
        .then(html => {
            // Replace the cart section with the updated HTML
            let tempDiv = document.createElement('div');
            console.log(tempDiv);

            tempDiv.innerHTML = html

            // for cart bage items
            let cartItems = tempDiv.querySelector('.header #cart-icon-bubble');
            // end

            let cartContents = tempDiv.querySelector('.js-contents');

            $('.drawer__contents').html(cartContents);
            $('#CartDrawer-CartErrors').html('');
            $('.drawer').removeClass('is-empty');
            $('.drawer__inner-empty').hide();
            $('cart-drawer-items').removeClass();
            $('#CartDrawer-Checkout').attr('disabled' , false);

            $.getJSON("/cart.js", function(cart) {
            // Shopify.getCart(function(cart) {  
              console.log(cart.item_count);
              // top upate the cart items
              $('.header #cart-icon-bubble').html(cartItems);

              // remove loading animation
              document.querySelector('.global_quantity_selector .add-to-cart').classList.remove('loadingAnimation');
              // end

              let itemSubtoTotalPrice = cart.items_subtotal_price;
              if ((itemSubtoTotalPrice / 100) % 1 === 0) {
                itemSubtoTotalPrice = ((itemSubtoTotalPrice)/100).toFixed(0);
              }else{
                itemSubtoTotalPrice = itemSubtoTotalPrice / 100;
              }

              $(' cart-drawer p.totals__subtotal-value').html('$'+addCommas(itemSubtoTotalPrice)+' AUD');

              // to update shipping status
              if (parseInt(itemSubtoTotalPrice) >= 150) {
                $(' cart-drawer .shippingstatus').html('Free');
              }else{
                $(' cart-drawer .shippingstatus').html('$9.95');
              }
              // end

            });

            cartSection.innerHTML = cartContents.innerHTML;         
            document.getElementsByClassName('drawer')[0].classList.add('active');
            // $('body').css('overflow','hidden');
        })
        .catch(error => {
          ajaxify.onError(error);
        });
    },
  
    onError: function(error) {
      alert(error);
    },
  
    init: function() {
      // document.querySelector('.product-action button.addToCartBtn').addEventListener('click', ajaxify.onAddToCart);
      document.querySelector('.confirm_select_size button.yes').addEventListener('click', ajaxify.onAddToCart);
    }
  };

function addCommas(num) {
  // Convert the number to a string
  var str = num.toString();
  
  // Split the string into two parts: the integer part and the decimal part
  var parts = str.split('.');
  var integerPart = parts[0];
  var decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  
  // Split the integer part into an array of digits
  var digits = integerPart.split('');
  
  // Reverse the array of digits
  digits.reverse();
  
  // Create an empty array to hold the new string
  var newStr = [];
  
  // Loop through the array of digits
  for (var i = 0; i < digits.length; i++) {
    // Add a comma every three digits
    if (i % 3 === 0 && i !== 0) {
      newStr.push(',');
    }
    // Add the current digit to the new array
    newStr.push(digits[i]);
  }
  
  // Reverse the array again and join the digits into a string
  var finalStr = newStr.reverse().join('');
  
  // Add the decimal part back to the string
  finalStr += decimalPart;
  
  // Return the final string
  return finalStr;
}

  
  ajaxify.init();
  // revy upsell
  // window.Shopify.ajaxify = ajaxify;
  // end


  function confirmMessage(){
    // Get all buttons with class "js-disabled-add-to-cart"
    const buttons = document.querySelectorAll("button.js-disabled-add-to-cart");
    
    // Add a click event listener to each button
    buttons.forEach(function(button) {
      button.addEventListener("click", function(event) {
        event.preventDefault();
    
        // Set the color of all buttons with class "js-add-to-cart-button" to white
        const addButtons = document.querySelectorAll('.add_btn button.js-add-to-cart-button');
        addButtons.forEach(function(addButton) {
          addButton.style.color = 'white';
        });
    
        // Get the closest form element to the clicked button
        const formTag = button.closest('form');
    
        // Display the element with class "please_select_size"
        const displaySelectMsg = document.querySelector('.please_select_size');
        displaySelectMsg.style.display = 'block';
      });
    }); 
  }


  let confirmNoBtn = document.querySelector('.confirm_select_size button.no');
  let confirmYesBtn = document.querySelector('.confirm_select_size button.yes');

  confirmNoBtn.addEventListener("click", function(e) {
    e.preventDefault();
    this.closest('.please_select_size').style.display = 'none';

  }); 

  // zoom image on hover
  window.addEventListener("DOMContentLoaded", function() {
    const imgProductoContainers = document.querySelectorAll(".img_producto_container");
  
    imgProductoContainers.forEach(function(container) {
      container.addEventListener("mouseover", function() {
        const imgProducto = this.querySelector(".img_producto");
        imgProducto.style.transform = `scale(${this.getAttribute("data-scale")})`;
      });
  
      container.addEventListener("mouseout", function() {
        const imgProducto = this.querySelector(".img_producto");
        imgProducto.style.transform = "scale(1)";
      });
  
      container.addEventListener("mousemove", function(e) {
        const imgProducto = this.querySelector(".img_producto");
        const x = ((e.pageX - this.offsetLeft) / this.offsetWidth) * 50;
        const y = ((e.pageY - this.offsetTop) / this.offsetHeight) * 50;
        imgProducto.style.transformOrigin = `${x}% ${y}%`;
      });
    });
  });
  
  // end
