import React, { useState, useEffect } from 'react'
import RecipeHomeTile from './RecipeHomeTile'

const Home = () => {
  const [recipes, setRecipes] = useState([])

  const getRecipes = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/home`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setRecipes(body.recipes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <div className='index-container'>
      <div className='text-container'>
        <h2 className='header-text'>Recipease</h2>
        <p>
          Welcome to your digital cookbook.
        </p>
        <p>
          Scrape and save recipes from all over the internet.
        </p>
        <p>
          A list of websites the app can scrape from can be found  <a href='https://github.com/hhursev/recipe-scrapers#scrapers-available-for' target='_blank'>here</a>.
        </p>
      </div>
      <div>
        <ul className='home-list'>
          {recipes.map((recipeObject) => {
            return <RecipeHomeTile
              key={recipeObject.id}
              recipe={recipeObject}
            />
          })}
        </ul>
      </div>

    </div>
  )
}

export default Home
