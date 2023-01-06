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
                const books = await ApiService.getBooks(); // parsiunčiamos knygos iš naujo.
                booksTableComponent.renderBooks(books) // knygos atvaizduojamos vėl lentelėje perduodant funkcijai books, kurios buvo parsiųstos.
        } catch (error) {
                alertComponent.show(error.message);
        }
}

// Sukuriama funkcija kuri sukuria duomenis
const handleBookCreate = async (bookProps) => {
        try {
                await ApiService.createBook(bookProps); // sukuriama knygą serveryje pagal bookProps.
                const books = await ApiService.getBooks(); // parsiunčiamos visos knygos iš naujo jau su pridėta nauja vartotojo įvesta knyga.
                booksTableComponent.renderBooks(books); // knygos atvaizduojamos lentelėje su jau pridėta vartotojo knyga.

        } catch (error) {
                alertComponent.show(error.message);
        }
}

// Pagrindinė books iš serverio parsiuntimo funkciją, į kurią apjungiami kiti veiksmai:

(async () => {
        try {
                const books = await ApiService.getBooks(); // parsiunčiamos                                             
                booksTableComponent = new BooksTableComponent(books, handleBookDelete); // antru parametru perduodama funkcija (dependency injection), kuri apdoroja duomenų ištrinimą ir jų gražinimą.
                booksFormComponent = new BooksFormComponent(handleBookCreate);

                const flexContainerComponent = new FlexContainerComponent();
                flexContainerComponent.addComponents(booksTableComponent, booksFormComponent)


                booksTableComponent.renderBooks(books);
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