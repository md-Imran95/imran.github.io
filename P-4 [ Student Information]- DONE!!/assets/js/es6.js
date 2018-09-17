class Book{
    constructor(name, branch, roll,dob,contact) {
        this.name = name;
        this.branch = branch;
        this.roll = roll;
        this.dob=dob;
        this.contact=contact;
      }

    }
class UI
{
        addBookToList(book){
            const list=document.getElementById('data-list');
            // Create tr element
            const row=document.createElement('tr');
            // insert cols
            row.innerHTML=`
            <td>${book.name}</td>
            <td>${book.branch}</td>
            <td>${book.roll}</td>
            <td>${book.dob}</td>
            <td>${book.contact}</td>
            <td><a href="#" class="delete">X<a></td>
        `;
            list.appendChild(row);

        }

        showAlert(message,className){
            // create div
            const div=document.createElement('div');
            // add Classes
            div.className=`alert ${className}`;
            // add text
            div.appendChild(document.createTextNode(message));
            // get parent
            const container=document.querySelector('#container');
            const form=document.querySelector('#student-form');
            //insert alert 
            container.insertBefore(div , form);


            // time out after 3 secounds
            setTimeout(function(){
            document.querySelector('.alert').remove();
            },3000);
            }



        deleteBook(target){
            if(target.className==='delete'){
            target.parentElement.parentElement.remove();
         }
        }

        clearFields(){
            document.getElementById('name').value='';
            document.getElementById('branch').value='';
            document.getElementById('roll').value='';
            document.getElementById('dob').value='';
            document.getElementById('contact').value='';


        }
}

// Local Storage Class
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach(function(book){
        const ui  = new UI;
  
        // Add book to UI
        ui.addBookToList(book);
      });
    }
  
    static addBook(book) {
      const books = Store.getBooks();
  
      books.push(book);
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
   static removeBook(contact){
     
       const books = Store.getBooks();

       books.forEach(function(book,index){
         if(book.contact === contact){
             books.splice(index, 1);

         }
       });
       localStorage.setItem('books', JSON.stringify(books));
    
    }

  }
  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('student-form').addEventListener('submit', function(e){
    // Get form values
    const name = document.getElementById('name').value,
          branch = document.getElementById('branch').value,
          roll = document.getElementById('roll').value,
          dob = document.getElementById('dob').value,
          contact = document.getElementById('contact').value;
      
    // instantiate book
    const book = new Book(name, branch, roll,dob,contact);
  // instantiate ui object
  const ui=new UI();
  // validate
            if(name===''|| branch ===''||roll===''|| dob===''||contact==='' ){
              // error alert
              ui.showAlert('Please fill all Fields','error');
            }else{
              // add book to list
            ui.addBookToList(book);

            // Add to LS
             Store.addBook(book);
  
            // show success alert
            ui.showAlert('Successfully Added!','success');
  
              // clear Fields
            ui.clearFields();
             
            }
  
              e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('data-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
     
  
    // Delete book
    ui.deleteBook(e.target);
    
    // remove fromlocal storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Data Removed!', 'success');
  
    e.preventDefault();
  });