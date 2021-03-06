import React, { useState, useEffect } from 'react'
import RecipeTile from './RecipeTile'

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
  
  let recipeListItems
  if (recipes[0]) {
    recipeListItems = recipes.map((recipeObject) => {
      return <RecipeTile 
        key={recipeObject.id}
        recipe={recipeObject}
      />
    })
  } else {
    recipeListItems = <p>no recipes saved</p>
  }
  
  return (
    <div>
      {recipeListItems}
    </div>
  )
}

export default RecipesIndex
