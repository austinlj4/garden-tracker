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
                <strong>Spacing:</strong>
                ${plant.spacing}
            </p>

            <p>
                <strong>Sunlight:</strong>
                ${plant.sunlight}
            </p>
        `;

        libraryContainer.appendChild(plantCard);

    });

}
displayPlantLibrary();
loadSettings();
