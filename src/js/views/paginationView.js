import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    // vamos usar event delegation, pois não uqeremos ouvir os dois botões individualmente, vamos colocar o event listener no pai.
    this._parentElement.addEventListener('click', function (e) {
      // para pegar o botão mais perto do click:
      const btn = e.target.closest('.btn--inline');
      // closest procura para cima na árvore do DOM (parent)
      // query selector procura para baixo (children)
      // console.log(btn);

      // se não clicarmos em nenhum dos botões, dá erro, pois não consegue ler o dataset
      if (!btn) return;

      // converter o dataset para number com o +
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    // Math.ceil para arredondar para cima
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    const buttonPrev = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;

    const buttonNext = `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;

    const buttonEmpity = `
      <div class="btn-empity">&nbsp;</div>
    `;

    const pageNumber = `
      <span class="pagination__number">
        ${curPage} of ${numPages}
      </span>
    `;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return buttonEmpity + pageNumber + buttonNext;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return buttonPrev + pageNumber + buttonEmpity;
    }

    // Other page
    if (curPage < numPages) {
      return buttonPrev + pageNumber + buttonNext;
    }

    // Page 1, and there are NO other pages
    return buttonEmpity + pageNumber + buttonEmpity;
  }
}

export default new PaginationView();
