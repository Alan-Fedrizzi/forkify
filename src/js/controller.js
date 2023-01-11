import * as model from './model.js';
// vai ser model.state, por exemplo
import { MODAL_CLOSE_SEC } from './helpers.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// import resultsView from './views/resultsView.js';
import resultsView from './views/test.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// import icons from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// console.log(icons);

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

/*
// spinner (loader)
const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
*/

// isso é do parcel:
if (module.hot) {
  module.hot.accept();
}

// 288. Loading a Recipe from API
// const showRecipe = async function () {
const controlRecipes = async function () {
  try {
    // precisamos pegar a id da recipe da hash
    // const id = window.location.hash; // #5ed6604591c37cdc054bc886
    const id = window.location.hash.slice(1); // 5ed6604591c37cdc054bc886

    if (!id) return;

    // renderSpinner(recipeContainer);
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);
    // é uma aync function, vai retornar uma promise, por isso precisamos do await
    // como essa função não retorna nada, não estamos salvando em uma variável.
    // como altera o state, não é uma função pura
    // const recipe = model.state.recipe;
    // const { recipe } = model.state;

    /*
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc8fd'
    );
    // wrong id para dar erro
    // const res = await fetch(
    //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886xxxxxx'
    // );
    const data = await res.json();

    // se response. ok é false (!res.ok):
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);
    // let recipe = data.data.recipe é igual a
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
    */

    // 289. Rendering the Recipe
    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
    // se tivéssemos exportado a classe do recipeView, teríamos que fazer:
    // const recipeView = new recipeView(model.state.recipe);

    // estamos escrevendo os ícones no caminho antigo, antes do parcel criar a pasta dist, vamos mudar...
    /*
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(ing => {
              return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `;
            })
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    recipeContainer.innerHTML = ''; // remove o conteúdo que tem dentro do recipeContainer no html
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
    */

    // for testing, temporary...
    // controlServings();
  } catch (err) {
    // alert(err);
    console.error(err);
    recipeView.renderError();
  }
};

// showRecipe();

// 289. Rendering the Recipe
// 290. Listening For load and hashchange Events
// podemos ouvir o evento da troca da hsh na url
// window.addEventListener('hashchange', showRecipe);

// Se copiamos a url e abrirmos uma nova aba, não carrega a receita. A hash não mudou, temos que ouvir o load event tb.
// window.addEventListener('load', showRecipe);
// para não repetir código, podemos fazer um loop em um array:
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );
// esses event listener são relacionado ao view, devem estar no view
// mas a function controlRecipes está aqui, e não queremos ela no view
// não podemos importar as funções do controller para o view, o view não sabe do controller
// Solução é o Publisher-Subscriber design Pattern
// publisher: addHandlerRender
// subscriber: controlRecipes
// subscribe to publisher by passing in the subscriber function as an argument

// se tentar carregar a página sem nenhuma hash, dá erro.
// não tem nenhuma hash na url para colocar na variável id.

// 296. Implementing Search Results - Part 1
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);
    //  não retorna nada (por isso não salvamoas em uma variável), só manipula o state

    // 3) Render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // console.log(goToPage);
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

// controlSearchResults();
// queremos fazer o search qd clicamos no botão
// vamos usar o publish subscriber method
// vamos ouvir o clique no view.

// 301. Updating Recipe Servings
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  // model.updateServings(8);
  model.updateServings(newServings);

  // Update the recipe view
  // overwrite the complete recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// 307. Uploading a New Recipe - Part 1
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // console.log(newRecipe);

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    // sem reload the page
    // 3 argumentos: state (não importa agora, vamos colocar null), title (tb não importa, vamos colocar empity string, url),
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // obs, para voltar para a página anterior:
    // window.history.back();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('😱', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlersearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // controlServings();
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

// 291. The MVC Architecture
// pdf 241

// 292. Refactoring for MVC
