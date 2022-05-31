import React from 'react'
import { Link } from 'react-router-dom'

const RecipeTile = ({ recipe }) => {

  return (
    <div>
      <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
    </div>
  )
}

export default RecipeTile
