/* =========================================================
   LUNAR LANDING SITE NAVIGATOR
   INTERACTIVE VERSION
   ========================================================= */


/* ================= SITE DATA ================= */

const landingSites = [

    {
        name: "Shackleton Crater",
        latitude: "-89.90°",
        longitude: "0.00°"
    },

    {
        name: "Malapert Massif",
        latitude: "-85.99°",
        longitude: "0.00°"
    },

    {
        name: "Haworth Crater",
        latitude: "-87.30°",
        longitude: "5.00°"
    },

    {
        name: "Amundsen Crater",
        latitude: "-84.50°",
        longitude: "83.00°"
    },

    {
        name: "De Gerlache Crater",
        latitude: "-88.00°",
        longitude: "-88.00°"
    }

];


/* ================= ELEMENTS ================= */

const siteButtons =
    document.querySelectorAll(".site-button");

const siteMarkers =
    document.querySelectorAll(".site-marker");

const latitude =
    document.getElementById("latitude");

const longitude =
    document.getElementById("longitude");

const selectedSiteText =
    document.getElementById("selectedSiteText");

const compareA =
    document.getElementById("compareA");

const analyzeButton =
    document.getElementById("analyzeButton");

const missionDate =
    document.getElementById("missionDate");

const missionTime =
    document.getElementById("missionTime");

const solarElevation =
    document.getElementById("solarElevation");

const sunlightWindow =
    document.getElementById("sunlightWindow");

const earthVisibility =
    document.getElementById("earthVisibility");

const sunsetTime =
    document.getElementById("sunsetTime");

const analysisStatus =
    document.getElementById("analysisStatus");


/* ================= CURRENT SITE ================= */

let selectedSite = 0;


/* ================= DEFAULT DATE/TIME ================= */

function setDefaultDateTime() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    const hours =
        String(now.getHours())
            .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");


    missionDate.value =
        `${year}-${month}-${day}`;

    missionTime.value =
        `${hours}:${minutes}`;
}


setDefaultDateTime();


/* ================= SELECT SITE ================= */

function selectSite(index) {

    const site =
        landingSites[index];

    if (!site) {
        return;
    }


    selectedSite = index;


    /* Coordinates */

    latitude.textContent =
        site.latitude;

    longitude.textContent =
        site.longitude;


    /* Site description */

    selectedSiteText.textContent =
        `${site.name} selected. Choose a mission date and time to analyze this location.`;


    /* Comparison */

    compareA.textContent =
        site.name;


    /* Buttons */

    siteButtons.forEach(
        (button, buttonIndex) => {

            button.classList.toggle(
                "active",
                buttonIndex === index
            );

        }
    );


    /* Markers */

    siteMarkers.forEach(
        (marker, markerIndex) => {

            marker.classList.toggle(
                "selected",
                markerIndex === index
            );

        }
    );


    console.log(
        "Selected site:",
        site.name
    );
}


/* ================= SITE BUTTON EVENTS ================= */

siteButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.site
                    );

                selectSite(index);

            }
        );

    }
);


/* ================= MOON MARKER EVENTS ================= */

siteMarkers.forEach(
    (marker) => {

        marker.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        marker.dataset.site
                    );

                selectSite(index);

            }
        );

    }
);


/* ================= ANALYSIS ================= */

function analyzeSite() {

    const site =
        landingSites[selectedSite];

    if (!site) {
        return;
    }


    const date =
        missionDate.value;

    const time =
        missionTime.value;


    if (!date || !time) {

        alert(
            "Please select a mission date and time."
        );

        return;
    }


    /*
       IMPORTANT:

       These values are NOT NASA measurements.

       They are temporary interface placeholders.

       Later we will replace this section with
       real astronomical calculations/data.
    */


    solarElevation.textContent =
        "MODEL";

    sunlightWindow.textContent =
        "MODEL";

    earthVisibility.textContent =
        "MODEL";

    sunsetTime.textContent =
        "MODEL";


    analysisStatus.textContent =
        "SCENARIO LOADED";


    selectedSiteText.textContent =
        `${site.name} • ${date} • ${time}`;


    document
        .getElementById("analysis")
        .scrollIntoView({
            behavior: "smooth"
        });


    console.log(
        "Analysis scenario:",
        {
            site: site.name,
            latitude: site.latitude,
            longitude: site.longitude,
            date: date,
            time: time
        }
    );
}


/* ================= ANALYZE BUTTON ================= */

analyzeButton.addEventListener(
    "click",
    analyzeSite
);


/* ================= INITIAL SITE ================= */

selectSite(0);


/* ================= MODEL VIEWER ================= */

const moonModel =
    document.getElementById("moonModel");


if (moonModel) {

    moonModel.addEventListener(
        "load",
        () => {

            console.log(
                "3D model loaded."
            );

        }
    );

    moonModel.addEventListener(
        "error",
        () => {

            console.log(
                "3D model could not be loaded."
            );

        }
    );
}


/* ================= SCROLL REVEAL ================= */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


sections.forEach(
    (section) => {

        observer.observe(section);

    }
);


/* ================= CONSOLE ================= */

console.log(
    "🌕 Lunar Navigator initialized."
);

console.log(
    "Interactive site selection enabled."
);

console.log(
    "NASA Space Apps Challenge 2026"
);
