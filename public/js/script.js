(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function storeScrollPos() {
  sessionStorage.setItem("scrollPos", window.scrollY);
}

window.addEventListener("load", function () {
  let scrollPos = sessionStorage.getItem("scrollPos");
  if (scrollPos) {
    window.scrollTo(0, scrollPos);
    sessionStorage.removeItem("scrollPos"); // Remove it after use
  }
});

// function storeScrollPos() {
//   sessionStorage.setItem("scrollPos", window.scrollY);
// }

// window.addEventListener("DOMContentLoaded", function () {
//   let scrollPos = sessionStorage.getItem("scrollPos");
//   if (scrollPos) {
//     history.scrollRestoration = "manual";
//     window.scrollTo(0, scrollPos);
//     sessionStorage.removeItem("scrollPos");
//   }
//   document.body.style.visibility = "visible"; // Show the page after positioning
// });

// function storeScrollPos() {
//   sessionStorage.setItem("scrollPos", window.scrollY);
// }

// window.addEventListener("DOMContentLoaded", function () {
//   let scrollPos = sessionStorage.getItem("scrollPos");

//   // Disable smooth scrolling to prevent animation
//   if (scrollPos) {
//     history.scrollRestoration = "manual";
//     window.scrollTo(0, scrollPos);
//     sessionStorage.removeItem("scrollPos");
//   }
// });

// Ensure scroll restoration is manual to prevent unwanted scrolling
 