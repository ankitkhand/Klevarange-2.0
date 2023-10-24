window.addEventListener('DOMContentLoaded', function(e) {
    // display free shipping in the information tab
    if (Shopify.Checkout.step == 'contact_information') {
        var freeShippingSectionSecond = document.querySelector('#order-summary .total-line--shipping span.skeleton-while-loading');
        freeShippingSectionSecond.innerHTML = "Free Shipping on all orders over $150 "
    }
    // end

    // to block po box
    if (Shopify.Checkout.step == 'contact_information') {
        console.log('This is a payment method page');
    }

    console.log(Shopify.Checkout.step);
    // end
});


(function($) {
    // to check for po box
    if (Shopify.Checkout.step == 'contact_information') {

    const checkAddressField = document.querySelector('.newssp_checkout .step .step__footer button#continue_button');
    const pobox_update_address = document.querySelector('.newssp_checkout .pobox_inner_contents h3.pobox_update_addrees');
    const address_conf_closeicon = document.querySelector('.addressconfirmation_dialogue h3.close_icon');
    checkAddressField.classList.add("custom_preventdefault");

    //let addressFive, addressSix;
    let addressFive = document.querySelector('#checkout_shipping_address_province').value;
    let addressSix = document.querySelector('#checkout_shipping_address_country').value;

        $(document).on("page:load page:change", function() {

        if (Shopify.Checkout.step === "contact_information") {
            document.querySelector('#checkout_shipping_address_province').addEventListener('change', function(e) {
            addressFive = this.value;
            })
            document.querySelector('#checkout_shipping_address_country').addEventListener('change', function(e) {            
                addressSix = this.value;
            })
        }

        // check po box
        checkAddressField.addEventListener("click", function(e) {

            if (this.classList.contains("custom_preventdefault")) {
                e.preventDefault();
            }
        
            const getAddressValue = document.querySelector('.newssp_checkout .step .field__input-wrapper #checkout_shipping_address_address1').value.toLowerCase().trim().replace(/ /g, "").replace(/[\#\.\_\-]/g, "").replace(/0/g, "o");
        
            if (getAddressValue.includes('pobox') || getAddressValue.includes('postoffice') || getAddressValue.includes('postbox')) {
                e.preventDefault()
                //console.log('po box contains contains');
                document.querySelector('body').classList.add('pobox_message');
            }else{

                let email = document.querySelector('#checkout_email').value;
                let firstName = document.querySelector('#checkout_shipping_address_first_name').value;
                let secondName = document.querySelector('#checkout_shipping_address_last_name').value;
                let address = document.querySelector('#checkout_shipping_address_address1').value;
                let suburb = document.querySelector('#checkout_shipping_address_city').value;
                let state = document.querySelector('#checkout_shipping_address_province').value.toLowerCase();
                let postcode = document.querySelector('#checkout_shipping_address_zip').value;
                let phone = document.querySelector('#checkout_shipping_address_phone').value;
        
                // get address
                if (email && firstName && secondName && address && suburb && state && postcode && phone) {
                    document.querySelector('body').classList.add('confirmation_message');

                    // get address and display while popping up
                    const addressOne = document.querySelector('input#checkout_shipping_address_address1').value;
                    const addressTwo = document.querySelector('input#checkout_shipping_address_address2').value;
                    const addressThree = document.querySelector('input#checkout_shipping_address_city').value;
                    const addressFour = document.querySelector('input#checkout_shipping_address_zip').value;

                    console.log(addressFive);

                    let addressArray = new Array();
                    addressArray = [];
        
                    if (addressOne.length > 2) {
                        addressArray.push(addressOne)
                    }
                    if (addressTwo.length > 2) {
                        addressArray.push(addressTwo)
                    }
                    if (addressThree.length > 2) {
                        addressArray.push(addressThree)
                    }
                    if (addressFour.length > 2) {
                        addressArray.push(addressFour)
                    }

                    if (addressFive.length === 0) {
                        addressFive = document.querySelector('#checkout_shipping_address_province').value;
                        if (addressFive.length > 2) {
                            addressArray.push(addressFive)
                        }
                    }else{
                        addressArray.push(addressFive)
                    }

                    addressArray.push(addressSix)
                    document.querySelector('.addressconfirmation_dialogue .entered_customer_address').innerHTML = addressArray.join(', '); 

                }

                if (!email) {
                    let currentEl = document.querySelector('#checkout_email');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(!firstName){
                    let currentEl = document.querySelector('#checkout_shipping_address_first_name');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(!secondName){
                    let currentEl = document.querySelector('#checkout_shipping_address_last_name');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(!address){
                    let currentEl = document.querySelector('#checkout_shipping_address_address1');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(!suburb){
                    let currentEl = document.querySelector('#checkout_shipping_address_city');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(state === 'state/territory'){
                    console.log('suburb is empty');
                    let currentEl = document.querySelector('#checkout_shipping_address_province');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(!postcode){
                    let currentEl = document.querySelector('#checkout_shipping_address_zip');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }
                
                if(!phone){
                    let currentEl = document.querySelector('#checkout_shipping_address_phone');
                    let nearestdiv = currentEl.closest('.field--required');
                    nearestdiv.classList.add('field--error');
                }


            }
        
        })

        document.querySelector('.addressconfirmation_dialogue h3.pobox_update_addrees').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('body').classList.remove('confirmation_message');
            document.querySelector('.addressconfirmation_dialogue .spinner').style.opacity = "1";
            checkAddressField.classList.remove('custom_preventdefault');
            document.querySelector('.step__footer button#continue_button').click();  
        })
        
        pobox_update_address.addEventListener('click', function(e) {
            e.preventDefault();
            //console.log('close po box dialogue');
            document.querySelector('body').classList.remove('pobox_message');
        })
        // end of po box

        // close address confirmation
        address_conf_closeicon.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('body').classList.remove('confirmation_message');
        })
        


        });

    }
    
})(Checkout.$);