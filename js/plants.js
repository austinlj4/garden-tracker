function displayPlantLibrary(searchTerm = "") {

    const libraryContainer =
        document.getElementById('plantLibrary');

    libraryContainer.innerHTML = '';

    const search =
        searchTerm.toLowerCase().trim();


    // Get the user-created plants
    const userPlants = getUserPlants();


    // Combine built-in and user-created plants
    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];


    // Search
    const filteredPlants =
        allPlants.filter(function(plant) {

            return (
                plant.name.toLowerCase().includes(search) ||
                plant.crop.toLowerCase().includes(search) ||
                (plant.variety &&
                    plant.variety.toLowerCase().includes(search))
            );

        });


    // Alphabetical sorting
    filteredPlants.sort(function(a, b) {

        return a.name.localeCompare(
            b.name
        );

    });


    // Create the list
    filteredPlants.forEach(function(plant) {

        const plantItem =
            document.createElement('div');

        plantItem.className =
            'plant-library-item';

        plantItem.textContent =
            plant.name;

        plantItem.onclick = function() {

            showPlantDetails(plant.id);

        };

        libraryContainer.appendChild(
            plantItem
        );

    });


    if (filteredPlants.length === 0) {

        libraryContainer.innerHTML =
            '<p>No plants found.</p>';

    }

}


displayPlantLibrary();


function showAddPlantForm() {

    showPage('addPlant');

}


function addUserPlant() {

    const crop =
        document.getElementById('newPlantCrop').value.trim();

    const variety =
        document.getElementById('newPlantVariety').value.trim();

    const category =
        document.getElementById('newPlantCategory').value;

    const daysMin =
        Number(
            document.getElementById('newPlantDaysMin').value
        );

    const daysMax =
        Number(
            document.getElementById('newPlantDaysMax').value
        );

    const notes =
        document.getElementById('newPlantNotes').value.trim();


    // Make sure a crop was entered
    if (!crop) {

        document.getElementById('addPlantMessage').textContent =
            'Please enter a crop name.';

        return;
    }


    // Create the display name
    let name = crop;

    if (variety) {
        name = `${crop} — ${variety}`;
    }


    // Check whether we are editing an existing plant
    const addPlantPage =
        document.getElementById('addPlant');

    const editingId =
        addPlantPage.dataset.editingId;


    // Get existing user-created plants
    const userPlants = getUserPlants();


    if (editingId) {

        // -------------------------
        // EDIT EXISTING PLANT
        // -------------------------

        const plantIndex =
            userPlants.findIndex(function(plant) {
                return plant.id === editingId;
            });


        if (plantIndex !== -1) {

            userPlants[plantIndex] = {

                ...userPlants[plantIndex],

                name: name,

                crop: crop,

                variety: variety,

                category: category,

                daysToMaturityMin: daysMin,

                daysToMaturityMax: daysMax,

                notes: notes

            };

        }

    } else {

        // -------------------------
        // CREATE NEW PLANT
        // -------------------------

        const newPlant = {

            id:
                'user-' + Date.now(),

            name: name,

            crop: crop,

            variety: variety,

            category: category,

            startIndoors: false,

            weeksBeforeFrost: 0,

            transplantAfterFrost: true,

            directSow: true,

            daysToMaturityMin: daysMin,

            daysToMaturityMax: daysMax,

            spacing: "",

            sunlight: "",

            notes: notes

        };


        userPlants.push(newPlant);

    }


    // Save the updated plant list
    saveUserPlants(userPlants);


    // Leave editing mode
    delete addPlantPage.dataset.editingId;


    // Reset the page title
    document.querySelector(
        '#addPlant h2'
    ).textContent = '🌱 Add Plant';


    // Reset the button
    document.querySelector(
        '#addPlant button[onclick="addUserPlant()"]'
    ).textContent = 'Add Plant';


    // Clear the form
    document.getElementById('newPlantCrop').value = '';

    document.getElementById('newPlantVariety').value = '';

    document.getElementById('newPlantDaysMin').value = '';

    document.getElementById('newPlantDaysMax').value = '';

    document.getElementById('newPlantNotes').value = '';

    document.getElementById('addPlantMessage').textContent =
        'Plant saved!';


    // Refresh the Plant Library
    displayPlantLibrary();


    // Return to the Plant Library
    showPage('plants');

}


function showPlantDetails(plantId) {

    const userPlants = getUserPlants();

    const allPlants = [
        ...plantLibrary,
        ...userPlants
    ];

    const plant = allPlants.find(function(item) {
        return item.id === plantId;
    });


    if (!plant) {
        return;
    }


    const detailsContainer =
        document.getElementById('plantDetailsContent');


    detailsContainer.innerHTML = `

        <div class="card">

            <h2>🌱 ${plant.name}</h2>
            <button
    onclick="showAddGardenPlantForm('${plant.id}')"
>
    Add to My Garden
</button>

            <p>
                <strong>Category:</strong>
                ${plant.category}
            </p>

            <p>
                <strong>Days to maturity:</strong>
                ${plant.daysToMaturityMin || 'Not specified'}
                –
                ${plant.daysToMaturityMax || 'Not specified'}
                days
            </p>

            <p>
                <strong>Spacing:</strong>
                ${plant.spacing || 'Not specified'}
            </p>

            <p>
                <strong>Sunlight:</strong>
                ${plant.sunlight || 'Not specified'}
            </p>

            <p>
                ${plant.notes || ''}
            </p>

        </div>


        <div class="card">

            <h2>📝 Your Personal Notes</h2>

            <textarea
                id="personalPlantNotes"
                rows="8"
                placeholder="Example: Needs extra water. Don't plant on east side of garage."
            ></textarea>

            <br><br>

            <button onclick="savePlantNotes('${plant.id}')">
                Save Notes
            </button>

            <p id="plantNotesMessage"></p>

        </div>


        ${
            plant.id.startsWith('user-')
            ? `
                <div class="card">

                    <h3>Manage Plant</h3>

                    <button
                        onclick="editUserPlant('${plant.id}')"
                    >
                        Edit Plant
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteUserPlant('${plant.id}')"
                    >
                        Delete Plant
                    </button>

                    <p>
                        You can edit or remove this custom plant.
                    </p>

                </div>
            `
            : ''
        }

    `;


    loadPlantNotes(plant.id);

    showPage('plantDetails');

}


function deleteUserPlant(plantId) {

    const confirmed =
        confirm(
            'Are you sure you want to delete this plant?'
        );


    if (!confirmed) {
        return;
    }


    // Get user-created plants
    const userPlants = getUserPlants();


    // Remove the selected plant
    const updatedPlants =
        userPlants.filter(function(plant) {
            return plant.id !== plantId;
        });


    // Save the updated list
    saveUserPlants(updatedPlants);


    // Remove any saved personal notes for this plant
    const savedNotes = getPlantNotes();

    delete savedNotes[plantId];

    savePlantNotesData(savedNotes);


    // Return to the library
    displayPlantLibrary();

    showPage('plants');

}


function editUserPlant(plantId) {

    // Get user-created plants
    const userPlants = getUserPlants();


    const plant =
        userPlants.find(function(item) {
            return item.id === plantId;
        });


    if (!plant) {
        return;
    }


    // Fill the Add Plant form with existing information

    document.getElementById('newPlantCrop').value =
        plant.crop;

    document.getElementById('newPlantVariety').value =
        plant.variety || '';

    document.getElementById('newPlantCategory').value =
        plant.category;

    document.getElementById('newPlantDaysMin').value =
        plant.daysToMaturityMin || '';

    document.getElementById('newPlantDaysMax').value =
        plant.daysToMaturityMax || '';

    document.getElementById('newPlantNotes').value =
        plant.notes || '';


    // Remember which plant we're editing
    document.getElementById('addPlant').dataset.editingId =
        plantId;


    // Change the page title
    document.querySelector(
        '#addPlant h2'
    ).textContent =
        '✏️ Edit Plant';


    // Change the button text
    document.querySelector(
        '#addPlant button[onclick="addUserPlant()"]'
    ).textContent =
        'Save Changes';


    showPage('addPlant');

}
