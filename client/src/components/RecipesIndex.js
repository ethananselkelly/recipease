import React, { useState, useEffect } from 'react'
import RecipeTile from './RecipeTile'
import Scraper from './Scraper'
import KeywordSearch from './KeywordSearch'

const RecipesIndex = (props) => {
  const [recipes, setRecipes] = useState([])
  
  const getRecipes = async () => {
    try {
      const response = await fetch(`/api/v1/recipes`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setRecipes(body.recipes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getRecipes()
  }, [])
  
  const updateRecipes = async (addedRecipe) => {
    const found = recipes.find(recipe => {
      return recipe.id === addedRecipe.id
    })
    if (!found) {
      await getRecipes()
    }
  }

  let recipeListItems
  if (recipes[0]) {
    recipeListItems = recipes.map((recipeObject) => {
      return <RecipeTile 
        key={recipeObject.id}
        recipe={recipeObject}
      />
    })
  } else {
    recipeListItems = <p>No recipes saved</p>
  }
  
  return (
    <>
    <div className='index-container'>
      <div className='scraper form'>
        <div className='scraper'>
          <Scraper 
            updateRecipes={updateRecipes}
          />
        </div>
      </div>
      <hr className='dashed'/>
      <div className='search'>
        <p className='index header'>Search saved recipes</p>
        <KeywordSearch 
          setRecipes={setRecipes}
          getRecipes={getRecipes}
          recipes={recipes}
        />
      </div>
      <hr className='dashed'/>
      <div className='container'>
        <ol>
          {recipeListItems}
        </ol>
      </div>
    </div>
    </>
  )
}

export default RecipesIndex
