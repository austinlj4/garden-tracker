// Garden App Settings


function saveSettings() {

    const settings = {

        gardenYear:
            document.getElementById('gardenYear').value,

        springFrost:
            document.getElementById('springFrost').value,

        fallFrost:
            document.getElementById('fallFrost').value,

        temperatureUnit:
            document.querySelector(
                'input[name="temperatureUnit"]:checked'
            )?.value || 'F',

        weightUnit:
            document.querySelector(
                'input[name="weightUnit"]:checked'
            )?.value || 'oz',

        lengthUnit:
            document.querySelector(
                'input[name="lengthUnit"]:checked'
            )?.value || 'in'

    };


    // Save settings using storage.js
    saveAppSettings(settings);


    document.getElementById('settingsMessage').textContent =
        'Settings saved!';

}


function loadSettings() {

    // Get settings using storage.js
    const settings = getAppSettings();


    // If no settings have been saved yet,
    // use the default settings

    if (Object.keys(settings).length === 0) {

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


    // Load saved settings

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


loadSettings();
