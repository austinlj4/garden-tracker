// Garden App Navigation
function showPage(pageName) {

    const pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    document.getElementById(pageName).style.display = 'block';
}
