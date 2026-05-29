if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {

    // --------------------
    // NAV INDICATOR
    // --------------------
    const links = document.querySelectorAll(".nav-list > li:not(.dropdown) > a");
    const indicator = document.querySelector(".indicator");

    function moveIndicator(el) {
        indicator.style.width = el.offsetWidth + "px";
        indicator.style.left = el.offsetLeft + "px";
    }

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            moveIndicator(link);
        });
    });

    window.addEventListener("load", () => {
        const active = document.querySelector(".nav-list a.active");
        if (active) moveIndicator(active);
    });

    window.addEventListener("resize", () => {
        const active = document.querySelector(".nav-list a.active");
        if (active) moveIndicator(active);
    });

    // --------------------
    // SIDEBAR
    // --------------------
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector("#sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });
    }

    // --------------------
    // ABOUT SCROLL ANIMATION
    // --------------------
    const about = document.querySelector(".about-content");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    if (about) observer.observe(about);

    // --------------------
    // ABOUT IMAGE LAYER SWAP
    // --------------------
    const layeredImages = document.querySelectorAll(".ab-img img");
    let activeLayeredImage = document.querySelector(".ab-img .white");

    function setFrontImage(image) {
        if (!image || image === activeLayeredImage) return;

        activeLayeredImage = image;

        layeredImages.forEach(layeredImage => {
            const isFront = layeredImage === activeLayeredImage;

            layeredImage.classList.toggle("is-front", isFront);
            layeredImage.classList.toggle("is-back", !isFront);
            layeredImage.setAttribute("aria-pressed", String(isFront));
        });
    }

    if (layeredImages.length) {
        layeredImages.forEach(layeredImage => {
            const isFront = layeredImage === activeLayeredImage;

            layeredImage.classList.toggle("is-front", isFront);
            layeredImage.classList.toggle("is-back", !isFront);
            layeredImage.setAttribute("role", "button");
            layeredImage.setAttribute("tabindex", "0");
            layeredImage.setAttribute("aria-pressed", String(isFront));

            layeredImage.addEventListener("click", () => {
                setFrontImage(layeredImage);
            });

            layeredImage.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFrontImage(layeredImage);
                }
            });
        });
    }

    // --------------------
    // HERO FADE-IN ANIMATION
    // --------------------
    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add("show");
        }, 200);
    }

    // --------------------
    // SLIDER
    // --------------------
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    let index = 0;
    let autoplay;

    function showSlide(i) {
        if (!slides.length) return;

        index = (i + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === index);
        });
    }

    function nextSlide() {
        showSlide(index + 1);
    }

    function prevSlide() {
        showSlide(index - 1);
    }

    function startAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(nextSlide, 3000);
    }

    if (slides.length) {
        showSlide(0);
        startAutoplay();
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startAutoplay();
        });
    }

    // --------------------
    // WPC PANEL FOCUS
    // --------------------
    const wpcCards = document.querySelectorAll(".wpc-card");

    wpcCards.forEach(card => {
        card.addEventListener("click", () => {
            wpcCards.forEach(wpcCard => {
                const isActive = wpcCard === card;

                wpcCard.classList.toggle("is-active", isActive);
                wpcCard.setAttribute("aria-pressed", String(isActive));
            });
        });
    });

});


// --------------------
// WPC FADE IN ANIMATION
// --------------------
const wpcheading = document.querySelector(".wpc-heading");

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            wpcheading.classList.add("show");
        }
    });
}, { threshold: 0.2 });

observer1.observe(wpcheading);

const cards = document.querySelectorAll(".wpc-card");
const wpcSection = document.querySelector("#wpc-panels");

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add("show");
                }, i * 120);
            });

        }
    });
}, { threshold: 0.2 });

observer2.observe(wpcSection);


// --------------------
// FIXED SMOOTH SCROLL (ANCHORS)
// --------------------
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

const mdfElements = document.querySelectorAll(".mdf-heading, .mdf-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });
}, {
    threshold: 0.2
});

mdfElements.forEach((element) => {
    observer.observe(element);
});