import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    directions: [],
    notes: ''
  })

  const recipeId = props.match.params.id

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
  
  let ingredientsList = recipe.ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ))
  let directionsList = recipe.directions.map((direction) => (
    <li key={direction}>{direction}</li>
  ))

  return (
    <>
      <div>
        <p>
          <Link to={`/recipes`}>back to recipes</Link>
        </p>
      </div>
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
        <ol>
          {directionsList}  
        </ol> 
      </div>
    </>
  )
}



export default withRouter(RecipeShow)
