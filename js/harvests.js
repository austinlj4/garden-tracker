// ========================================
// HARVESTS
// ========================================


// ----------------------------------------
// SHOW ADD HARVEST FORM
// ----------------------------------------

function showAddHarvest(gardenPlantId) {

    const gardenPlants =
        getMyGarden();


    const gardenPlant =
        gardenPlants.find(function(entry) {

            return entry.id === gardenPlantId;

        });


    if (!gardenPlant) {

        console.error(
            'Garden planting not found:',
            gardenPlantId
        );

        return;

    }


    // Store the garden planting ID
    document.getElementById(
        'addHarvest'
    ).dataset.gardenPlantId =
        gardenPlantId;


    // Clear the form
    document.getElementById(
        'harvestDate'
    ).value =
        new Date().toISOString().split('T')[0];


    document.getElementById(
        'harvestQuantity'
    ).value = '';


    document.getElementById(
        'harvestWeight'
    ).value = '';


    document.getElementById(
        'harvestWeightUnit'
    ).value = 'oz';


    document.getElementById(
        'harvestNotes'
    ).value = '';


    document.getElementById(
        'harvestMessage'
    ).textContent = '';


    showPage('addHarvest');

}
