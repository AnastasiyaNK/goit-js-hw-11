const galleryEl = document.querySelector(".gallery")

export default function createCards(img) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
    const galleryCard = 
         `<div class="photo-card">
     <a href="${largeImageURL}" class="link"><img class="card-img"src="${webformatURL}" alt="${tags}" width="200" loading="lazy" /> </a>
        
    <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${likes}
        </p>
        <p class="info-item">
        <b>Views</b>
         ${views}
        </p>
        <p class="info-item">
        <b>Comments</b>
         ${comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
         ${downloads}
        </p>
    </div>
    </div>`
   galleryEl.insertAdjacentHTML("beforeend",galleryCard )
};