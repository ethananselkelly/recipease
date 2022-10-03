import React from 'react'
import { Link } from 'react-router-dom'

const RecipeHomeTile = ({ recipe }) => {

  return (
    <div className='recipe-home-tile'>
      <li>
        <Link to={`/recipes/${recipe.id}`} target='_blank'>
          <img className='recipe-tile-image' title={recipe.name} src={recipe.image} loading='lazy' />
        </Link>
      </li>
    </div>
  )
}

export default RecipeHomeTile