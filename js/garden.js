// ========================================
// MY GARDEN
// ========================================


// ----------------------------------------
// DISPLAY MY GARDEN
// ----------------------------------------

function displayMyGarden() {

    const gardenContainer =
        document.getElementById('myGardenList');

    if (!gardenContainer) {
        return;
    }

    gardenContainer.innerHTML = '';


    // Get all garden entries
    const garden =
        getMyGarden();


    // Get the selected year
    const yearSelector =
        document.getElementById('gardenYearSelector');

    const selectedYear =
        Number(yearSelector.value);


    // Only show entries from selected year
    const yearPlants =
        garden.filter(function(entry) {

            return entry.gardenYear === selectedYear;

        });


    // Get all plants from the library
    const userPlants =
        getUserPlants();

    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    // No plants for this year
    if (yearPlants.length === 0) {

        gardenContainer.innerHTML =
            '<p>No plants have been added to your garden for this year.</p>';

        return;

    }


// Display each planting
yearPlants.forEach(function(entry) {

    const plant =
        allPlants.find(function(item) {

            return item.id === entry.plantId;

        });


    if (!plant) {
        return;
    }


    const gardenItem =
        document.createElement('div');


    gardenItem.className =
        'garden-plant-item';


    gardenItem.innerHTML = `

        <strong>${plant.name}</strong>

        <br>

        ${entry.quantity}
        ${entry.quantity === 1 ? 'plant' : 'plants'}

        ${entry.plantingDate
            ? ` • Planted ${formatGardenDate(entry.plantingDate)}`
            : ''
        }

        ${entry.location
            ? ` • ${entry.location}`
            : ''
        }

    `;


    // Make the entire planting clickable
    gardenItem.onclick = function() {

        showGardenPlantDetails(
            entry.id
        );

    };


    gardenContainer.appendChild(
        gardenItem
    );

});

// ----------------------------------------
// CREATE YEAR DROPDOWN
// ----------------------------------------

function loadGardenYears() {

    const selector =
        document.getElementById('gardenYearSelector');

    if (!selector) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    // Get years from existing garden entries
    const garden =
        getMyGarden();


    const years =
        garden.map(function(entry) {

            return entry.gardenYear;

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


    // Select current year by default
    selector.value = currentYear;

}


// ----------------------------------------
// OPEN ADD GARDEN FORM
// ----------------------------------------

function showAddGardenPlantForm(plantId) {

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
        return;
    }


    // Show plant name
    document.getElementById(
        'gardenPlantName'
    ).textContent =
        plant.name;


    // Store which plant we're adding
    document.getElementById(
        'addGardenPlant'
    ).dataset.plantId =
        plantId;


    // Get current garden year
    const settings =
        getAppSettings();


    const gardenYear =
        settings.gardenYear ||
        new Date().getFullYear();


    // Default planting date to today
    document.getElementById(
        'gardenPlantingDate'
    ).value =
        new Date().toISOString().split('T')[0];


    // Clear other fields
    document.getElementById(
        'gardenQuantity'
    ).value = 1;

    document.getElementById(
        'gardenLocation'
    ).value = '';

    document.getElementById(
        'gardenPlantingNotes'
    ).value = '';

    document.getElementById(
        'gardenPlantMessage'
    ).textContent = '';


    // Store the year for the new entry
    document.getElementById(
        'addGardenPlant'
    ).dataset.gardenYear =
        gardenYear;


    showPage('addGardenPlant');

}


// ----------------------------------------
// ADD PLANT TO MY GARDEN
// ----------------------------------------

function addGardenPlant() {

    const form =
        document.getElementById(
            'addGardenPlant'
        );


    const plantId =
        form.dataset.plantId;


    const gardenYear =
        Number(form.dataset.gardenYear);


    const quantity =
        Number(
            document.getElementById(
                'gardenQuantity'
            ).value
        );


    const plantingDate =
        document.getElementById(
            'gardenPlantingDate'
        ).value;


    const location =
        document.getElementById(
            'gardenLocation'
        ).value.trim();


    const notes =
        document.getElementById(
            'gardenPlantingNotes'
        ).value.trim();


    // Make sure a plant was selected
    if (!plantId) {

        return;

    }


    // Make sure quantity is valid
    if (!quantity || quantity < 1) {

        document.getElementById(
            'gardenPlantMessage'
        ).textContent =
            'Please enter a valid quantity.';

        return;

    }


    // Get existing garden entries
    const garden =
        getMyGarden();


    // Create a new garden entry
    const newEntry = {

        id:
            'garden-' + Date.now(),

        plantId:
            plantId,

        gardenYear:
            gardenYear,

        quantity:
            quantity,

        plantingDate:
            plantingDate,

        location:
            location,

        notes:
            notes

    };


    // Add it to the garden
    garden.push(newEntry);


    // Save garden
    saveMyGarden(garden);


    // Update the year dropdown
    loadGardenYears();


    // Display the garden
    displayMyGarden();


    // Return to My Garden
    showPage('garden');

}


// ----------------------------------------
// FORMAT DATES
// ----------------------------------------

function formatGardenDate(dateString) {

    if (!dateString) {
        return '';
    }


    const date =
        new Date(
            dateString + 'T00:00:00'
        );


    return date.toLocaleDateString(
        undefined,
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }
    );

}
function showGardenPlantDetails(gardenPlantId) {

    const gardenPlants =
        getGardenPlants();

    const gardenPlant =
        gardenPlants.find(function(plant) {

            return plant.id === gardenPlantId;

        });


    if (!gardenPlant) {

        console.error(
            'Garden plant not found:',
            gardenPlantId
        );

        return;

    }


    // Find the original plant in the Plant Library
    const userPlants =
        getUserPlants();

    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    const plant =
        allPlants.find(function(item) {

            return item.id === gardenPlant.plantId;

        });


    if (!plant) {

        console.error(
            'Original plant not found:',
            gardenPlant.plantId
        );

        return;

    }


    const detailsContainer =
        document.getElementById(
            'gardenPlantDetailsContent'
        );


    if (!detailsContainer) {

        console.error(
            'gardenPlantDetailsContent was not found.'
        );

        return;

    }


    detailsContainer.innerHTML = `

        <div class="card">

            <h2>🌱 ${plant.name}</h2>

            <p>
                <strong>Quantity:</strong>
                ${gardenPlant.quantity}
            </p>

            <p>
                <strong>Planting Date:</strong>
                ${gardenPlant.plantingDate || 'Not specified'}
            </p>

            <p>
                <strong>Location:</strong>
                ${gardenPlant.location || 'Not specified'}
            </p>

            <p>
                <strong>Notes:</strong>
                ${gardenPlant.notes || 'None'}
            </p>

        </div>


        <div class="card">

            <h3>Garden Planting</h3>

            <p>
                This is one specific planting of
                ${plant.name}.
            </p>

            <button
                onclick="editGardenPlant('${gardenPlant.id}')"
            >
                ✏️ Edit Planting
            </button>

            <button
                class="delete-button"
                onclick="deleteGardenPlant('${gardenPlant.id}')"
            >
                🗑️ Remove From Garden
            </button>

        </div>


        <div class="card">

            <h3>🧺 Harvest</h3>

            <p>
                Harvest tracking will be added here.
            </p>

            <button
                onclick="showAddHarvest('${gardenPlant.id}')"
            >
                + Add Harvest
            </button>

        </div>

    `;


    showPage('gardenPlantDetails');

}
function showGardenPlantDetails(gardenPlantId) {

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


    const userPlants =
        getUserPlants();


    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    const plant =
        allPlants.find(function(item) {

            return item.id === gardenPlant.plantId;

        });


    if (!plant) {

        console.error(
            'Original plant not found:',
            gardenPlant.plantId
        );

        return;

    }


    const detailsContainer =
        document.getElementById(
            'gardenPlantDetailsContent'
        );


    if (!detailsContainer) {

        console.error(
            'gardenPlantDetailsContent not found.'
        );

        return;

    }


    detailsContainer.innerHTML = `

        <div class="card">

            <h2>🌱 ${plant.name}</h2>

            <p>
                <strong>Quantity:</strong>
                ${gardenPlant.quantity}
            </p>

            <p>
                <strong>Planting Date:</strong>
                ${gardenPlant.plantingDate || 'Not specified'}
            </p>

            <p>
                <strong>Location:</strong>
                ${gardenPlant.location || 'Not specified'}
            </p>

            <p>
                <strong>Notes:</strong>
                ${gardenPlant.notes || 'None'}
            </p>

        </div>


        <div class="card">

            <h3>Garden Planting</h3>

            <button
                onclick="editGardenPlant('${gardenPlant.id}')"
            >
                ✏️ Edit Planting
            </button>

            <button
                class="delete-button"
                onclick="deleteGardenPlant('${gardenPlant.id}')"
            >
                🗑️ Remove From Garden
            </button>

        </div>


        <div class="card">

            <h3>🧺 Harvest</h3>

            <p>
                Harvest tracking will be added here.
            </p>

            <button
                onclick="showAddHarvest('${gardenPlant.id}')"
            >
                + Add Harvest
            </button>

        </div>

    `;


    showPage('gardenPlantDetails');

}
