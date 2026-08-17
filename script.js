/* =========================================================
   THEME BUTTON
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    const icon =
        themeToggle.querySelector("i");

    document.body.classList.toggle("light-mode");

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

});
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
