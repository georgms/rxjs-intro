let container = document.querySelector('#output');
let spinner = document.querySelector('#spinner');

let baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*';

let getQuery = rxjs.operators.map(event => event.target.value);
let clearOutputForEmptyQuery = rxjs.operators.tap(query => query === '' ? container.innerHTML = '' : undefined);
let filterEmptyQuery = rxjs.operators.filter(query => query !== '');
let debounceInput = rxjs.operators.debounce(() => rxjs.interval(300));
let showSpinner = rxjs.operators.tap(() => spinner.style.display = 'block');
let buildUrl = rxjs.operators.map(query => baseUrl + '&_=' + new Date().getTime() + '&search=' + query);
let fetchResults = rxjs.operators.switchMap(url => rxjs.from(fetch(url)));
let extractJson = rxjs.operators.switchMap(response => rxjs.from(response.json()));
let prepareResults = rxjs.operators.map(json => ({'titles': json[1], 'links': json[3]}));
let hideSpinner = rxjs.operators.tap(() => spinner.style.display = 'none');
let renderResults = ({titles, links}) => render(container, titles, links);

rxjs.fromEvent(document.querySelector('#search'), 'input').pipe(
    getQuery,
    clearOutputForEmptyQuery,
    filterEmptyQuery,
    debounceInput,
    showSpinner,
    buildUrl,
    fetchResults,
    extractJson,
    prepareResults,
    hideSpinner
).subscribe(
    renderResults,
    error => console.log(error)
);