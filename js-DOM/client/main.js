import AlertComponent from "./components/alert-component.js";
import BooksFormComponent from "./components/books-form-component.js";
import BooksTableComponent from "./components/books-table-component.js";
import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./components/flex-container-component.js";
import ApiService from "./services/api-service.js";

const rootHtmlElement = document.querySelector('#root');


// Importuojami componentai automatiškai.
// Nepamiršti patikrinti  atsiradusio importo viršuje, nes jis importuojamas be.js, kurį reikia pridėti rankiniu būdu.
let booksTableComponent;
let booksFormComponent;
let books; // books kintamasis išorėje, tam, kad būtų pasiekiamas visose funkcijose, kuriose mašinų parsiuntimas iš serverio nevykasta iš naujo.
let editedRowId = null;
const containerComponent = new ContainerComponent();
const alertComponent = new AlertComponent();

// Alertas įdedamas į containerio componentą
containerComponent.addComponents(alertComponent);

// Pridedami komponentai į HTML esantį elementą su klase root
rootHtmlElement.append(containerComponent.htmlElement);


// Sukuriama funkcija kuri ištrins duomenis, ir tada per naujo juos parsiųs.
const handleBookDelete = async (id) => {
        try {
                await ApiService.deleteBook(id); // ištrinama knyga pagal ID.
                books = await ApiService.getBooks(); // parsiunčiamos knygos iš naujo.
                booksTableComponent.renderBooks(books) // knygos atvaizduojamos vėl lentelėje perduodant funkcijai books, kurios buvo parsiųstos.
        } catch (error) {
                alertComponent.show(error.message);
        }
}

// Sukuriama funkcija kuri sukuria duomenis
const handleBookCreate = async (bookProps) => {
        try {
                await ApiService.createBook(bookProps); // sukuriama knygą serveryje pagal bookProps.
                books = await ApiService.getBooks(); // parsiunčiamos visos knygos iš naujo jau su pridėta nauja vartotojo įvesta knyga.
                booksTableComponent.renderBooks(books, editedRowId); // knygos atvaizduojamos lentelėje su jau pridėta vartotojo knyga.
        } catch (error) {
                alertComponent.show(error.message);
        }
}


const handleBookUpdate = async (bookProps) => {
        try {
                await ApiService.updateBook(editedRowId, bookProps);
                books = await ApiService.getBooks();
                booksFormComponent.disableEditing();
                editedRowId = null;
                booksTableComponent.renderBooks(books, editedRowId);

        } catch (error) {
                alertComponent.show(error.message);
        }
}

const handleBookEdit = (bookProps) => {
        if (editedRowId === bookProps.id) {
                editedRowId = null;
        } else {
                editedRowId = bookProps.id;
        }
        booksTableComponent.renderBooks(books, editedRowId);
        if (editedRowId === null) {
                booksFormComponent.disableEditing();
                booksFormComponent.onSubmit = handleBookCreate;
        } else {
                booksFormComponent.enableEditing(bookProps);
                booksFormComponent.onSubmit = handleBookUpdate;
        }
}

// Pagrindinė books iš serverio parsiuntimo funkciją, į kurią apjungiami kiti veiksmai:
// Anoniminė funkcija gali turėti funkcijos pavadinimą, tačiau anoniminė lambda funkcijos išraiška negali turėti pavadinimo. 

(async function initialize () {
        try {
                books = await ApiService.getBooks(); // parsiunčiamos  

                booksTableComponent = new BooksTableComponent({
                        books,
                        onDelete: handleBookDelete,
                        onEdit: handleBookEdit,
                }); // antru parametru perduodama funkcija (dependency injection), kuri apdoroja duomenų ištrinimą ir jų gražinimą.

                booksFormComponent = new BooksFormComponent({
                        onSubmit: handleBookCreate,
                });

                const flexContainerComponent = new FlexContainerComponent();
                flexContainerComponent.addComponents(booksTableComponent, booksFormComponent)


                booksTableComponent.renderBooks(books, editedRowId);
                containerComponent.addComponents(flexContainerComponent); // lentelė gaunama tik tuomet, jei duomenys yra parsiųsti.

        } catch (error) {
                alertComponent.show(error.message);
        }
})()








// UŽDUOTYS

// Create - 3
// Read - 1
// Update - 4
// Delete - 2