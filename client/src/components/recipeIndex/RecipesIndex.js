import React, { useState, useEffect } from 'react'
import RecipeIndexTile from './RecipeIndexTile'
import Scraper from './Scraper'
import KeywordSearch from './KeywordSearch'
import Divider from '@mui/material/Divider'
import Link from "@mui/material/Link"
import Pagination from '@mui/material/Pagination'

const RecipesIndex = (props) => {
  const [recipes, setRecipes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage] = useState(window.innerWidth <= 480 ? 15 : 25 )

  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  const getRecipes = async () => {
    try {
      const response = await fetch(`/api/v1/recipes`)
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
  
  const updateRecipes = async (addedRecipe) => {
    const found = recipes.find(recipe => {
      return recipe.id === addedRecipe.id
    })
    if (!found) {
      await getRecipes()
    }
  }

  recipes.forEach((recipe, index) => {
    recipe.key = index+1
  })

  return (
    <>
    <div className='index-container'>
      <div className='scraper-form'>
        <div className='scraper'>
          <Scraper 
            updateRecipes={updateRecipes}
          />
        </div>
      </div>
      <div className='link-to-form'>
        <Link href='/recipes/form' >Enter a recipe manually</Link>
      </div>
      <Divider />
      <div className='search-container'>
        <KeywordSearch 
          setRecipes={setRecipes}
          getRecipes={getRecipes}
          recipes={recipes}
        />
      </div>
      <Divider />
      <div className='container'>
        <ol className='recipe-list'>
          {recipes[0] 
            ? currentRecipes.map((recipeObject, index) => {
              return <RecipeIndexTile 
                key={recipeObject.key}
                index={index}
                recipe={recipeObject}
              />
            }) 
            : <p>No recipes saved</p>
          }
        </ol>
      </div>
      <div className='index-container'>
          <Pagination 
            className='pagination' 
            count={Math.ceil(recipes.length/recipesPerPage)} 
            size='small' 
            onChange={(e, v) => {setCurrentPage(v)}} 
          />
      </div>
    </div>
    </>
  )
}

export default RecipesIndex
