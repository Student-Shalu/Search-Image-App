'use strict';

const searchResult = document.querySelector(".search-result");
const moreBtn = document.querySelector("#show-more-button");
const formEl = document.querySelector("form");
const accessKey = `MPT5-MPCCoJU-Z4gIrZHH2xl5n_Hx5ytSK0wzxcJpOk`;
const modal = document.getElementById("image-modal");
const enlargedImg = document.getElementById("enlarged-img");
const downloadLink = document.getElementById("download-link");
const closeModal = document.querySelector(".close");

let page = 1;

async function searchImage(){
    const input = document.querySelector("input").value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = ""; 
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-image');
        
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        
        image.addEventListener('click', () => {
            openModal(result.urls.full, result.alt_description);
        });

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        
        searchResult.appendChild(imageWrapper);
    });

    page++;
    
    if (page > 1) {
        moreBtn.style.display = "block"; 
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage(); 
});

moreBtn.addEventListener("click", () => {
    searchImage();
});


function openModal(imageUrl, imageAlt) {
    modal.style.display = "block";
    enlargedImg.src = imageUrl; 
    enlargedImg.alt = imageAlt; 
    downloadLink.href = imageUrl; 
}


closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
