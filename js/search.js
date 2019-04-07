let container = document.querySelector('#output');
let spinner = document.querySelector('#spinner');
let searchField = document.querySelector('#search');

let debounceTimeout = undefined;
let controller = new AbortController();

searchField.addEventListener('input', event => {

    /* Cancel existing request. */
    controller.abort();
    spinner.style.display = 'none';

    let query = event.target.value;
    if (query.trim() === '') {
        container.innerHTML = '';
        return;
    }

    window.clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(() => {
        spinner.style.display = 'block';

        controller = new AbortController();
        let signal = controller.signal;

        let url = 'proxy.php?search=' + query;
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