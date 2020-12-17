

let homePics = document.getElementById("grid-container");
let searchBtn = document.getElementById("searchBtn");
let searchText = document.getElementById("searchText");
let imagesContent = document.getElementById("grid-container");
let flashMessage = document.getElementById("flashMessage");
let logo = document.getElementById("logo");

logo.addEventListener("click",()=>{
    location.replace("/homeGallery");
})

function createCard(row){
return `<div class = "card">
<img src="${row.thumbnail}" alt="Missing Image">
<div>
    <h3>${row.title}</h3>
    <p>${row.description}</p>
    <a href="/getPost/${row.id}">POST DETAILS</a>
</div>
</div>`
}

function addsearchMessage(message){
    let searchMessage = `<div class = "flashMsg">${message}</div>`;
    flashMessage.innerHTML = searchMessage;
}
if(searchText){
    searchBtn.addEventListener("click",()=>{
        if(!searchText.value){
            location.replace("/homeGallery");
        }
        else{
            fetch(`/posts/search?search=${searchText.value}`)
            .then(data => data.json())
            .then((data)=>{
                let newImageContent = "";
                data.results.forEach((row)=>{
                    newImageContent += createCard(row);
                })
                imagesContent.innerHTML = newImageContent;
                if(data.message){
                    addsearchMessage(data.message);
                }
            })
        }
    })
}