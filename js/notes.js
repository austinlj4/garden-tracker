function savePlantNotes(plantId) {

    const notes =
        document.getElementById('personalPlantNotes').value;


    // Get all saved plant notes
    const savedNotes = getPlantNotes();


    // Update this plant's notes
    savedNotes[plantId] = notes;


    // Save the updated notes
    savePlantNotesData(savedNotes);


    document.getElementById('plantNotesMessage').textContent =
        'Notes saved!';

}


function loadPlantNotes(plantId) {

    // Get all saved plant notes
    const savedNotes = getPlantNotes();


    // Get this plant's notes
    const notes =
        savedNotes[plantId] || '';


    document.getElementById('personalPlantNotes').value =
        notes;

}
