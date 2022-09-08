import React from 'react'
import { Link } from 'react-router-dom'

const RecipeIndexTile = ({ recipe }) => {

  return (
    <div className='recipe-index-tile'>
      <li>
        <div className='recipe-info'>
          <Link className='recipe-link' to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          <p className='source'>{recipe.source}</p>
        </div>
      </li>
    </div>
  )
}

export default RecipeIndexTile
