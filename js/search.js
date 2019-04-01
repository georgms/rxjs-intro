document.querySelector('#search').addEventListener('input', function (event) {
    let query = event.target.value;

    let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=' + query;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                let titles = json[1];
                let links = json[3];

                let container = document.querySelector('#output');
                render(container, titles, links);
            });
});