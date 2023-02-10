import React from 'react'
import { Link } from 'react-router-dom'

const RecipeIndexTile = ({ recipe }) => {

  return (
    <div className={recipe.key % 2 === 0 ? 'recipe-index-tile gray' : 'recipe-index-tile'} >
      <li value={recipe.key}>
        <Link className='recipe-info' to={`/recipes/${recipe.id}`}>
          <div className='recipe-link' >{recipe.name}</div>
          <p className='source' >{recipe.source}</p>
        </Link>
      </li>
    </div>
  )
}

export default RecipeIndexTile
