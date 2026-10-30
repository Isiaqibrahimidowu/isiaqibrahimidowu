document.addEventListener("DOMContentLoaded", function () {
    // Mobile navigation
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("open");

            const isOpen = navMenu.classList.contains("open");
            menuBtn.setAttribute("aria-expanded", isOpen);
            menuBtn.textContent = isOpen ? "×" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.textContent = "☰";
            });
        });
    }

    // Automatically update the footer year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Contact form validation
    const form = document.getElementById("contactForm");

    if (form) {
        const status = document.getElementById("formStatus");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            const fields = [
                {
                    input: name,
                    valid: name.value.trim().length >= 2,
                    error: "Enter your name (at least 2 characters)."
                },
                {
                    input: email,
                    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
                    error: "Enter a valid email address."
                },
                {
                    input: subject,
                    valid: subject.value !== "",
                    error: "Please choose a subject."
                },
                {
                    input: message,
                    valid: message.value.trim().length >= 10,
                    error: "Enter a message of at least 10 characters."
                }
            ];

            let allValid = true;

            fields.forEach(function (field) {
                const errorBox = field.input.nextElementSibling;

                field.input.classList.toggle("invalid", !field.valid);
                errorBox.textContent = field.valid ? "" : field.error;

                if (!field.valid) {
                    allValid = false;
                }
            });

            if (allValid) {
                status.textContent =
                    "All fields are valid! This demonstration form does not send emails.";
            } else {
                status.textContent =
                    "Please correct the highlighted fields and try again.";

                const firstInvalid = form.querySelector(".invalid");

                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    }
});