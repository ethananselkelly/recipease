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

  const recipeListItems = recipes.map((recipeObject) => {
    return <RecipeHomeTile 
      key={recipeObject.id}
      recipe={recipeObject}
    />
  })

  return (
    <div className='index-container'>
      <div className='text-container'>
        <h2 className='header-text'>Recipease</h2>
        <p>A web app for scraping and saving recipes. I made this app because I wanted a single place where I could find all of the recipes I've saved online in Youtube playlists, Chrome bookmarks, DMs, etc.</p>
        <p>A list of websites the app can scrape from can be found  <a href='https://github.com/hhursev/recipe-scrapers#scrapers-available-for' target='_blank'>here</a></p>
        <p>If you have questions, comments, or suggestions, you can reach me on LinkedIn or by email.</p>
        <p>Thank you for visiting and happy cooking</p>
      </div>
      <div>
        <ul className='home-list'>
          {recipeListItems}
        </ul>
      </div>

    </div>
  )
}

export default Home
