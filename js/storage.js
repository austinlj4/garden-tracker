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
