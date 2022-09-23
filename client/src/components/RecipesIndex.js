import React, { useState, useEffect } from 'react'
import RecipeIndexTile from './RecipeIndexTile'
import Scraper from './Scraper'
import KeywordSearch from './KeywordSearch'
import Divider from '@mui/material/Divider'

const RecipesIndex = () => {
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
  
  return (
    <>
    <div className='index-container'>
      <div className='scraper-form'>
        <div className='scraper'>
          <Scraper 
            updateRecipes={updateRecipes}
          />
        </div>
      </div>
      <Divider />
      <div className='search'>
        <KeywordSearch 
          setRecipes={setRecipes}
          getRecipes={getRecipes}
          recipes={recipes}
        />
      </div>
      <Divider />
      <div className='container'>
        <ol>
          {recipes[0] ?
            recipes.map((recipeObject) => {
              return <RecipeIndexTile 
                key={recipeObject.id}
                recipe={recipeObject}
              />
            }) : <p>No recipes saved</p>
          }
        </ol>
      </div>
    </div>
    </>
  )
}

export default RecipesIndex
