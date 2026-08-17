/* =========================================================
   TANWEER PORTFOLIO - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. THREE COLOR THEME SWITCHER
   BLUE → PURPLE → GREEN
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle
        ? themeToggle.querySelector("i")
        : null;


/* Available themes */

const themes = [
    {
        name: "blue",
        className: "",
        icon: "fa-moon"
    },

    {
        name: "purple",
        className: "theme-purple",
        icon: "fa-wand-magic-sparkles"
    },

    {
        name: "green",
        className: "theme-green",
        icon: "fa-leaf"
    }
];


let currentTheme = 0;


/* =========================================================
   LOAD SAVED THEME
   ========================================================= */

const savedTheme =
    localStorage.getItem("tanweerTheme");


if (savedTheme) {

    const savedIndex =
        themes.findIndex(
            theme =>
                theme.name === savedTheme
        );


    if (savedIndex !== -1) {

        currentTheme =
            savedIndex;

    }

}


/* =========================================================
   APPLY THEME
   ========================================================= */

function applyTheme() {

    /* Remove previous themes */

    document.body.classList.remove(
        "theme-purple",
        "theme-green"
    );


    /* Current theme */

    const selectedTheme =
        themes[currentTheme];


    /* Add theme class */

    if (selectedTheme.className) {

        document.body.classList.add(
            selectedTheme.className
        );

    }


    /* Change button icon */

    if (themeIcon) {

        themeIcon.className =
            "fa-solid " +
            selectedTheme.icon;

    }


    /* Tooltip */

    if (themeToggle) {

        themeToggle.setAttribute(
            "title",
            "Theme: " +
            selectedTheme.name.toUpperCase()
        );

    }


    /* Save theme */

    localStorage.setItem(
        "tanweerTheme",
        selectedTheme.name
    );

}


/* =========================================================
   THEME BUTTON
   ========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            /* Next theme */

            currentTheme++;


            /* Back to blue */

            if (
                currentTheme >=
                themes.length
            ) {

                currentTheme = 0;

            }


            /* Apply */

            applyTheme();

        }
    );

}


/* Initial theme */

applyTheme();



/* =========================================================
   2. PROJECT CARDS - 3D MOUSE TILT EFFECT
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
                e.clientX -
                rect.left;


            const y =
                e.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            /* Rotation */

            const rotateX =
                ((y - centerY) /
                centerY) * -6;


            const rotateY =
                ((x - centerX) /
                centerX) * 7;


            /* Glow position */

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


            /* 3D effect */

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


            card.style.setProperty(
                "--mouse-x",
                "50%"
            );


            card.style.setProperty(
                "--mouse-y",
                "50%"
            );

        }
    );

});
