import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveButton from './SaveButton'
import EditIcon from '@mui/icons-material/Edit';

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
  console.log(props)
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
  
  return (
    <div className='index-container'>
      <div className='nav-container'>
          <Link className='show-link' to={`/recipes`}>
            <ArrowBackIcon variant='contained' />
          </Link>
          <Link className='show-link' to={`/recipes/${recipeId}/edit`}>
            <EditIcon variant='contained' />
          </Link>
      </div>
      <Divider />
      <div>
        <div className='container'>
          <h3 className='recipe-name'>
            {recipe.name}
          </h3> 
        </div>
        <div className='image-container'>
          {recipe.image &&
            <img className='recipe-image' src={recipe.image} />
          }
        </div>
        <Divider/>
        <div className='lists container'>
          <ul className='ingredient list'>
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <li className='ingredient' key={index}>{ingredient}</li>
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
        <Divider />
        <div className='nav-container'>
          {recipe.url &&
            <a className='show-link' href={recipe.url} target='_blank'>Recipe source</a>
          }
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
