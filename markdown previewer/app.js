const clearBtn = document.querySelector('#clear')
const copyBtn = document.querySelector('#copy')
const downloadBtn = document.querySelector('#download')
const textArea = document.querySelector('#markdown')
const resultado = document.querySelector('#resultado')
let timerId

clearBtn.onclick = () => clear()

copyBtn.onclick = () => copy()

downloadBtn.onclick = () => downloadFile(textArea.value)

textArea.oninput = () => throttle(convertMarkdowntoHTML)

const throttle = (func) => {
    if (timerId) return

    timerId = setTimeout(() => {
        func()
        timerId = null
    }, 3000);
}

const convertMarkdowntoHTML = () => {
    resultado.innerHTML = marked(textArea.value)
}

const clear = () => {
    textArea.value = ''
    resultado.innerHTML = ''
}

const copy = () => {
    textArea.select()
    document.execCommand('copy')
    alert('Markdown copiado para a área de transferência')
}

const downloadFile = (text) => {
    if (!text) return

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, 'README' + ".md");
}