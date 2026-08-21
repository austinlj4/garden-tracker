// ========================================
// HARVESTS
// ========================================

// ----------------------------------------
// DISPLAY HARVEST TOTALS
// ----------------------------------------

function displayHarvests() {

    const container =
        document.getElementById('harvestList');

    if (!container) {
        return;
    }

    container.innerHTML = '';

    const harvests =
        getHarvests();

    const yearSelector =
        document.getElementById('harvestYearSelector');

    const selectedYear =
        Number(yearSelector.value);


    // ----------------------------------------
    // GET ONLY HARVESTS FROM SELECTED YEAR
    // ----------------------------------------

    const yearHarvests =
        harvests.filter(function(harvest) {

            return harvest.gardenYear === selectedYear;

        });


    if (yearHarvests.length === 0) {

        container.innerHTML =
            '<p>No harvests recorded for this year.</p>';

        return;

    }


    // ----------------------------------------
    // GET ALL PLANTS
    // ----------------------------------------

    const userPlants =
        getUserPlants();

    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    // ----------------------------------------
    // GROUP HARVESTS BY PLANT
    // ----------------------------------------

    const plantTotals = {};


    yearHarvests.forEach(function(harvest) {

        const plantId =
            harvest.plantId;


        if (!plantTotals[plantId]) {

            plantTotals[plantId] = {

                quantity: 0,

                weight: 0,

                hasWeight: false,

                weightUnit:
                    harvest.weightUnit || 'lbs'

            };

        }


        // Add quantity
        if (
            harvest.quantity !== null &&
            harvest.quantity !== undefined &&
            harvest.quantity !== ''
        ) {

            plantTotals[plantId].quantity +=
                Number(harvest.quantity);

        }


// Add weight
if (
    harvest.weight !== null &&
    harvest.weight !== undefined &&
    harvest.weight !== ''
) {

    let weight =
        Number(harvest.weight);


    // Convert ounces to pounds
    if (harvest.weightUnit === 'oz') {

        weight =
            weight / 16;

    }


    plantTotals[plantId].weight +=
        weight;

    plantTotals[plantId].hasWeight = true;

}

    });


    // ----------------------------------------
    // DISPLAY TOTALS
    // ----------------------------------------

    Object.keys(plantTotals).forEach(function(plantId) {

        const plant =
            allPlants.find(function(item) {

                return item.id === plantId;

            });


        if (!plant) {
            return;
        }


        const totals =
            plantTotals[plantId];


        let amount = '';


        // Quantity total
        if (totals.quantity > 0) {

            amount +=
                `Qty: ${totals.quantity}`;

        }


        // Weight total
        if (totals.hasWeight) {

            if (amount) {
                amount += ' • ';
            }

amount +=
    `Lbs: ${Math.round(totals.weight * 10) / 10}`;

        }


        const harvestItem =
            document.createElement('div');


        harvestItem.className =
            'garden-plant-item';


        harvestItem.innerHTML = `

            <strong>${plant.name}</strong>

            <br>

            ${amount}

        `;


        harvestItem.onclick = function() {

            showHarvestPlantDetails(
                plantId,
                selectedYear
            );

        };


        container.appendChild(
            harvestItem
        );

    });

}

// ----------------------------------------
// SHOW HARVESTS FOR ONE PLANT
// ----------------------------------------

function showHarvestPlantDetails(plantId, year) {

    const harvests =
        getHarvests();


    const yearHarvests =
        harvests.filter(function(harvest) {

            return (
                harvest.plantId === plantId &&
                harvest.gardenYear === year
            );

        });


    const userPlants =
        getUserPlants();

    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    const plant =
        allPlants.find(function(item) {

            return item.id === plantId;

        });


    if (!plant) {

        console.error(
            'Plant not found:',
            plantId
        );

        return;

    }


    const detailsContainer =
        document.getElementById(
            'harvestPlantDetailsContent'
        );


    if (!detailsContainer) {

        console.error(
            'harvestPlantDetailsContent not found.'
        );

        return;

    }
        // ----------------------------------------
    // CALCULATE TOTALS
    // ----------------------------------------

    let totalQuantity = 0;

    let totalWeight = 0;

    let hasWeight = false;


    yearHarvests.forEach(function(harvest) {

        // Add quantity
        if (
            harvest.quantity !== null &&
            harvest.quantity !== undefined &&
            harvest.quantity !== ''
        ) {

            totalQuantity +=
                Number(harvest.quantity);

        }


        // Add weight
        if (
            harvest.weight !== null &&
            harvest.weight !== undefined &&
            harvest.weight !== ''
        ) {

let weight =
    Number(harvest.weight);


// Convert ounces to pounds
if (harvest.weightUnit === 'oz') {

    weight =
        weight / 16;

}


totalWeight +=
    weight;

            hasWeight = true;

        }

    });


    // ----------------------------------------
    // BUILD TOTAL DISPLAY
    // ----------------------------------------

    let totalAmount = '';


    if (totalQuantity > 0) {

        totalAmount =
            `Qty: ${totalQuantity}`;

    }


    if (hasWeight) {

        if (totalAmount) {
            totalAmount += ' • ';
        }

totalAmount +=
    `Lbs: ${Math.round(totalWeight * 10) / 10}`;

    }


    // ----------------------------------------
    // BUILD INDIVIDUAL HARVEST LIST
    // ----------------------------------------

    let harvestList = '';


    yearHarvests.forEach(function(harvest) {

        let amount = '';


        if (
            harvest.quantity !== null &&
            harvest.quantity !== undefined &&
            harvest.quantity !== ''
        ) {

            amount +=
                `Qty: ${harvest.quantity}`;

        }


        if (
            harvest.weight !== null &&
            harvest.weight !== undefined &&
            harvest.weight !== ''
        ) {

            if (amount) {
                amount += ' • ';
            }

            amount +=
                `Lbs: ${harvest.weight}`;

        }


        harvestList += `

            <div
                class="garden-plant-item"
                onclick="showHarvestDetails('${harvest.id}')"
            >

                <strong>
                    ${formatGardenDate(harvest.date)}
                </strong>

                <br>

                ${amount}

                ${
                    harvest.notes
                        ? `<br><small>${harvest.notes}</small>`
                        : ''
                }

            </div>

        `;

    });


    // ----------------------------------------
    // DISPLAY DETAILS PAGE
    // ----------------------------------------

    detailsContainer.innerHTML = `

        <div class="card">

            <h2>🧺 ${plant.name}</h2>

            <h3>
                ${year} Harvest Total
            </h3>

            <p>
                <strong>
                    ${totalAmount || 'No harvest recorded'}
                </strong>
            </p>

        </div>


        <div class="card">

            <h3>Individual Harvests</h3>

            ${harvestList}

        </div>

    `;


    showPage('harvestPlantDetails');

}
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


    const form =
        document.getElementById('addHarvest');


    // Store which garden planting this harvest belongs to
    form.dataset.gardenPlantId =
        gardenPlantId;


    // Make sure we are NOT in edit mode
    delete form.dataset.editingId;


    // Reset the page title
    document.querySelector(
        '#addHarvest h2'
    ).textContent =
        '🧺 Add Harvest';


    // Reset the button
    document.querySelector(
        '#addHarvest button[onclick="addHarvest()"]'
    ).textContent =
        'Save Harvest';


    // Set today's date
    document.getElementById(
        'harvestDate'
    ).value =
        new Date().toISOString().split('T')[0];


    // Clear the form
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
// EDIT HARVEST
// ----------------------------------------

function editHarvest(harvestId) {

    const harvests =
        getHarvests();


    const harvest =
        harvests.find(function(item) {

            return item.id === harvestId;

        });


    if (!harvest) {

        console.error(
            'Harvest not found:',
            harvestId
        );

        return;

    }


    const form =
        document.getElementById('addHarvest');


    // Remember which harvest we are editing
    form.dataset.editingId =
        harvestId;


    // Remember the garden planting
    form.dataset.gardenPlantId =
        harvest.gardenPlantId;


    // Fill the form
    document.getElementById(
        'harvestDate'
    ).value =
        harvest.date || '';


    document.getElementById(
        'harvestQuantity'
    ).value =
        harvest.quantity ?? '';


    document.getElementById(
        'harvestWeight'
    ).value =
        harvest.weight ?? '';


    document.getElementById(
        'harvestWeightUnit'
    ).value =
        harvest.weightUnit || 'oz';


    document.getElementById(
        'harvestNotes'
    ).value =
        harvest.notes || '';


    // Change title
    document.querySelector(
        '#addHarvest h2'
    ).textContent =
        '✏️ Edit Harvest';


    // Change button
    document.querySelector(
        '#addHarvest button[onclick="addHarvest()"]'
    ).textContent =
        'Save Changes';


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


// Check whether we are editing
const editingId =
    form.dataset.editingId;


if (editingId) {

    // ----------------------------------------
    // EDIT EXISTING HARVEST
    // ----------------------------------------

    const harvestIndex =
        harvests.findIndex(function(item) {

            return item.id === editingId;

        });


    if (harvestIndex !== -1) {

        harvests[harvestIndex] = {

            ...harvests[harvestIndex],

            date: date,

            quantity: quantity,

            weight: weight,

            weightUnit:
                weight !== null
                    ? weightUnit
                    : '',

            notes: notes

        };

    }

} else {

    // ----------------------------------------
    // CREATE NEW HARVEST
    // ----------------------------------------

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


    harvests.push(newHarvest);

}
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
// ----------------------------------------
// SHOW HARVEST DETAILS
// ----------------------------------------

function showHarvestDetails(harvestId) {

    const harvests =
        getHarvests();


    const harvest =
        harvests.find(function(item) {

            return item.id === harvestId;

        });


    if (!harvest) {

        console.error(
            'Harvest not found:',
            harvestId
        );

        return;

    }


    // Find the plant
    const userPlants =
        getUserPlants();

    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    const plant =
        allPlants.find(function(item) {

            return item.id === harvest.plantId;

        });


    const plantName =
        plant
            ? plant.name
            : 'Unknown Plant';


    const detailsContainer =
        document.getElementById(
            'harvestDetailsContent'
        );


    if (!detailsContainer) {

        console.error(
            'harvestDetailsContent not found.'
        );

        return;

    }


    // Build amount display
    let amount = '';


    if (
        harvest.quantity !== null &&
        harvest.quantity !== undefined
    ) {

        amount +=
            `${harvest.quantity} ${
                harvest.quantity === 1
                    ? 'item'
                    : 'items'
            }`;

    }


    if (
        harvest.weight !== null &&
        harvest.weight !== undefined
    ) {

        if (amount) {
            amount += ' • ';
        }

        amount +=
            `${harvest.weight} ${harvest.weightUnit}`;

    }


    detailsContainer.innerHTML = `

        <div class="card">

            <h2>🌱 ${plantName}</h2>

            <h3>🧺 Harvest</h3>

            <p>
                <strong>Date:</strong>
                ${formatGardenDate(harvest.date)}
            </p>

            <p>
                <strong>Amount:</strong>
                ${amount}
            </p>

            <p>
                <strong>Notes:</strong>
                ${harvest.notes || 'None'}
            </p>

        </div>


        <div class="card">

            <h3>Manage Harvest</h3>

            <button
                onclick="editHarvest('${harvest.id}')"
            >
                ✏️ Edit Harvest
            </button>

            <button
                class="delete-button"
                onclick="deleteHarvest('${harvest.id}')"
            >
                🗑️ Delete Harvest
            </button>

        </div>

    `;
    
document.getElementById(
    'backToGardenPlantButton'
).onclick = function() {

    showGardenPlantDetails(
        harvest.gardenPlantId
    );

};

    showPage('harvestDetails');

}
// ----------------------------------------
// DELETE HARVEST
// ----------------------------------------

function deleteHarvest(harvestId) {

    const confirmed =
        confirm(
            'Are you sure you want to delete this harvest?'
        );


    if (!confirmed) {
        return;
    }


    const harvests =
        getHarvests();


    // Find the harvest before removing it
    const harvest =
        harvests.find(function(item) {

            return item.id === harvestId;

        });


    if (!harvest) {

        console.error(
            'Harvest not found:',
            harvestId
        );

        return;

    }


    // Remove the harvest
    const updatedHarvests =
        harvests.filter(function(item) {

            return item.id !== harvestId;

        });


    // Save the updated harvest list
    saveHarvests(updatedHarvests);


    // Return to the garden planting
    showGardenPlantDetails(
        harvest.gardenPlantId
    );

}

// ========================================
// HARVEST SUMMARY
// ========================================

function displayHarvestSummary() {

    const container =
        document.getElementById('harvestSummaryList');


    if (!container) {
        return;
    }


    container.innerHTML = '';


    // Get selected year
    const selector =
        document.getElementById(
            'harvestYearSelector'
        );


    const selectedYear =
        Number(selector.value);


    // Get all harvests
    const harvests =
        getHarvests();


    // Get plants
    const userPlants =
        getUserPlants();


    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    // Only use harvests from selected year
    const yearHarvests =
        harvests.filter(function(harvest) {

            return harvest.gardenYear === selectedYear;

        });


    if (yearHarvests.length === 0) {

        container.innerHTML =
            '<p>No harvests recorded for this year.</p>';

        return;

    }


    // ----------------------------------------
    // GROUP HARVESTS BY PLANT
    // ----------------------------------------

    const plantTotals = {};


    yearHarvests.forEach(function(harvest) {

        const plantId =
            harvest.plantId;


        if (!plantTotals[plantId]) {

            plantTotals[plantId] = {

                quantity: 0,

                weight: 0,

                hasQuantity: false,

                hasWeight: false,

                weightUnit:
                    harvest.weightUnit || 'oz'

            };

        }


        // Add quantity
        if (
            harvest.quantity !== null &&
            harvest.quantity !== undefined
        ) {

            plantTotals[plantId].quantity +=
                Number(harvest.quantity);

            plantTotals[plantId].hasQuantity = true;

        }


        // Add weight
        if (
            harvest.weight !== null &&
            harvest.weight !== undefined
        ) {

            plantTotals[plantId].weight +=
                Number(harvest.weight);

            plantTotals[plantId].hasWeight = true;

        }


        // Remember weight unit
        if (harvest.weightUnit) {

            plantTotals[plantId].weightUnit =
                harvest.weightUnit;

        }

    });


    // ----------------------------------------
    // DISPLAY EACH PLANT
    // ----------------------------------------

    Object.keys(plantTotals).forEach(function(plantId) {

        const plant =
            allPlants.find(function(item) {

                return item.id === plantId;

            });


        if (!plant) {
            return;
        }


        const totals =
            plantTotals[plantId];


        const card =
            document.createElement('div');


        card.className =
            'card';


        let amount = '';


        // Quantity
        if (totals.hasQuantity) {

            amount +=
                `${totals.quantity} ${
                    totals.quantity === 1
                        ? 'item'
                        : 'items'
                }`;

        }


        // Weight
        if (totals.hasWeight) {

            if (amount) {
                amount += ' • ';
            }


            amount +=
                `${totals.weight} ${totals.weightUnit}`;

        }


        card.innerHTML = `

            <h2>🌱 ${plant.name}</h2>

            <p>
                <strong>Total Harvest:</strong>
                ${amount}
            </p>

        `;


        container.appendChild(card);

    });

}
// ========================================
// HARVEST YEARS
// ========================================

function loadHarvestYears() {

    const selector =
        document.getElementById(
            'harvestYearSelector'
        );


    if (!selector) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    const harvests =
        getHarvests();


    const years =
        harvests.map(function(harvest) {

            return harvest.gardenYear;

        });


    // Always include current year
    years.push(currentYear);


    // Remove duplicates and sort newest first
    const uniqueYears =
        [...new Set(years)].sort(function(a, b) {

            return b - a;

        });


    selector.innerHTML = '';


    uniqueYears.forEach(function(year) {

        const option =
            document.createElement('option');


        option.value = year;

        option.textContent = year;


        selector.appendChild(option);

    });


    selector.value =
        currentYear;


    displayHarvestSummary();

}
