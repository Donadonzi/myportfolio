import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

/* --- GLOBAL STATE OF THE APP ---
*- Search object
*- Current recipe object
*- Shopping list object
*- Liked recipes
*/
const state = {};



// ------ SEARCH CONTROLLER ------
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipe
            await state.search.getResults();

            // 5. Render results on the UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert(error);
            clearLoader();
        }
    }   
}
// search.getResults();
// console.log(search.result);   WHY DOESN'T THIS WORK? Cuz getResults is an async function. By the time you say this, the result is still undefined!
// async function kooft() {
//     await search.getResults();
//     console.log(search.result);
// }
// kooft();
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.serachResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


// ------ RECIPE CONTROLLER ------

const controlRecipe = async () => {

    // Get id from the url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for the recipe
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight the selected recipe
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
            state.recipe = new Recipe(id);

        try {
        // Get recipe data and parse the ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // Render the recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
            );

        } catch(error) {
            alert(error);
            console.log(error);
        } 
    }
};

// ------ SHOPPING LIST CONTROLLER ------

const controlList = () => {
    // Create a new list IF there is none
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and render on UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

// ------ SHOPPING LIST DELETE AND UPDATE EVENT HANDLER ------
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);

    // Updating Count    
    } else if (e.target.matches('.shopping__count-value')) {
            if (parseFloat(e.target.value) >= 0) {
                const val = parseFloat(e.target.value);
                state.list.updateCount(id, val);
            }
            //  else if (parseFloat(e.target.value) === 0) {
            //     state.list.deleteItem(id);
            //     listView.deleteItem(id);
            // }   
    }
});

// ------ LIKES CONTROLLER ------

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has not liked it
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle like button
        likesView.toggleLikeBtn(true);

        // Add to the UI list
            likesView.renderLike(newLike);

    // User has liked it
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);
        // Toggle like button
        likesView.toggleLikeBtn(false);
        // Remove from the UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());

};

// ------ RESTORE LIKES ON PAGE LOADING ------
window.addEventListener('load', () => {
    
    state.likes = new Likes();

    // Restore the likes
    state.likes.readStorage();

    // Toggle the like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

});


// ------ RECIPE EVENT HANDLERS ------

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
// That is the way Jonas wrote it for writing one line instead of two line. But I find it not necassary at least
// in case of only two EventSource. Maybe if there were more I would do.

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
       
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }

});



