import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({
    name: '',
    source: '',
    url: '',
    ingredients: [],
    instructions: [],
    notes: '',
    tags: [],
    image: ''
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
    <li className='ingredient' key={index}>{ingredient}</li>
  ))
  let instructionsList = recipe.instructions.map((direction, index) => (
    <li className='instruction' key={index}>{direction}</li>
  ))

  return (
    <>
      <div className='container'>
        <p>
          <Link to={`/recipes`}>Back to recipes</Link>
        </p>
      </div>
      {/* <div style={{
      backgroundImage: `url(${recipe.image})`
    }}> */}
      <div>
        <div className='container'>
          <img src={recipe.image} />
        </div>
        <div className='container'>
          <h1>
            {recipe.name}
          </h1> 
        </div>
        <div className='lists container'>
          <ul className='list'>
            {ingredientsList}
          </ul>
          <ol className='list'>
            {instructionsList}  
          </ol> 
        </div>
        <div className='container'>
          <p>
            {recipe.notes}
          </p>
          <a href={recipe.url} target='_blank'>Link to recipe source</a>
        </div>
      </div>
    </>
  )
}



export default withRouter(RecipeShow)
