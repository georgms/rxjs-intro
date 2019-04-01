document.querySelector('#search').addEventListener('input', function (event) {
    let controller = new AbortController();
    let signal = controller.signal;

    let currentRequest = undefined;

    let container = document.querySelector('#output');

    let query = event.target.value;
    if (query.trim() === '') {
        container.innerHTML = '';
        return;
    }

    let throttleTimeout = window.setTimeout(function () {
        window.clearTimeout(throttleTimeout);

        let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=' + query;
        currentRequest = fetch(url, {signal})
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                let titles = json[1];
                let links = json[3];
                render(container, titles, links);
            })
            .catch(function(error) {
                if (e.name === 'AbortError') {
                    console.log('Request aborted');
                }
            })
    }, 1000);
});