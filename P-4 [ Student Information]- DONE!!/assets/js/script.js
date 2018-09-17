// Book Constructor
function Book(name, branch, roll,dob,contact) {
  this.name = name;
  this.branch = branch;
  this.roll = roll;
  this.dob=dob;
  this.contact=contact;
}

// UI Constructor
function UI() {}


// add book to list
UI.prototype.addBookToList=function(book){
  const list=document.getElementById('book-list');
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

// show alert
UI.prototype.showAlert = function(message,className){
  // create div
  const div=document.createElement('div');
  // add Classes
  div.className=`alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container=document.querySelector('#container');
  const form=document.querySelector('#book-form');
  //insert alert 
  container.insertBefore(div , form);


  // time out after 3 secounds
  setTimeout(function(){
    document.querySelector('.alert').remove();
},5000);

}


// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentaElement.remove();
  }
}

// clear fields

UI.prototype.clearFields=function(){
    document.getElementById('name').value='';
    document.getElementById('branch').value='';
    document.getElementById('roll').value='';
    document.getElementById('dob').value='';
    document.getElementById('contact').value='';

}


// local storage


// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const name = document.getElementById('name').value,
        branch = document.getElementById('branch').value,
        roll = document.getElementById('roll').value,
        dob = document.getElementById('dob').value,
        contact = document.getElementById('contact').value;
    
  // instantiate book
  const book=new Book(name, branch, roll,dob,contact);
// instantiate ui object
const ui=new UI();
// validate
          if(name===''|| branch ===''||roll===''|| dob===''||contact==='' ){
            // error alert
            ui.showAlert('Please fill all Fields','error');
          }else{
            // add book to list
          ui.addBookToList(book);

          // show success alert
          ui.showAlert('Successfully Added!','success');

            // clear Fields
          ui.clearFields();
           
          }

            e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});