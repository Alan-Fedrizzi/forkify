import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// este arquivo seria resultsView.js
// este arquivo seria resultsView.js
// este arquivo seria resultsView.js

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  // Quando procuramos algo que não existe, ainda temos success, só que o recipes array está empity. Vamos mostrar uma msg que não houve resultados para a pesquisa.
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    // this._data é um array, vamos fazer um loop nele
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  // _generateMarkup() {
  //   // console.log(this._data);
  //   // this._data é um array, vamos fazer um loop nele
  //   return this._data.map(this._generateMarkupPreview).join('');
  // }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);
  //   // vamos verificar se o id da url é o mesmo do link, se for, coloca a classe --active
  //   return `
  //     <li class="preview">
  //       <a class="preview__link ${
  //         result.id === id ? 'preview__link--active' : ''
  //       }" href="#${result.id}">
  //         <figure class="preview__fig">
  //           <img src="${result.image}" alt="${result.title}" />
  //         </figure>
  //         <div class="preview__data">
  //           <h4 class="preview__title">${result.title}</h4>
  //           <p class="preview__publisher">${result.publisher}</p>
  //         </div>
  //       </a>
  //     </li>
  //     `;
  // }
}

export default new ResultsView();
