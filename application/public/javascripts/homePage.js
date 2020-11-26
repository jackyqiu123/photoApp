

let homePics = document.getElementById("grid-container");

let count = document.getElementById("count");
let counter = 0;
async function fetchPhotos() {

    const response = await fetch('https://jsonplaceholder.typicode.com/albums/2/photos');
    const data = await response.json();
    data.forEach(picture => {
        let imgUrl = document.createElement("img");
        let title = document.createElement("h2");
        let imgContainer = document.createElement("div");
        imgUrl.src = picture.url;
        title.innerText = picture.title;
        imgContainer.className = "grid-pic";

        imgContainer.appendChild(imgUrl);
        imgContainer.appendChild(title);
        imgContainer.setAttribute("onclick", "remove(event)");
        homePics.appendChild(imgContainer);
        counter++;
    })
    count.innerText = `Number of Pictures: ${counter}`;
}
function remove(event) {
    console.log(event);
    event.path[1].classList.add("fade");
    setTimeout(function () { homePics.removeChild(event.path[1]); }, 800);
    //homePics.removeChild(event.path[1]);
    count.innerText = `Number of Pictures: ${--counter}`;
}
fetchPhotos();