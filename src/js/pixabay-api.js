import axios from "axios";

export default class PixabayApi{
    constructor() {
        this.baseUrl = "https://pixabay.com/api/",
            this.apiKey = "38960766-ca3732db6d6d2dbd2c03e237a",
            this.searchWord = "",
            this.imageType = "photo",
            this.orientation = "horizontal",
            this.safesearch = true,
            this.perPage = 40,
            this.page = 1
    }
    async getImages() {
        const url = `${this.baseUrl}?key=${this.apiKey}&q=${this.searchWord}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`

        return await axios.get(url).then(response => {
            if (response.status !== 200 || response.data.hits.length === 0 ) {
                throw new Error(response.status)
            }
            this.nextPage()
            return response.data;
        })
    }
    nextPage() {
        this.page += 1
    }
    resetPage() {
        this.page = 1
    }
    setSearchName(newName) {
        this.searchWord = newName
    }
};

