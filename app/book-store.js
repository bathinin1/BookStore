import * as $ from 'jquery';

export default class BookStore {
    constructor() {
        this.searchResultRowId = 'search-result-row';
        this.searchBtnId = 'search-btn';
        this.searchInputId = 'search-input';
    }

    getSearchUrl(searchText) {
        return `https://www.googleapis.com/books/v1/volumes?q=${searchText}&maxResults=12&v3`
    }

    renderDummyBooks() {
        let dummyBook = `
                <div class="col-12 col-sm-4 skeleton-col">
                    <div class="skeleton-container">
                        <div class="img-skel"></div>
                        <div class="details-skel">
                            <h5 class="name">..........</h5>
                            <span class="author">by .............</span>
                            <p class="details">... ... ... ... ... ...
                                ... ... ... ... ... ... ... ... ... ... ... ... ... ... ...</p>
                        </div>
                    </div>
                </div>`;

        let dummyBooks = '';
        for (let i = 0; i < 12; ++i) {
            dummyBooks += dummyBook;
        }

        document.getElementById(this.searchResultRowId).innerHTML = dummyBooks;
    }

    searchBooks(event) {
        event.preventDefault();
        event.stopPropagation();

        let searchText = document.getElementById(this.searchInputId).value;

        // for loading dummy items
        this.renderDummyBooks();
        $.ajax(this.getSearchUrl(searchText))
            .done((result) => {
                this.renderSearchedBooks(result.items);
            })
    }

    renderSearchedBooks(books) {
        let booksHTML = '';
        books.map(book => {
            let bookInfo = book.volumeInfo;

            let desc = bookInfo.description ? bookInfo.description.length > 70 ?
                bookInfo.description.slice(0, 70) + '...' : bookInfo.description.slice(0, 70)
                : '';
            booksHTML += `
                <div class="col-12 col-sm-4 skeleton-col">
                    <div class="skeleton-container">
                        <div class="img-skel">
                            <img src="${bookInfo.imageLinks.thumbnail}">
                        </div>
                        <div class="details-skel">
                            <h5 class="name">${bookInfo.title}</h5>
                            <span class="author">by ${bookInfo.authors[0]}</span>
                            <p class="details">${desc}</p>
                        </div>
                    </div>
                </div>`;
        });

        document.getElementById(this.searchResultRowId).innerHTML = booksHTML;
    }

    init() {
        document.getElementById(this.searchBtnId).addEventListener('click', evt => this.searchBooks(evt));
        this.renderDummyBooks();
    }
}