const router = require('express').Router();
const recipes = require('../../../data/recipes.json');

// Reads the recipes.json file and stores the data in 'recipes'

router.get('/', (request, response) => {
    //Array.map
    //const petNames = pets.map(pet => {return pet.name})
    //const petNames = pets.map(({name}) => name)
    const recipesResult = recipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,       
        difficulty: recipe.difficulty
    }));

    if (recipesResult) response.send(recipesResult)
     else response.send({ error: { message: `Could not find recipies` }})   
}); 

router.post('/recipe/add', (request, response) => {
    const addedRecipe = request.body;

    // for (let i = 0; i < pets.length; i++) {
    // if (pets[i].type === 'cat') {
    //     cats.push(pets[i])
    // }
    // }
    //console.log(pets[i].name)
    

    let  maxId = 0;
    for (let i = 0; i < recipes.length; i++)
    {
        if (recipes[i].id > maxId)
        {
            maxId = recipes[i].id;
        }
    }    
    //const id = Math.floor(Math.random() * 100000) + 1;
  
    addedRecipe.id = maxId + 1;
    recipes.push(addedRecipe);
    response.send(addedRecipe);
   
});

router.get('/recipe/:id', (request, response) => {
  const { id } = request.params
  const recipe = recipies.find(r => r.id === id)


  if (recipe) response.send(recipe)
    else response.send({ error: { message: `Could not find recipie with id: ${id}` }})
});

module.exports = router;