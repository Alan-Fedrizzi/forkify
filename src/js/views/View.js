import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  // usaremos como parent class para outras view (childs)
  // por isso export default
  _data;

  /**
   * Render the received onject to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is return if render=false
   * @this {Object} View instance
   * @author Jonas Schedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    // vamos checar se data exists, se é array e se está vazio
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // vamos checar se data exists, se é array e se está vazio
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    // removemos para não aparecer msg de erro qd recarrega a página

    this._data = data;
    const newMarkup = this._generateMarkup();

    // vamos converter a string do markup para o DOM, para conseguir comparar com o existente na página
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // * seleciona todos os elementos do DOM
    // Array.from converte uma node list para array
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    // console.log(newElements);

    // comparar os arrays:
    // isEqualNode compara os conteúdos dos elementos
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // se são diferentes, vai ser atualizado
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // firstChild might not exist, por isso do ?
        // console.log('😍', newEl.firstChild.nodeValue.trim());
        // qd tem um texto diferente, ele considera que a div pai tb é diferente, e substitui tudo, por isso não vai dar certo dessa forma.
        // temos que checar se o elemento só contém texto, que é o que queremos trocar.
        // se o texto for diferente de uma string vazia
        // The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string.
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTIBUTES
      if (!newEl.isEqualNode(curEl))
        // console.log(newEl.attributes);
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(
          attr => curEl.setAttribute(attr.name, attr.value)
          // estamos colocando os atributos do newEl no curEl
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  // spinner (loader)
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
