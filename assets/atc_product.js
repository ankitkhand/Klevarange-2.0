$(function() {
  console.log('jquery has been initialized');
  // Add to cart form
  let 
  addToCartToCartFormSelector = '.product_mainform',
  productOptionSelector = addToCartToCartFormSelector + ' [name*=option]';

  // create the object full of functions
  let productForm = {
    onProductOptionChanged: function(event){
      let
        $form = $(this).closest(addToCartToCartFormSelector),
        selectedVariant = productForm.getActiveVariant($form),
        selectedMaterial = $(event.target).val();

      // Call the updateColorAvailability function for any variant change
      productForm.checkStockForSelectedMaterial(event);

      $form.trigger('form:change', [selectedVariant]);            
    },
    checkStockForSelectedMaterial: function(event) {

      let $form = $('form.product_mainform'),
      variants = JSON.parse(decodeURIComponent($form.attr('data-variants'))),
      changedOptionName = $(event.target).attr('name'),
      selectedMaterial, size, color;

      let changedValue = $(event.target).val();

      // Assign the values depending on the dropdown changed
      if (changedOptionName.includes('option1')) {
        selectedMaterial = changedValue;
        size = $form.find('input[name=option2]:checked').val();
        color = $form.find('[name=option3]').val();
      } else if (changedOptionName.includes('option2')) {
        size = changedValue;
        selectedMaterial = $form.find('input[name=option1]:checked').val();
        color = $form.find('[name=option3]').val();
      } else {
        color = changedValue;
        selectedMaterial = $form.find('input[name=option1]:checked').val();
        size = $form.find('input[name=option2]:checked').val();
      }

      let allMatchingVariants = [];

      $form.find('.color_divs > div.inside_color_div').addClass('disabled');

      // Iterate through all the color options to check stock for each
      $form.find('[name=option3]').each(function() {
        let currentColor = $(this).val();
        let matchingVariants = variants.filter(variant => 
          variant.option1 === selectedMaterial && 
          variant.option2 === size && 
          variant.option3 === currentColor
        );

        allMatchingVariants = allMatchingVariants.concat(matchingVariants);
        console.log(allMatchingVariants);

        matchingVariants.forEach(variant => {
          let assignedClassName = variant.option3.replace(/\s+/g, '-').toLowerCase();
          if (variant.inventory_quantity > 0 || variant.inventory_policy === 'continue') {
            $('.color_divs > div.' + assignedClassName).removeClass('disabled');
          }
        });
      });

      // after iterating through all colors and checking their stock
      let currentSelectedColor = $form.find('[name=option3]:checked').val();
      let firstAvailableColor = null;

      // Uncheck all color options
      $form.find('[name=option3]').prop('checked', false);
      
      $form.find('[name=option3]').each(function() {
        let currentColor = $(this).val();
        let isDisabled = $('.color_divs > div.' + currentColor.replace(/\s+/g, '-').toLowerCase()).hasClass('disabled');

        // if the current color is the same as the previously selected color and it's available, set it as the first available color
        if (currentColor === currentSelectedColor && !isDisabled) {
          firstAvailableColor = currentColor;
          return false; // Break out of the .each loop since we've found our color
        }
        
        // If no color has been set as the first available color yet and the current color is available, set it.
        if (!firstAvailableColor && !isDisabled) {
          firstAvailableColor = currentColor;
        }

      });

      console.log(firstAvailableColor);

      if (firstAvailableColor) {
        $form.find('[name=option3][value="' + firstAvailableColor + '"]').prop('checked', true);
      }

    },  
    getActiveVariant: function($form){
      let
        // Getting all variants by decoding the current Products to make it readable in JASON format
        variants = JSON.parse(decodeURIComponent($form.attr('data-variants'))),
        // Saving all the data that are in the form in formData Variable
        formData = $form.serializeArray(),
        formOptions = {
          option1: null,
          option2: null,
          option3: null
        },                
        selectedVariant = null;

        $.each(formData, function(index, item){
          // Check if the "name" attribute of the form contains value of "option" or not
          if(item.name.indexOf('option') !== -1){
            formOptions[item.name] = item.value;
          }
        })                
        // Getting selected product variants
        $.each(variants, function(index, variant) {
          if (variant.option1 === formOptions.option1 && variant.option2 === formOptions.option2 && variant.option3 === formOptions.option3) {
            // console.log("Variants Matched");
            selectedVariant = variant;     
            return false;                   
          }
        });
        return selectedVariant;
    },
    validate: function(event, selectedVariant){

      // console.log(selectedVariant);

      //get all the selected values
      let $form = this.closest(".globalatc"),
      $hiddenInput = $form.querySelector("form input.hiddenform"),
      $quantityInput = document.querySelector(".product-form__buttons input.quntityInput"),
      variantNewPrice = $form.querySelector(".price_diff .formattedMainPrice"),
      variantOldPrice = $form.querySelector("span.js-old-price"),
      percentOff = $form.querySelectorAll(".js-percent-off"),
      $addButton = document.querySelector(".product-form__buttons button.addToCartBtn"),
      inventory_quantity = selectedVariant.inventory_quantity,
      inventory_policy = selectedVariant.inventory_policy,
      $addButtonStatus = inventory_quantity <= 0 && inventory_policy === 'deny' ? false : true,
      $rewardPoints = $form.querySelector("span.ssp_js_points"),
      $afterpay = $form.querySelector("span.js-afterpay-payments"),
      $priceDiff = $form.querySelector("span.js-save");

      addToCartButton($addButton, $addButtonStatus, selectedVariant);
      updateURL(selectedVariant);
      updateHiddenInput(selectedVariant, $hiddenInput);
      let updateButtonFrom = document.querySelector('form.buttonproduct input.product-variant-id');
      updateButtonFrom.setAttribute("value", selectedVariant.id);
    
      setQuantityInputValue(selectedVariant, $quantityInput);
      changePrice(selectedVariant, variantNewPrice, variantOldPrice, percentOff, $rewardPoints, $afterpay, $priceDiff);

      // hide compare at price if it is zero
      hideCompareAtPriceElement(selectedVariant);
      // end

      // update the product image based on the varaint image
      updateMedia(selectedVariant); 

      let selectedOptionName = selectedVariant.option1;
      selectedOptionName = selectedOptionName.toLowerCase();

      if (selectedOptionName) {
        if (selectedOptionName.includes('bamboo')) {
          // console.log('yes it contains');
          $('span.availablecolor').show();
          $('.optionColorName').text('Bamboo')
        }else if(selectedOptionName.includes('weave')){
          // console.log('yes it contains');
          $('span.availablecolor').show();
          $('.optionColorName').text('Weave')
        }
        else{
          // console.log('it does not contain');
          $('span.availablecolor').hide();
        }        
      }

      let cottonColorEl = $form.querySelector('.cottonColor');
      if (cottonColorEl && selectedOptionName.includes('cotton')) {
        let selectedColorName = selectedVariant.option3;

        // console.log(selectedColorName);
        cottonColorEl.innerHTML = selectedColorName;
        cottonColorEl.style.display = 'initial';
      }else{
        cottonColorEl.style.display = 'none';
      }
      
    },
    init: function(){
      $(document).on('change', productOptionSelector, productForm.onProductOptionChanged);
      $(document).on('form:change', addToCartToCartFormSelector, productForm.validate);
    }
  }

  productForm.init();

})

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

  if(selectedVariant.inventory_policy === 'continue' && selectedVariant.inventory_quantity <= 0 && selectedVariant.tags.includes("preorder")){
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

function changePrice(selectedVariant, variantNewPrice, variantOldPrice, percentOff, $rewardPoints, $afterpay, $priceDiff) {
  var globalProductVariantPrice = 0,
  globalProductOldPrice = 0;

  if ((selectedVariant.price / 100) % 1 === 0) {
    globalProductVariantPrice = ((selectedVariant.price)/100).toFixed(0);
    variantNewPrice.innerHTML = globalProductVariantPrice;

  }else{
    globalProductVariantPrice = ((selectedVariant.price)/100).toFixed(2);
    // console.log(globalProductVariantPrice);

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

    // to change the difference in price
    let overallPriceDiff = globalProductOldPrice - globalProductVariantPrice;
    $priceDiff.innerHTML = '$' + overallPriceDiff;
    // end
  
  }else{
    variantOldPrice.innerHTML = '$'+(((selectedVariant.compare_at_price)/100).toFixed(2));
    globalProductOldPrice = ((selectedVariant.compare_at_price)/100).toFixed(2);

    // to change the difference in price
    let overallPriceDiff = globalProductOldPrice - globalProductVariantPrice;
    $priceDiff.innerHTML = '$' + overallPriceDiff.toFixed(2);
    // end
  }

  // to calculate the percentage off
  let getpercentOff = ((selectedVariant.compare_at_price - selectedVariant.price)/selectedVariant.compare_at_price) * 100;
  getpercentOff = getpercentOff.toString();
  let decimalPercent = getpercentOff.split('.');

  // console.log(decimalPercent[0]);
  percentOff.forEach(el => {
      el.innerHTML = decimalPercent[0];
  })

  if(document.querySelector('.product_displaytag .toppercentoff .js-percent-off')){
    document.querySelector('.product_displaytag .toppercentoff .js-percent-off').innerHTML = decimalPercent[0]; 
  }

  //console.log(percentOff.toFixed(0));

  // upate reward points
  $rewardPoints.innerHTML = parseInt(globalProductVariantPrice) * 5;

  // update afterpay
  $afterpay.innerHTML = '$' + (parseInt(globalProductVariantPrice) / 4);

  let confirmationTitle = document.querySelector('.please_select_size .customerSelectedSize');
  confirmationTitle.innerHTML = selectedVariant.title;
}
