import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PreviewView extends View {
  _parentElement = '';

  _body = document.querySelector('body');
  _buttonResultsMobile = document.querySelector('.button-results-mobile');
  _searchResults = document.querySelector('.search-results');

  constructor() {
    super();
    this._addHandlerShowResults();
  }

  toggleSearchResults() {
    this._body.classList.toggle('open-modal');
    this._buttonResultsMobile.classList.toggle('button-results-mobile--open');
    this._searchResults.classList.toggle(
      'search-results--open-search-results-mobile'
    );
    this._searchResults.style.setProperty(
      '--top-of-page',
      `${window.pageYOffset}px`
    );
    console.log(window.pageYOffset);
  }

  _addHandlerShowResults() {
    this._buttonResultsMobile.addEventListener(
      'click',
      this.toggleSearchResults.bind(this)
    );
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>          
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }"> 
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>  
            </div>
          </div>
        </a>
      </li>
      `;
  }
}

export default new PreviewView();
