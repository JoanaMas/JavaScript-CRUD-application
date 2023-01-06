class BooksFormComponent {
  htmlElement;
  onSubmit;
  authorInput;
  titleInput;
  yearInput;
  completedInput;
  formNameElement;
  submitButton;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement('form'); // nustatoma, kad this.html element bus forma
    this.htmlElement.className = 'shadow p-3';
    this.htmlElement.innerHTML = `
        <h3 class="text-center">Add Book</h3>
        <hr>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Author</label>
          <input type="text" class="form-control" id="author" name="author">
        </div>
        <div class="mb-3">
          <label for="year" class="form-label">Year</label>
          <input type="number" class="form-control" id="year" name="year" min="1000">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="completed" name="completed">
          <label class="form-check-label" for="completed">Book is finished</label>
        </div>
        <hr>
        <button type="submit" class="btn btn-success w-100">Add Book</button>   
        `
    this.onSubmit = onSubmit;

    // Paselektintos formos inputų values
    this.authorInput = this.htmlElement.querySelector('[name=author]');
    this.titleInput = this.htmlElement.querySelector('[name=title]');
    this.yearInput = this.htmlElement.querySelector('[name=year]');
    this.completedInput = this.htmlElement.querySelector('[name=completed]');

    this.formNameElement = this.htmlElement.querySelector('h3');
    this.submitButton = this.htmlElement.querySelector('button');



    this.htmlElement.addEventListener('submit', this.handleSubmit);
  }

  // Būtinai turime užrašyti funkciją lambda išraiška, tuomet kai ji perduodama su this klasės viduje.
  handleSubmit = (event) => {
    event.preventDefault();
    // Būtina rašyti submtinant formą, kad puslapis automatiškai nepersikrautu paspaudus submit.

    const formData = new FormData(event.target);
    const values = {
      title: formData.get('title'),
      author: formData.get('author'),
      year: formData.get('year'),
      completed: Boolean(formData.get('completed'))
    }

    // inversion of control - nesirūpiname, kas vyksta su parsiųstais duomenimis.
    this.onSubmit(values);
    // console.log(values)
  }

  disableEditing = () => {
    this.htmlElement.reset();
    this.formNameElement.innerText = 'Create Book';
    this.submitButton.className = 'btn btn-success w-100';
  }

  enableEditing = ({ author, title, year, completed }) => {
    this.authorInput.value = author;
    this.titleInput.value = title;
    this.yearInput.value = year;
    this.completedInput.checked = completed;
    this.formNameElement.innerText = 'Update Book';
    this.submitButton.innerText = 'Update Book';
    this.submitButton.className = 'btn btn-warning w-100';
  }

}


export default BooksFormComponent
