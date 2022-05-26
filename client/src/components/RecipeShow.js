import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    directions: [],
    notes: ''
  })

  const recipeId = props.match.params.id
  //not sure if i need user here
  // const user = props.user

  const getRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${recipeId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setRecipe(body.recipe)
    } catch (error) {
      console.error(`Error in fetch ${error.message}`)
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])
  
  let ingredientsList = recipe.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ))
  let directionsList = recipe.directions.map((direction) => (
    <li key={direction}>{direction}</li>
  ))

  // debugger

  return (
    <>
      <div>
        <h1>
          {recipe.name}
        </h1>
      </div>
      <div>
        <ul>
          {ingredientsList}
        </ul>
      </div>
      <div>
        <ul>
          {directionsList}  
        </ul> 
      </div>
    </>
  )
}



export default withRouter(RecipeShow)
