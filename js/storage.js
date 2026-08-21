// Garden App Storage
// Handles saving and loading data from localStorage


// ========================================
// USER PLANTS
// ========================================

function getUserPlants() {

    return JSON.parse(
        localStorage.getItem('userPlants')
    ) || [];

}


function saveUserPlants(plants) {

    localStorage.setItem(
        'userPlants',
        JSON.stringify(plants)
    );

}


// ========================================
// APP SETTINGS
// ========================================

function getAppSettings() {

    return JSON.parse(
        localStorage.getItem('gardenSettings')
    ) || {};

}


function saveAppSettings(settings) {

    localStorage.setItem(
        'gardenSettings',
        JSON.stringify(settings)
    );

}


// ========================================
// PLANT NOTES
// ========================================

function getPlantNotes() {

    return JSON.parse(
        localStorage.getItem('plantNotes')
    ) || {};

}


function savePlantNotesData(notes) {

    localStorage.setItem(
        'plantNotes',
        JSON.stringify(notes)
    );

}
// ========================================
// MY GARDEN
// ========================================

function getMyGarden() {

    return JSON.parse(
        localStorage.getItem('myGarden')
    ) || [];

}


function saveMyGarden(garden) {

    localStorage.setItem(
        'myGarden',
        JSON.stringify(garden)
    );

}
// ========================================
// HARVESTS
// ========================================

function getHarvests() {

    return JSON.parse(
        localStorage.getItem('harvests')
    ) || [];

}


function saveHarvests(harvests) {

    localStorage.setItem(
        'harvests',
        JSON.stringify(harvests)
    );

}
// ========================================
// HARVEST CALCULATIONS
// ========================================


// Get all harvests for a specific year
function getHarvestsForYear(year) {

    const harvests =
        getHarvests();

    return harvests.filter(function(harvest) {

        return harvest.gardenYear === Number(year);

    });

}


// Get all harvests for a specific plant and year
function getHarvestsForPlant(
    plantId,
    year
) {

    const harvests =
        getHarvestsForYear(year);

    return harvests.filter(function(harvest) {

        return harvest.plantId === plantId;

    });

}


// Get total quantity for a plant in a year
function getHarvestQuantityForPlant(
    plantId,
    year
) {

    const harvests =
        getHarvestsForPlant(
            plantId,
            year
        );


    return harvests.reduce(
        function(total, harvest) {

            return total +
                (harvest.quantity || 0);

        },
        0
    );

}


// Get total weight for a plant in a year
function getHarvestWeightForPlant(
    plantId,
    year
) {

    const harvests =
        getHarvestsForPlant(
            plantId,
            year
        );


    return harvests.reduce(
        function(total, harvest) {

            let weight =
                harvest.weight || 0;


            // Convert weight to pounds
            if (harvest.weightUnit === 'oz') {

                weight =
                    weight / 16;

            }


            return total + weight;

        },
        0
    );

}
// Format harvest weight for display
function formatHarvestWeight(
    weight,
    unit
) {

    if (
        weight === null ||
        weight === undefined ||
        weight === ''
    ) {

        return '';

    }


    let pounds =
        Number(weight);


    // Convert ounces to pounds
    if (unit === 'oz') {

        pounds =
            pounds / 16;

    }


    // Under 1 pound → display ounces
    if (pounds < 1) {

        const ounces =
            pounds * 16;

        return `${Math.round(ounces * 10) / 10} oz`;

    }


    // 1 pound or more → display pounds
    return `${Math.round(pounds * 10) / 10} lb`;

}
