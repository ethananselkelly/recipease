import React from 'react'
import { Link } from 'react-router-dom'

const RecipeIndexTile = ({ recipe }) => {

  return (
    <div className='recipe-index-tile'>
      <li>
        <div className='recipe-info'>
          <Link className='recipe-link' to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          <a className='source' href={recipe.url} target='_blank'>{recipe.source}</a>
        </div>
      </li>
    </div>
  )
}

export default RecipeIndexTile
