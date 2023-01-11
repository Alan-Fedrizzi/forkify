import { async } from 'regenerator-runtime';
// import { API_URL } from './config.js';
// import { API_URL, getJSON, RES_PER_PAGE, sendJSON, KEY } from './helpers.js';
import { API_URL, AJAX, RES_PER_PAGE, KEY } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // key: recipe.key - não podemos fazer assim, nem todas terão key
    // se recipe.key não existe, não faz nada, pq é um falsy value
    //  se existe, pegamos o objeto e spread
    // vai ser key: recipe.key
    ...(recipe.key && { key: recipe.key }),
  };
};

// essa função não retorna nada, só altera o objeto state
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();

    // // se response. ok é false (!res.ok):
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // console.log(res, data);
    // let recipe = data.data.recipe é igual a
    // const { recipe } = data.data;
    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
    // console.log(state.recipe);
    state.recipe = createRecipeObject(data);

    // some method returns true or false
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // alert(err);
    // Temporary error handling
    console.error(`${err} 😱`);
    throw err;
  }
};

// 296. Implementing Search Results - Part 1
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(data);
    // data é um objeto, que tem um apropriedade data, com um array com algumas informações das receitas, não são as receitas completas ainda.

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });

    // console.log(state.search.results);
    // quando fazemos uma nova busca, tem que voltar para a primeira página.
    state.search.page = 1;
  } catch (err) {
    // thorw the error, to be handled in the controller
    console.error(`${err} 😱`);
    throw err;
  }
};

// loadSearchResults('pizza');

// 298. Implementing Pagination - Part 1
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 10, mas extrai até o 9

  // slice não inclui a última posição, então se 0 a 10, mostra de 0 a 9, ou seja, 10 resutaldos
  return state.search.results.slice(start, end);
};

// 301. Updating Recipe Servings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServings / oldServings
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};

// 305. Storing Bookmarks With localStorage
const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// 303. Implementing Bookmarks - Part 1
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  // splice para deletar:
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // JSON.parse converte a string em um objeto
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// console.log(state.bookmarks);

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

// 308. Uploading a New Recipe - Part 2
export const uploadRecipe = async function (newRecipe) {
  try {
    // vamos pegas os dados e formatar para deixar igual aos dados que vem da API
    // Object.entries converte em array (é o oposto de Object.fromEntries)
    // console.log(Object.entries(newRecipe));
    // o primeiro elemento da entry deve começar com 'ingredient'
    // o segundo elemento deve existir, não deve ser uma empity string
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const [quantity, unit, description] = ing[1]
        //   .replaceAll(' ', '')
        //   .split(',');
        // const ingrArr = ing[1].replaceAll(' ', '').split(',');
        const ingrArr = ing[1].split(',').map(el => el.trim());
        // replaceAll retira o espaço de tomato sauce por exemplo
        // testar se o array tem length of 3
        if (ingrArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format ;)'
          );
        // qd dá o erro sai da função

        const [quantity, unit, description] = ingrArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // só vamos ficar com os ingredients nesse array
    // map, vamos separar pela vírgula
    // replaceAll - vamos substituir todos os espaços por nada (empity string), remover os espaços
    // quantity: quantity ? +quantity : null -> se tem quantity converte em número, se não é null
    // console.log(ingredients);

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);
    state.recipe = createRecipeObject(data);

    // Bookmark
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
