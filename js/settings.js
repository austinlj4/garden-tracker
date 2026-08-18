// Garden App Settings
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
