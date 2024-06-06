/**
* PHP Email Form Validation - v3.7
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

(function () {
  "use strict";

  $(document).ready(function() {
    console.log("Fuckn jQery")
    let forms = document.querySelectorAll('.php-email-form');

    forms.forEach(function(e) {
      e.addEventListener('submit', function(event) {
        event.preventDefault();

        let thisForm = this;

        let action = thisForm.getAttribute('action');
        let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

        if (!action) {
          displayError(thisForm, 'The form action property is not set!');
          return;
        }
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');
        thisForm.querySelector('.form-control').classList.remove('d-block');

        let formData = new FormData(thisForm);

        if (recaptcha) {
          if (typeof grecaptcha !== "undefined") {
            grecaptcha.ready(function() {
              try {
                grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                  .then(token => {
                    formData.set('recaptcha-response', token);
                    php_email_form_submit(thisForm, action, formData);
                  })
              } catch (error) {
                displayError(thisForm, error);
              }
            });
          } else {
            displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
          }
        } else {
          php_email_form_submit(thisForm, action, formData);
        }
      });
    });

    function php_email_form_submit(thisForm, action, formData) {
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`${response.status} ${response.statusText} ${response.url}`);
          }
        })
        .then(data => {
          thisForm.querySelector('.loading').classList.remove('d-block');
          if (data.trim() === 'OK') {
            thisForm.querySelector('.sent-message').classList.add('d-block');
            thisForm.querySelector('.form-control').classList.add('d-block');
            resetFormInputs(thisForm);
          } else {
            displayError(thisForm, data);
          }
        })
        .catch((error) => {
          displayError(thisForm, error);
        });
    }

    function resetFormInputs(form) {
      $(form)[0].reset(); 
    }

    function displayError(thisForm, error) {
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.error-message').innerHTML = error;
      thisForm.querySelector('.error-message').classList.add('d-block');
    }

    document.addEventListener("DOMContentLoaded", function() {
      const form = document.querySelector('.php-email-form');
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        php_email_form_submit(form, form.getAttribute('action'), formData);
      });
    });
  });
})();
