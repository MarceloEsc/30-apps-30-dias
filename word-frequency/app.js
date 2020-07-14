const text = document.querySelector('#text');
const btn = document.querySelector('button');
const tableDisplay = document.querySelector('.container');

btn.onclick = () => {
    let result = countWords(text.value);
    insertIntoTable(result);
}

function countWords(str) {
    if (str.length === 0) return {};

    let words = [];
    let strArr = str.split(" ");

    for (let i = 0; i < strArr.length; i++) {
        let word = strArr[i];
        if (words[word] === undefined) words[word] = 1;
        else words[word] += 1;
    }

    return Object.entries(words);
}

function insertIntoTable(wordsArr) {
    wordsArr.sort((a, b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
    })
    console.log(wordsArr);

    const table = document.createElement('table');
    table.innerHTML = `Top 10 palavras<tr><th>Palavra</th><th>Qtd</th></tr>`;

    for (let i = 0; i < wordsArr.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${wordsArr[i][0]}</td><td>${wordsArr[i][1]}</td>`;
        table.appendChild(tr);
        if (i == 10) break;
    }

    if (document.querySelector('table')) {
        tableDisplay.removeChild(document.querySelector('table'));
    }

    tableDisplay.appendChild(table);
}