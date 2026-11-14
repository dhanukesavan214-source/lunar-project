import { landingSites } from "./data/landing-sites.js";


/* =========================================
   APPLICATION STATE
========================================= */

const state = {

    selectedSite: null,

    compareSiteA: null,

    compareSiteB: null

};


/* =========================================
   DOM ELEMENTS
========================================= */

const siteListContainer =
    document.getElementById("siteListContainer");

const siteCount =
    document.getElementById("siteCount");

const selectedSiteName =
    document.getElementById("selectedSiteName");

const selectedSiteRegion =
    document.getElementById("selectedSiteRegion");

const selectedLatitude =
    document.getElementById("selectedLatitude");

const selectedLongitude =
    document.getElementById("selectedLongitude");

const terrainValue =
    document.getElementById("terrainValue");

const illuminationValue =
    document.getElementById("illuminationValue");

const earthValue =
    document.getElementById("earthValue");

const communicationValue =
    document.getElementById("communicationValue");


/* =========================================
   INITIALIZE
========================================= */

function initialize() {

    renderSiteList();

    setupNavigation();

    setupDate();

    setupResetButton();

}


initialize();


/* =========================================
   RENDER SITE LIST
========================================= */

function renderSiteList() {

    siteListContainer.innerHTML = "";

    siteCount.textContent =
        String(landingSites.length).padStart(2, "0");


    landingSites.forEach((site) => {

        const element =
            document.createElement("button");

        element.className = "site-item";

        element.type = "button";

        element.innerHTML = `

            <h4>${site.name}</h4>

            <p>
                ${site.region}
            </p>

        `;


        element.addEventListener(
            "click",
            () => selectSite(site, element)
        );


        siteListContainer.appendChild(element);

    });

}


/* =========================================
   SELECT SITE
========================================= */

function selectSite(site, element) {

    state.selectedSite = site;


    document
        .querySelectorAll(".site-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (element) {

        element.classList.add("active");

    }


    updateAnalysis(site);

}


/* =========================================
   UPDATE ANALYSIS
========================================= */

function updateAnalysis(site) {

    selectedSiteName.textContent =
        site.name;

    selectedSiteRegion.textContent =
        `${site.region} · ${site.status}`;


    selectedLatitude.textContent =
        formatCoordinate(site.latitude, "N", "S");


    selectedLongitude.textContent =
        formatCoordinate(site.longitude, "E", "W");


    terrainValue.textContent =
        site.terrain ?? "Data unavailable";


    illuminationValue.textContent =
        site.illumination ?? "Data unavailable";


    earthValue.textContent =
        site.earthVisibility ?? "Data unavailable";


    communicationValue.textContent =
        site.communicationWindow ??
        "Data unavailable";


    updateComparison(site);

}


/* =========================================
   COORDINATE FORMATTER
========================================= */

function formatCoordinate(
    value,
    positiveDirection,
    negativeDirection
) {

    if (value === null || value === undefined) {

        return "—";

    }


    const direction =
        value >= 0
            ? positiveDirection
            : negativeDirection;


    return `${Math.abs(value).toFixed(2)}° ${direction}`;

}


/* =========================================
   COMPARISON
========================================= */

function updateComparison(site) {

    if (!state.compareSiteA) {

        state.compareSiteA = site;

    } else if (
        state.compareSiteA.id !== site.id &&
        !state.compareSiteB
    ) {

        state.compareSiteB = site;

    }


    const siteA =
        state.compareSiteA;

    const siteB =
        state.compareSiteB;


    if (siteA) {

        document.getElementById(
            "compareA"
        ).textContent = siteA.name;


        document.getElementById(
            "latA"
        ).textContent =
            formatCoordinate(
                siteA.latitude,
                "N",
                "S"
            );


        document.getElementById(
            "lonA"
        ).textContent =
            formatCoordinate(
                siteA.longitude,
                "E",
                "W"
            );

    }


    if (siteB) {

        document.getElementById(
            "compareB"
        ).textContent = siteB.name;


        document.getElementById(
            "latB"
        ).textContent =
            formatCoordinate(
                siteB.latitude,
                "N",
                "S"
            );


        document.getElementById(
            "lonB"
        ).textContent =
            formatCoordinate(
                siteB.longitude,
                "E",
                "W"
            );

    }

}


/* =========================================
   DATE
========================================= */

function setupDate() {

    const dateInput =
        document.getElementById("missionDate");


    if (!dateInput) {
        return;
    }


    dateInput.addEventListener(
        "change",
        () => {

            console.log(
                "Selected mission date:",
                dateInput.value
            );

            /*
                Later this date will drive:

                - Sun position
                - Lunar illumination
                - Earth visibility
                - Communication windows
                - Solar power analysis
            */

        }
    );

}


/* =========================================
   RESET VIEW
========================================= */

function setupResetButton() {

    const button =
        document.getElementById("resetView");

    const model =
        document.getElementById("moonModel");


    if (!button || !model) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            model.cameraOrbit =
                "0deg 75deg 105%";

            model.fieldOfView =
                "30deg";

        }
    );

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

function setupNavigation() {

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

}
