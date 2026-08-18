function showPage(pageName) {

    const pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    document.getElementById(pageName).style.display = 'block';
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
