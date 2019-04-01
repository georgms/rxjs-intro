let throttleTimeout = undefined;

document.querySelector('#search').addEventListener('input', function (event) {
    let container = document.querySelector('#output');

    let query = event.target.value;
    if (query.trim() === '') {
        container.innerHTML = '';
        return;
    }

    window.clearTimeout(throttleTimeout);
    throttleTimeout = window.setTimeout(function () {
        document.querySelector('#spinner').style.display = 'block';

        let url = 'proxy.php?action=opensearch&origin=*&time=' + new Date().getTime() + '&search=' + query;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                let titles = json[1];
                let links = json[3];
                render(container, titles, links);

                document.querySelector('#spinner').style.display = 'none';
            });
    }, 1000);
});