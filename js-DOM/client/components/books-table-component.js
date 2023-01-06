

class BooksTableComponent {
  htmlElement;
  tbody;
  onDelete;
  onEdit;
  editedRowId;

  constructor({ books, onDelete, onEdit }) {
    this.htmlElement = document.createElement('table');
    this.htmlElement.className = 'table table-striped';
    this.htmlElement.innerHTML = `     
    <thead class="bg-primary text-white">
    <tr>
    <th scope="col">#</th>
    <th scope="col">Author</th>
    <th scope="col">Title</th>
    <th scope="col">Year</th>
    <th scope="col">Completed</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody></tbody>
    `
    this.tbody = this.htmlElement.querySelector('tbody');
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.editedRowId = null; // pradinė reikšmė

    this.renderBooks(books, null);
  }

  createRowHtmlElement = (book) => {
    const { id, author, title, year, completed } = book;
    // Kuriamas kintamasis, nes stringe negalime ieškoti button, and kurio mums reikia uždėti eventListener().
    const tr = document.createElement('tr');
    const thisRowIsEdited = id === this.editedRowId;
    if (thisRowIsEdited) {
      tr.classList.add('bg-dark', 'text-white')
    }


    tr.innerHTML = `
          <td>${id}</td>
          <td>${author}</td>
          <td>${title}</td>
          <td>${year}</td>
          <td>${completed}</td>
          <td>
          <div class="d-flex justify-content-end">
          <button class="btn btn-warning mr-3 js-btn-update">${thisRowIsEdited ? 'Cancel' : '✐'}</button>
          <button class="btn btn-secondary js-btn-delete">✕</button>
          </div>
          </td>`;

    // Reguojama į vartotojo veiksmą
    const deleteButton = tr.querySelector('.js-btn-delete');
    deleteButton.addEventListener('click', () => {
      // Inversion of control 
      return this.onDelete(id)
    });

    const updateButton = tr.querySelector('.js-btn-update');
    updateButton.addEventListener('click', () => {
      return this.onEdit(book)
    })

    return tr;
  }


  renderBooks(books, editedRowId) {
    this.editedRowId = editedRowId;
    const rowsHtmlElements = books.map(this.createRowHtmlElement);

    this.tbody.innerHTML = null;
    this.tbody.append(...rowsHtmlElements)
  }

}


export default BooksTableComponent