// document.getElementById('submitbtn',clickbtn);

//Book class:Represents a book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI :Handle UI tasks
class UI{
    static displayBooks(){
        
        
        const books=Store.getBooks();

        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#"class="btn btn-primary delete">X</a></td>
        
        `;
        list.appendChild(row);

    }
    static clearfields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(() =>document.querySelector('.alert').remove(),3000);
    }
    
    
    static deletebook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }

    }
}
//Store class handles storage
class Store{
static getBooks(){
let books;
if(localStorage.getItem('books') === null){
    books=[];
}else{
    books=JSON.parse(localStorage.getItem('books'));
}
return books;
}

static addBook(book){
    const books=Store.getBooks();
    books.push(book);
    
    localStorage.setItem('books', JSON.stringify(books));

}
static removeBook(isbn){
const books=Store.getBooks();
books.forEach((book,index)=>{
    if(book.isbn === isbn){
        books.splice(index,1);
    }
    localStorage.setItem('books',JSON.stringify(books));
});
}
}
// Event:display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);
// Event:add a book
document.querySelector('#book-form').addEventListener(
    'submit',(e)=>{
        //Get actual submit
        e.preventDefault();
        //Get form values
       const title= document.querySelector('#title').value;
        const author=document.querySelector('#author').value;
        const isbn=document.querySelector('#isbn').value;
     if(title===''||author===''||isbn===''){
        UI.showAlert('Please fill out all the fields needed','danger'); 
     }else{

     
        //Instantiate books
        const book=new Book(title,author,isbn);
        // console.log(book);
        //Add book to UI
        UI.addBookToList(book);
        //Book added success
        //Add book to Store
        Store.addBook(book);
        //remove book from store
       
        //Show success message
        UI.showAlert('Book added successfully','success');
        //Clear fields
        UI.clearfields();

    }
}
);
//Remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
UI.deletebook(e.target);
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});