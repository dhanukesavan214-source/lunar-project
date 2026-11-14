/* =========================================================
   LUNAR LANDING SITE NAVIGATOR
   NASA SPACE APPS CHALLENGE 2026

   Stage 1:
   - Landing-site selection
   - Dynamic coordinates
   - Dynamic analysis cards
   ========================================================= */


/* ---------- LANDING SITE DATA ---------- */

const landingSites = [
    {
        name: "SHACKLETON CRATER",
        latitude: "-89.90°",
        longitude: "0.00°",

        solarElevation: "—",
        sunlightWindow: "—",
        earthVisibility: "—",
        sunsetTime: "—"
    },

    {
        name: "MALAPERT MASSIF",
        latitude: "-85.99°",
        longitude: "0.00°",

        solarElevation: "—",
        sunlightWindow: "—",
        earthVisibility: "—",
        sunsetTime: "—"
    },

    {
        name: "HAWORTH CRATER",
        latitude: "-87.30°",
        longitude: "5.00°",

        solarElevation: "—",
        sunlightWindow: "—",
        earthVisibility: "—",
        sunsetTime: "—"
    },

    {
        name: "AMUNDSEN CRATER",
        latitude: "-84.50°",
        longitude: "83.00°",

        solarElevation: "—",
        sunlightWindow: "—",
        earthVisibility: "—",
        sunsetTime: "—"
    },

    {
        name: "DE GERLACHE CRATER",
        latitude: "-88.00°",
        longitude: "-88.00°",

        solarElevation: "—",
        sunlightWindow: "—",
        earthVisibility: "—",
        sunsetTime: "—"
    }
];


/* ---------- ELEMENTS ---------- */

const siteButtons =
    document.querySelectorAll(".site-button");

const latitudeElement =
    document.getElementById("latitude");

const longitudeElement =
    document.getElementById("longitude");

const solarElevationElement =
    document.getElementById("solarElevation");

const sunlightWindowElement =
    document.getElementById("sunlightWindow");

const earthVisibilityElement =
    document.getElementById("earthVisibility");

const sunsetTimeElement =
    document.getElementById("sunsetTime");


/* ---------- SELECT SITE ---------- */

function selectSite(index) {

    const site = landingSites[index];

    if (!site) {
        return;
    }


    /* Update coordinates */

    latitudeElement.textContent =
        site.latitude;

    longitudeElement.textContent =
        site.longitude;


    /* Update analysis */

    solarElevationElement.textContent =
        site.solarElevation;

    sunlightWindowElement.textContent =
        site.sunlightWindow;

    earthVisibilityElement.textContent =
        site.earthVisibility;

    sunsetTimeElement.textContent =
        site.sunsetTime;


    /* Update selected button */

    siteButtons.forEach((button, buttonIndex) => {

        button.classList.toggle(
            "active",
            buttonIndex === index
        );

    });


    console.log(
        "Selected lunar site:",
        site.name
    );
}


/* ---------- BUTTON EVENTS ---------- */

siteButtons.forEach((button, index) => {

    button.addEventListener(
        "click",
        () => selectSite(index)
    );

});


/* ---------- INITIAL SITE ---------- */

selectSite(0);


/* ---------- SCROLL REVEAL ---------- */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


sections.forEach((section) => {

    observer.observe(section);

});


/* ---------- CONSOLE MESSAGE ---------- */

console.log(
    "🌙 Lunar Landing Site Navigator initialized."
);

console.log(
    "NASA Space Apps Challenge 2026"
);
