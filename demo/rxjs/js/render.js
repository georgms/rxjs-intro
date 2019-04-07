function render(container, titles, links) {
    let output = document.createElement('ul');
    output.classList.add('list-group');

    titles.forEach(function (title, i) {
        let entry = document.createElement('li');
        entry.classList.add('list-group-item');

        let link = document.createElement('a');
        link.setAttribute('href', links[i]);
        link.text = title;

        entry.append(link);
        output.append(entry);
    });

    container.innerHTML = output.outerHTML;
}