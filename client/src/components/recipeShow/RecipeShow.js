import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveButton from './SaveButton'
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add'

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({
    name: '',
    source: '',
    url: '',
    ingredients: '',
    instructions: '',
    notes: '',
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
  
  const postIngredient = async (ingredient) => {
    const ingredientObject = {
      name: ingredient
    }
    try {
      const response = await fetch(`/api/v1/checklist`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(ingredientObject)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])
  
  return (
    <div className='index-container'>
      <div className='nav-container'>
          <Link className='show-link' to={`/recipes`}>
            <ArrowBackIcon className='icon' variant='contained' />
          </Link>
          <div className='recipe-header'>
            <h4 className='recipe-name'>
              {recipe.name}
            </h4> 
          </div>
          <div className='icon-container'>
            <div className='icon'>
              <SaveButton 
                className='icon'
                isUserRecipe={isUserRecipe} 
                setIsUserRecipe={setIsUserRecipe}
                recipe={recipe}
                user={props.user}
              />
            </div>
            {isUserRecipe &&
              <Link className='icon' to={`/recipes/${recipeId}/edit`}>
                <EditIcon variant='contained' />
              </Link>
            }
            {recipe.url &&
              <a className='icon' href={recipe.url} target='_blank'>
                <OpenInNewIcon variant='contained' />
              </a>
            }
          </div>
      </div>
      <Divider />
      <div>
        <div className='image-container'>
          {recipe.image &&
            <img className='recipe-image' src={recipe.image} />
          }
        </div>
        <Divider/>
        <div className='list-container'>
          <ul className='ingredient list'>
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <div key={index}>
                <li className='ingredient'>{ingredient}</li>
                <AddIcon
                    className='add-button'
                    onClick={() => {postIngredient(ingredient)}}
                    sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
                />
              </div>
              ))
            }
          </ul>
          <ol className='instruction list'>
            {recipe.instructions.split('\n').map((direction, index) => (
                <li className='instruction' key={index}>{direction}</li>                
              ))
            } 
          </ol> 
        </div>
      </div>
    </div>
  )
}



export default withRouter(RecipeShow)
