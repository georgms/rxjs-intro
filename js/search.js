document.querySelector('#search').addEventListener('input', function (event) {
    let query = event.target.value;

    let url = 'proxy.php?action=opensearch&origin=*&time=' + new Date().getTime() + '&search=' + query;
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
