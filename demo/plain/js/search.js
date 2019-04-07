let container = document.querySelector('#output');
let spinner = document.querySelector('#spinner');
let searchField = document.querySelector('#search');

let debounceTimeout = undefined;
let controller = new AbortController();

let baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*';

searchField.addEventListener('input', event => {

    /* Cancel existing request. */
    controller.abort();

    /* Reset debounce timer. */
    window.clearTimeout(debounceTimeout);

    spinner.style.display = 'none';

    let query = event.target.value;
    if (query.trim() === '') {
        container.innerHTML = '';
        return;
    }

    debounceTimeout = window.setTimeout(() => {
        spinner.style.display = 'block';

        controller = new AbortController();
        let signal = controller.signal;

        let url = baseUrl + '&_=' + new Date().getTime() + '&search=' + query;
        fetch(url, {signal})
            .then(response => response.json())
            .then(json => {
                let titles = json[1];
                let links = json[3];
                render(container, titles, links);

                spinner.style.display = 'none';
            });
    }, 300);
});