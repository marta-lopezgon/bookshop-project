// JSON CALL

$(document).ready(function () {

    $.ajax({
        type: "get",
        url: 'https://api.myjson.com/bins/1h3vb3',
        "success": function (json_books) {
            data = json_books;
            console.log("the books", data);

            addBooks(data);
            searchBooks();

        },
        "error": function (data) {
            console.log("error", data);
        }
    });
});

// FANCYBOX

$('[data-fancybox]').fancybox({
    buttons: ['zoom', 'close']
});

// PUT THE BOOKS

function addBooks(data) {
    var theBooks = data.books;
    var books = document.getElementById("books");
    books.innerHTML = ""
    for (var i = 0; i < theBooks.length; i++) {

        //CREATE THE FLIPPER
        var flipContainer = document.createElement("div");
        flipContainer.setAttribute("class", 'flip-container' + ' ' + 'col-sm-4' + ' ' + 'element-item' );

        var flipper = document.createElement("div");
        flipper.setAttribute("class", 'flipper');

        //CREATE FRONT
        var front = document.createElement("div");
        front.setAttribute("class", 'front');

        //ADD COVER IN FRONT
        var portadaInfo = theBooks[i].portada;

        var portadaImg = document.createElement("img");
        portadaImg.setAttribute("class", 'imgPortada');
        portadaImg.setAttribute("src", portadaInfo);

        //CREATE BACK
        var back = document.createElement("div");
        back.setAttribute("class", 'back');

        //ADD INFO IN BACK
        var tittle = document.createElement("p");
        tittle.setAttribute("class", 'titulo');
        var titInfo = theBooks[i].titulo;


        var desc = document.createElement("p");
        desc.setAttribute("class", 'descrip');
        var descInfo = theBooks[i].descripcion;


        var masLink = theBooks[i].descripcion;
        var link = document.createElement('a');
        link.className = "caption-book";
        link.setAttribute("href", theBooks[i].detalle);
        link.setAttribute("data-fancybox", "k");
        link.setAttribute("data-caption", masLink);

        var masButton = document.createElement('button');
        masButton.className = "bttn-read-more";
        masButton.textContent = "Más Info";


        front.append(portadaImg);
        flipper.append(front);
        tittle.append(titInfo);
        back.append(tittle);
        desc.append(descInfo);
        back.append(desc);
        link.append(masButton);
        back.append(link);
        flipper.append(back);
        flipContainer.append(flipper);
        books.append(flipContainer);
    }
}

// FANCYBOX
function searchBooks() {
    // quick search regex
    var qsRegex;

    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        filter: function () {
            return qsRegex ? $(this).text().match(qsRegex) : true;
        }
    });

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
    }, 200));

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
            if (timeout) {
                clearTimeout(timeout);
            }

            function delayed() {
                fn();
                timeout = null;
            }
            timeout = setTimeout(delayed, threshold || 100);
        }
    }
}
