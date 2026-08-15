// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navbar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


// Close mobile navigation after clicking a link

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ==========================================
// HERO SLIDESHOW
// ==========================================

const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.getElementById("heroDots");

let currentSlide = 0;


// Create slideshow dots

slides.forEach((slide, index) => {

    const dot = document.createElement("span");

    dot.classList.add("hero-dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);

});


const dots = document.querySelectorAll(".hero-dot");


function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;

}


// Automatically change slides

setInterval(() => {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 6000);


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Use the backend locally, but use the same domain after deployment
const API_BASE_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : "";


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const subject =
        document.getElementById("subject").value;

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please complete all required fields.";

        return;

    }


    formMessage.textContent =
        "Sending your message...";


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/messages`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message
                })
            }
        );


        // Check that the server actually returned JSON
        const contentType =
            response.headers.get("content-type") || "";


        if (!contentType.includes("application/json")) {

            const text = await response.text();

            console.error(
                "Server returned non-JSON response:",
                text
            );

            throw new Error(
                "The server returned an unexpected response."
            );

        }


        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Something went wrong."
            );

        }


        formMessage.textContent =
            "Thank you. Your message has been received.";

        formMessage.style.color = "#3f6b4f";


        contactForm.reset();


    } catch (error) {

        console.error("Contact form error:", error);

        formMessage.textContent =
            "We could not send your message. Please try again.";

        formMessage.style.color = "#b42318";

    }

});
// ==========================================
// CURRENT YEAR
// ==========================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ==========================================
// HEADER SHADOW ON SCROLL
// ==========================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 30px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});