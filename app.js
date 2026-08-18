function showPage(pageName) {

    const pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    document.getElementById(pageName).style.display = 'block';
}
function saveSettings() {

    const settings = {

        gardenYear: document.getElementById('gardenYear').value,

        springFrost: document.getElementById('springFrost').value,

        fallFrost: document.getElementById('fallFrost').value,

        temperatureUnit: document.querySelector(
            'input[name="temperatureUnit"]:checked'
        )?.value || 'F',

        weightUnit: document.querySelector(
            'input[name="weightUnit"]:checked'
        )?.value || 'oz',

        lengthUnit: document.querySelector(
            'input[name="lengthUnit"]:checked'
        )?.value || 'in'

    };

    localStorage.setItem(
        'gardenSettings',
        JSON.stringify(settings)
    );

    document.getElementById('settingsMessage').textContent =
        'Settings saved!';

}


function loadSettings() {

    const savedSettings =
        localStorage.getItem('gardenSettings');

    if (!savedSettings) {

        // Default settings
        document.getElementById('gardenYear').value =
            new Date().getFullYear();

        document.querySelector(
            'input[name="temperatureUnit"][value="F"]'
        ).checked = true;

        document.querySelector(
            'input[name="weightUnit"][value="oz"]'
        ).checked = true;

        document.querySelector(
            'input[name="lengthUnit"][value="in"]'
        ).checked = true;

        return;
    }


    const settings = JSON.parse(savedSettings);

    document.getElementById('gardenYear').value =
        settings.gardenYear;

    document.getElementById('springFrost').value =
        settings.springFrost;

    document.getElementById('fallFrost').value =
        settings.fallFrost;

    document.querySelector(
        `input[name="temperatureUnit"][value="${settings.temperatureUnit}"]`
    ).checked = true;

    document.querySelector(
        `input[name="weightUnit"][value="${settings.weightUnit}"]`
    ).checked = true;

    document.querySelector(
        `input[name="lengthUnit"][value="${settings.lengthUnit}"]`
    ).checked = true;

}
function displayPlantLibrary() {

    const libraryContainer =
        document.getElementById('plantLibrary');

    libraryContainer.innerHTML = '';

    plantLibrary.forEach(function(plant) {

        const plantCard = document.createElement('div');

        plantCard.className = 'card';

        plantCard.innerHTML = `
            <h2>${plant.name}</h2>

            <p>
                <strong>Category:</strong>
                ${plant.category}
            </p>

            <p>
                <strong>Days to maturity:</strong>
                ${plant.daysToMaturityMin}
                –
                ${plant.daysToMaturityMax} days
            </p>

            <p>
                <strong>Sunlight:</strong>
                ${plant.sunlight}
            </p>

            <button onclick="showPlantDetails('${plant.id}')">
                View Plant
            </button>
        `;

        libraryContainer.appendChild(plantCard);

    });

}
displayPlantLibrary();
function showPlantDetails(plantId) {

    const plant = plantLibrary.find(function(item) {
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

            <p>
                <strong>Category:</strong>
                ${plant.category}
            </p>

            <h3>Growing Information</h3>

            <p>
                <strong>Days to maturity:</strong>
                ${plant.daysToMaturityMin}
                –
                ${plant.daysToMaturityMax} days
            </p>

            <p>
                <strong>Spacing:</strong>
                ${plant.spacing}
            </p>

            <p>
                <strong>Sunlight:</strong>
                ${plant.sunlight}
            </p>

            <p>
                <strong>Start indoors:</strong>
                ${plant.startIndoors
                    ? plant.weeksBeforeFrost + " weeks before last frost"
                    : "Not normally needed"
                }
            </p>

            <p>
                <strong>Transplant:</strong>
                ${plant.transplantAfterFrost
                    ? "After last frost"
                    : "Not normally needed"
                }
            </p>

            <p>
                <strong>Direct sow:</strong>
                ${plant.directSow ? "Yes" : "No"}
            </p>

            <p>
                ${plant.notes}
            </p>

        </div>


        <div class="card">

            <h2>📅 Your Growing Dates</h2>

            <div id="plantDates">
                Calculated dates will appear here.
            </div>

        </div>


        <div class="card">

            <h2>📝 Your Personal Notes</h2>

            <p>
                These notes are specific to your experience
                growing this plant.
            </p>

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

    `;

    loadPlantNotes(plant.id);

    showPage('plantDetails');

}
function savePlantNotes(plantId) {

    const notes =
        document.getElementById('personalPlantNotes').value;

    const savedNotes =
        JSON.parse(localStorage.getItem('plantNotes')) || {};

    savedNotes[plantId] = notes;

    localStorage.setItem(
        'plantNotes',
        JSON.stringify(savedNotes)
    );

    document.getElementById('plantNotesMessage').textContent =
        'Notes saved!';

}
function loadPlantNotes(plantId) {

    const savedNotes =
        JSON.parse(localStorage.getItem('plantNotes')) || {};

    const notes =
        savedNotes[plantId] || '';

    document.getElementById('personalPlantNotes').value =
        notes;

}
loadSettings();
