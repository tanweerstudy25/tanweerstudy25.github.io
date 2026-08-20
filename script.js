/* =========================================================
   TANWEER PORTFOLIO - MAIN JAVASCRIPT
   DARK ↔ LIGHT THEME + VISITOR COUNTER
   ========================================================= */


/* =========================================================
   1. DARK / LIGHT THEME
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle
        ? themeToggle.querySelector("i")
        : null;


/* Load saved theme */

let currentTheme =
    localStorage.getItem("tanweerTheme");


/* Reset old theme values */

if (
    currentTheme !== "dark" &&
    currentTheme !== "light"
) {
    currentTheme = "dark";
}


/* Apply theme */

function applyTheme() {

    document.body.classList.remove(
        "theme-purple",
        "theme-green",
        "theme-light"
    );


    /* WHITE / LIGHT */

    if (currentTheme === "light") {

        document.body.classList.add(
            "theme-light"
        );

        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-sun";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "title",
                "Switch to Dark Theme"
            );
        }

    }


    /* DARK */

    else {

        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-moon";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "title",
                "Switch to White Theme"
            );
        }

    }


    localStorage.setItem(
        "tanweerTheme",
        currentTheme
    );

}


/* Theme button click */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            if (currentTheme === "dark") {
                currentTheme = "light";
            }
            else {
                currentTheme = "dark";
            }

            applyTheme();

        }
    );

}


/* Apply theme when page opens */

applyTheme();

/* =========================================================
   MOBILE NAVIGATION MENU
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const menuIcon =
    menuToggle
        ? menuToggle.querySelector("i")
        : null;


/* Open / Close Mobile Menu */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            navMenu.classList.toggle("open");

            const isOpen =
                navMenu.classList.contains("open");


            /* Change hamburger to X */

            if (menuIcon) {

                menuIcon.className =
                    isOpen
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";

            }


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );


    /* Close menu after clicking menu link */

    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("open");

                    if (menuIcon) {
                        menuIcon.className =
                            "fa-solid fa-bars";
                    }

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    /* Close when clicking outside */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove("open");

                if (menuIcon) {
                    menuIcon.className =
                        "fa-solid fa-bars";
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* Reset menu when returning to desktop */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 760) {

                navMenu.classList.remove("open");

                if (menuIcon) {
                    menuIcon.className =
                        "fa-solid fa-bars";
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}

/* =========================================================
   2. PROJECT CARDS - 3D EFFECT
   ========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        function(e) {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -6;

            const rotateY =
                ((x - centerX) / centerX) * 7;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)
                 scale(1.02)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function() {

            card.style.transform =
                "perspective(1000px) " +
                "rotateX(0deg) " +
                "rotateY(0deg) " +
                "translateY(0) " +
                "scale(1)";

        }
    );

});



/* =========================================================
   3. LIVE GOATCOUNTER VISITOR COUNTER
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const visitorCount =
            document.getElementById(
                "visitor-count"
            );


        if (!visitorCount) {
            return;
        }


        fetch(
            "https://tanweerportfolio.goatcounter.com/counter/TOTAL.json"
        )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Visitor counter unavailable"
                );

            }

            return response.json();

        })


        .then(data => {

            visitorCount.textContent =
                data.count_unique ||
                data.count ||
                "0";

        })


        .catch(error => {

            console.log(
                "GoatCounter:",
                error
            );

            visitorCount.textContent =
                "—";

        });

    }
);
