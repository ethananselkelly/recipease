import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'
import PDFButton from './PDFButton'
import Divider from '@mui/material/Divider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
            <div className='icon' title='Save/remove recipe'>
              <SaveButton 
                isUserRecipe={isUserRecipe} 
                setIsUserRecipe={setIsUserRecipe}
                recipe={recipe}
                user={props.user}
              />
            </div>
            <div className='icon' title='Download as PDF'>
              <PDFButton
                recipe={recipe}
              />
            </div>
            {isUserRecipe &&
              <div className='icon' title='Edit recipe' >
                <Link to={`/recipes/${recipeId}/edit`}>
                  <EditIcon variant='contained' />
                </Link>
              </div>
            }
            {recipe.url &&
              <a className='icon' title='Recipe source' href={recipe.url} target='_blank'>
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
      </div>
    </div>
  )
}



export default withRouter(RecipeShow)
