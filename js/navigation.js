function showPage(pageId) {

    const pages =
        document.querySelectorAll('.page');


    pages.forEach(function(page) {

        page.style.display = 'none';

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.style.display = 'block';

    }


    // Load My Garden whenever its page is opened
    if (pageId === 'garden') {

        loadGardenYears();

        displayMyGarden();

    }

}
