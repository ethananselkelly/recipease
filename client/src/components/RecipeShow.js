import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router'
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
  
  const [shouldRedirect, setShouldRedirect] = useState(false)

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
  
  const removeRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes`,
      {
        method: 'DELETE',
        headers: new Headers({
          'Content-type': 'application/json',
        }),
        body: JSON.stringify(recipe)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if(window.confirm('Remove this recipe?')) {
      await removeRecipe()
      setShouldRedirect(true)
    }

  }

  if (shouldRedirect) {
    return <Redirect to={`/recipes`} />
  }

  return (
    <>
      <div className='container'>
        <p>
          <Link to={`/recipes`}>Back to recipes</Link>
        </p>
        <button onClick={handleRemove}>Remove recipe</button>
      </div>
      <div>
        <div className='container'>
          <img src={recipe.image} />
        </div>
        <div className='container'>
          <h1>
            {recipe.name}
          </h1> 
        </div>
        <hr className='dashed'/>
        <div className='lists container'>
          <ul className='list'>
            {ingredientsList}
          </ul>
          <ol className='list'>
            {instructionsList}  
          </ol> 
        </div>
        <hr className='dashed'/>
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
