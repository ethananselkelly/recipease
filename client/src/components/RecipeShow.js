import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'

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
  
  const [isUserRecipe, setIsUserRecipe] = useState(false)

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
      if (body.userRecipe) {
        setIsUserRecipe(true)
      }
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

  let notes
  if (recipe.notes) {
    notes =
      <>
        <hr className='dashed'/>
        <div className='container'>
          <p>
            {recipe.notes}
          </p>
        </div>
      </>
  }
  
  return (
    <div className='index-container'>
      <div className='nav container'>
        <p>
          <Link className='show-link' to={`/recipes`}>Back to recipes</Link>
        </p>
      </div>
      <hr className='dashed'/>
      <div>
        <div className='container'>
          <img className='recipe-image' src={recipe.image} />
        </div>
        <div className='container'>
          <h4>
            {recipe.name}
          </h4> 
        </div>
        <hr className='dashed'/>
        <div className='lists container'>
          <ul className='ingredient list'>
            {ingredientsList}
          </ul>
          <ol className='instruction list'>
            {instructionsList}  
          </ol> 
        </div>
        {notes}
        <hr className='dashed'/>
        <div className='nav-container'>
          <a className='show-link' href={recipe.url} target='_blank'>Link to recipe source</a>
          <SaveButton 
            isUserRecipe={isUserRecipe} 
            setIsUserRecipe={setIsUserRecipe}
            recipe={recipe}
            user={props.user}
          />
        </div>
      </div>
    </div>
  )
}



export default withRouter(RecipeShow)
