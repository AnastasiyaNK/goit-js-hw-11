import PixabayApi from "./js/pixabay-api";
import { Notify } from "notiflix";
import createCards from "./js/create-html";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const api = new PixabayApi();

let lightbox = new SimpleLightbox('.gallery .link', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

const formEl = document.querySelector("#search-form")
const inputEl = document.querySelector('[name="searchQuery"]')
const loadMoreEl = document.querySelector(".load-more")
const galleryEl = document.querySelector(".gallery")

formEl.addEventListener("submit", onSearchImg)
loadMoreEl.addEventListener("click", onLoadMore)

function onSearchImg(e) {
    e.preventDefault();
    const inputValue = inputEl.value.trim();
    if (inputValue) {
        api.setSearchName(inputValue)
        api.resetPage()
        galleryEl.innerHTML = "";

        
        api.getImages()
            .then(images => {
                Notify.success(`Hooray! We found ${images.totalHits} images.`);
                images.hits.map(imgData => createCards(imgData))
                loadMoreEl.style.display = "block"
                lightbox.refresh()
            })
            .catch(error => Notify.failure("Sorry, there are no images matching your search query. Please try again."))  
    } else {
        Notify.warning('Please enter a search word')
    }
   
}

function onLoadMore(e) {
       api.getImages()
            .then(images => {
                images.hits.map(imgData => createCards(imgData))
                lightbox.refresh()

                const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();

                    window.scrollBy({
                    top: cardHeight * 2,
                    behavior: "smooth",
                    });
            })
            .catch(error => {
                Notify.info("We're sorry, but you've reached the end of search results.")
                 loadMoreEl.style.display= "none"
            })  
}

