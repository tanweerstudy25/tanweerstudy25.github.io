/* =========================================================
   TANWEER - THREE COLOR THEME SWITCHER
   BLUE → PURPLE → GREEN
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle.querySelector("i");


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

    document.body.classList.remove(
        "theme-purple",
        "theme-green"
    );


    const selectedTheme =
        themes[currentTheme];


    if (selectedTheme.className) {

        document.body.classList.add(
            selectedTheme.className
        );

    }


    /* Change icon */

    themeIcon.className =
        "fa-solid " +
        selectedTheme.icon;


    /* Tooltip */

    themeToggle.setAttribute(
        "title",
        "Color Theme: " +
        selectedTheme.name.toUpperCase()
    );


    /* Save */

    localStorage.setItem(
        "tanweerTheme",
        selectedTheme.name
    );

}


/* =========================================================
   THEME BUTTON CLICK
========================================================= */

themeToggle.addEventListener(
    "click",
    function () {

        currentTheme++;

        if (
            currentTheme >=
            themes.length
        ) {

            currentTheme = 0;

        }


        applyTheme();

    }
);


/* =========================================================
   INITIAL THEME
========================================================= */

applyTheme();
/* =========================================================
   PROJECT CARDS - 3D MOUSE TILT EFFECT
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", function(e) {

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

        /*
         * Maximum card rotation
         */

        const rotateX =
            ((y - centerY) / centerY) * -6;

        const rotateY =
            ((x - centerX) / centerX) * 7;


        /*
         * Move the colorful glow
         */

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );


        /*
         * Apply 3D tilt
         */

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)
             scale(1.02)`;

    });


    card.addEventListener("mouseleave", function() {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";

        card.style.setProperty(
            "--mouse-x",
            "50%"
        );

        card.style.setProperty(
            "--mouse-y",
            "50%"
        );

    });

});
/* =========================================================
   STRONG THREE-COLOR THEME SYSTEM
   ========================================================= */


/* ---------------- BLUE THEME ---------------- */

body {

    --theme-glow:
        rgba(57, 168, 255, .25);

}


/* ---------------- PURPLE THEME ---------------- */

body.theme-purple {

    --bg: #0d0820;

    --bg-dark: #170d35;

    --card: #17102f;

    --card-hover: #24164a;

    --blue: #a855f7;

    --blue-light: #c084fc;

    --purple: #ec4899;

    --pink: #f472b6;

    --border:
        rgba(168, 85, 247, .30);

    --theme-glow:
        rgba(168, 85, 247, .30);


    background:
        radial-gradient(
            circle at 20% 10%,
            rgba(168,85,247,.12),
            transparent 32%
        ),
        var(--bg);

}


/* ---------------- GREEN / CYBER THEME ---------------- */

body.theme-green {

    --bg: #041812;

    --bg-dark: #06251b;

    --card: #09271e;

    --card-hover: #0d3829;

    --blue: #22c55e;

    --blue-light: #4ade80;

    --purple: #06b6d4;

    --pink: #14b8a6;

    --border:
        rgba(34,197,94,.30);

    --theme-glow:
        rgba(34,197,94,.30);


    background:
        radial-gradient(
            circle at 20% 10%,
            rgba(34,197,94,.12),
            transparent 32%
        ),
        var(--bg);

}


/* =========================================================
   THEME BUTTON GLOW
========================================================= */

.icon-btn {

    border-color:
        var(--blue) !important;

    box-shadow:
        0 0 12px var(--theme-glow);

}


.icon-btn:hover {

    box-shadow:
        0 0 25px var(--theme-glow);

}


/* =========================================================
   WHATSAPP BUTTON ALWAYS STAYS GREEN
========================================================= */

.whatsapp-nav {

    background:
        linear-gradient(
            135deg,
            #25D366,
            #128C7E
        ) !important;

}


/* =========================================================
   SMOOTH THEME TRANSITION
========================================================= */

body,
.navbar,
.section,
.section-dark,
.stat-card,
.skill-card,
.project-card,
.mini-card,
.cert-card,
.flow-box,
.flow-item,
.why-list div,
.technology-cloud span {

    transition:
        background .5s ease,
        background-color .5s ease,
        border-color .5s ease,
        box-shadow .5s ease,
        color .5s ease;

}
