import 'bootstrap';

import BookStore from './book-store';

import './scss/main.scss';


let bookStore = new BookStore();
let domReady = (callback) => {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() :
        document.addEventListener("DOMContentLoaded", callback);
};

domReady(()=>{
   bookStore.init();
});

console.log('Inside main.js');
