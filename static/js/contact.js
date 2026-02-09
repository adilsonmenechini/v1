async function handleFormspreeSubmit(event) {
  event.preventDefault();
  var form = document.getElementById("contact-form");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        contactAlert("success", "Thanks for your submission!");
        form.reset();
      } else {
        response.json().then((data) => {
          var errMessage = data.errors;
          for (var i = 0; i < errMessage.length; i++) {
            contactAlert("danger", errMessage[i].message);
          }
        });
      }
    })
    .catch((error) => {
      contactAlert("danger", "Oops! There was a problem submitting your form");
    });
}

function contactAlert(type, message) {
  var contactFormStatus = document.getElementById("contact-form-status");
  
  // Create alert element safely to prevent XSS
  var alert = document.createElement('div');
  alert.className = `alert alert-${type} d-flex align-items-center`;
  alert.setAttribute('role', 'alert');
  
  // SVG icon
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'bi flex-shrink-0 me-2');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Success:');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('fill', 'currentColor');
  var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('xlink:href', '#check-circle-fill');
  svg.appendChild(use);
  
  // Message div - use textContent to prevent XSS
  var messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  
  // Close button
  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('data-bs-dismiss', 'alert');
  closeBtn.setAttribute('aria-label', 'Close');
  
  alert.appendChild(svg);
  alert.appendChild(messageDiv);
  alert.appendChild(closeBtn);
  
  // Replace entire content safely
  contactFormStatus.innerHTML = '';
  contactFormStatus.appendChild(alert);

  // Remove alert after 3 seconds
  setTimeout(function () {
    contactFormStatus.innerHTML = '';
  }, 3000);
}
