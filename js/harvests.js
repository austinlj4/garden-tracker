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
// ----------------------------------------
// SAVE HARVEST
// ----------------------------------------

function addHarvest() {

    const form =
        document.getElementById('addHarvest');


    const gardenPlantId =
        form.dataset.gardenPlantId;


    const date =
        document.getElementById('harvestDate').value;


    const quantityInput =
        document.getElementById('harvestQuantity').value;


    const weightInput =
        document.getElementById('harvestWeight').value;


    const weightUnit =
        document.getElementById('harvestWeightUnit').value;


    const notes =
        document.getElementById('harvestNotes').value.trim();


    // Convert the numbers
    const quantity =
        quantityInput
            ? Number(quantityInput)
            : null;


    const weight =
        weightInput
            ? Number(weightInput)
            : null;


    // Make sure we have a garden planting
    if (!gardenPlantId) {

        console.error(
            'No garden planting selected.'
        );

        return;

    }


    // Make sure a date was entered
    if (!date) {

        document.getElementById(
            'harvestMessage'
        ).textContent =
            'Please enter a harvest date.';

        return;

    }


    // Require either quantity OR weight
    if (
        (quantity === null || quantity <= 0) &&
        (weight === null || weight <= 0)
    ) {

        document.getElementById(
            'harvestMessage'
        ).textContent =
            'Please enter a quantity or weight.';

        return;

    }


    // Find the garden planting
    const garden =
        getMyGarden();


    const gardenPlant =
        garden.find(function(entry) {

            return entry.id === gardenPlantId;

        });


    if (!gardenPlant) {

        console.error(
            'Garden planting not found.'
        );

        return;

    }


    // Get existing harvests
    const harvests =
        getHarvests();


    // Create the harvest record
    const newHarvest = {

        id:
            'harvest-' + Date.now(),

        gardenPlantId:
            gardenPlantId,

        plantId:
            gardenPlant.plantId,

        gardenYear:
            gardenPlant.gardenYear,

        date:
            date,

        quantity:
            quantity,

        weight:
            weight,

        weightUnit:
            weight !== null
                ? weightUnit
                : '',

        notes:
            notes

    };


    // Add the new harvest
    harvests.push(newHarvest);


    // Save harvests
    saveHarvests(harvests);


    // Show confirmation
    document.getElementById(
        'harvestMessage'
    ).textContent =
        'Harvest saved!';


    // Return to the garden planting
    setTimeout(function() {

        showGardenPlantDetails(
            gardenPlantId
        );

    }, 500);

}

