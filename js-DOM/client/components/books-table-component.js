

class BooksTableComponent {
  htmlElement;
  tbody;
  onDelete;

  constructor(books, onDelete) {
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

    this.renderBooks(books);
  }

  createRowHtmlElement = ({ id, author, title, year, completed }) => {

    // Kuriamas kintamasis, nes stringe negalime ieškoti button, and kurio mums reikia uždėti eventListener().
    const tr = document.createElement('tr');
    tr.innerHTML = `
          <td>${id}</td>
          <td>${author}</td>
          <td>${title}</td>
          <td>${year}</td>
          <td>${completed}</td>
          <td>
          <div class="d-flex justify-content-end">
          <button class="btn btn-secondary js-btn">✕</button>
          </div>
          </td>`;
    
    // Reguojama į vartotojo veiksmą
    const deleteButton = tr.querySelector('.js-btn');
    deleteButton.addEventListener('click', () => {
                // Inversion of control 
      return this.onDelete(id)
    })
    
    return tr;
  }


  renderBooks(books) {
    const rowsHtmlElements = books.map(this.createRowHtmlElement);

    this.tbody.innerHTML = null;
    this.tbody.append(...rowsHtmlElements)
  }

}


export default BooksTableComponent