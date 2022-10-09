//Book class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

//UI class
class UI{
   //UI prototype to add Book to List
addBookToList(book){
    const list = document.querySelector('#book-list');
// create tr element
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = 'delete'>x</a></td>
    `;

    list.appendChild(tr);
}

//clear fields after successfully adding book
clearFields(){
    const title = document.getElementById('title').value = '',
          author = document.getElementById('author').value = '',
          isbn = document.getElementById('isbn').value = ''
}

// validation
showAlert(message, className){
    //create a div
   const div = document.createElement('div');
   div.className = `alert ${className}`;
   div.appendChild(document.createTextNode(message));

   const container = document.querySelector('.container');
   const bookForm = document.querySelector('#book-form');
// insert in the dom
   container.insertBefore(div, bookForm);
// set timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//remove book
removeBook(target){
    if(target.classList.contains('delete')){
        target.parentElement.parentElement.remove();
    }
}
}

// Local Storage Class
class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBook(){
        const books = Store.getBook();

        books.forEach(function(book){
            const ui = new UI();

            ui.addBookToList(book);
        })
    }
    static addBook(book){
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBook();

        
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBook);

const form = document.getElementById('book-form');
form.addEventListener('submit', submitForm);

function submitForm(e){
// getting values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
// new book object
    const book = new Book(title, author, isbn);

// new UI object
    const ui = new UI();

    
//validation
if(title === '' || author === '' || isbn === ''){
   // show alert
   ui.showAlert('Please fill all fields', 'error');
}else{
    // add book to list
    ui.addBookToList(book);

    Store.addBook(book);
    //show success
    ui.showAlert('Book added!', 'success');
    // clear fields
       ui.clearFields();   
}
    e.preventDefault();
};

// remove book event listerner 
const bookList = document.getElementById('book-list');

bookList.addEventListener('click', list);

function list(e){
    //new UI object
    const ui = new UI();
    
    //remove book
    ui.removeBook(e.target);

    //remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show alert
    ui.showAlert('Book removed!!', 'success');
    e.preventDefault();
}