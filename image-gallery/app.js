import images from "./images.js";

const display = document.querySelector('#display')
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modalImage");

console.log(modalImage);

function init() {
    insertImagesIntoDOM()
    // getImageElements()
}
init()


function insertImagesIntoDOM() {
    images.map(image => {
        const div = document.createElement('div')
        div.classList.add('thumb')
        div.innerHTML = `
        <div class="image" style="background-image: url(images/${image.file});">
        <img src="images/${image.file}">
        </div>
        <span>${image.title}</span>`

        display.appendChild(div)

        div.onclick = event => {
            if (event.target.tagName === 'IMG') {
                modal.style.display = "block";
                modalImage.src = event.target.src;
                console.log(modalImage);

            }
        }
    })
}

document.querySelector(".close").onclick = () => modal.style.display = "none";
modal.onclick = () => modal.style.display = "none";
