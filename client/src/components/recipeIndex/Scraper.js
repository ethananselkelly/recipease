import React, { useState } from 'react'
import FormError from '../layout/FormError'
import config from '../../config'
import { ThreeDots } from 'react-loader-spinner'
import { TextField, Button } from '@mui/material'

const Scraper = ({ getRecipes, recipes }) => {
  const [recipeURL, setRecipeURL] = useState({
    url: '',
    wildMode: false
  })
  const [errors, setErrors] = useState({})
  const [showLoading, setShowLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const validateInput = (payload) => {
    setErrors({})
    const { url } = payload
    const urlRegex = config.validation.url.regexp.urlRegex
    let newErrors = {}
    if (url.trim() === '' || !url.match(urlRegex)) {
      newErrors = {
        ...newErrors,
        url: 'please enter a valid url'
      }
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const postRecipe = async (recipeURL, wildMode) => {
    try {
      const response = await fetch(`/api/v1/recipes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(recipeURL)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      const newRecipe = body.recipe
      await updateRecipes(newRecipe)
      setRecipeURL({url: '', wildMode: false})
      setShowSuccess(true)
      setTimeout(() => {setShowSuccess(false)}, 1500)
      return newRecipe
    } catch (error) {
      setRecipeURL({
        ...recipeURL,
        wildMode: false
      })
      setErrors({url:`couldn't scrape recipe from URL`})
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = (event) => {
    setRecipeURL({
      ...recipeURL,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(recipeURL)) {
      setShowLoading(true)
      setErrors({})
      await postRecipe(recipeURL)  
      setShowLoading(false)
    }
  }

  const handleCheckboxChange = (event) => {
    setRecipeURL({
      ...recipeURL,
      wildMode: !recipeURL.wildMode
    })
  }

  const updateRecipes = async (addedRecipe) => {
    const found = recipes.find(recipe => {
      return recipe.id === addedRecipe.id
    })
    if (!found) {
      await getRecipes()
    }
  }

  return (

    <div>
      <form id='scraper' onSubmit={handleSubmit}>
        <div className='scraper-container'>
          <label className='scraper-input' >
            <TextField 
              id='url'
              name='url'
              variant='outlined' 
              label='Enter a Recipe URL' 
              size='small'
              onChange={handleInputChange}
              value={recipeURL.url}
              />
          </label>
          <Button  type="submit" size='small' variant="contained">Save</Button>
        </div>
        <div className='scraper-feedback'>
          <ThreeDots 
            height='40'
            width='40'
            radius={2}
            color='#1879ba'
            visible={showLoading}
          />
          {showSuccess && <p>Recipe scraped ✔️</p>}
          <FormError error={errors.url} />
          {errors.url && 
            <div>
              <a href='https://github.com/hhursev/recipe-scrapers#scrapers-available-for' target='_blank'>List of scrapable websites</a>
              <label>
                <input 
                  className='wild-mode-checkbox'
                  type='checkbox' 
                  name='wild mode' 
                  onChange={handleCheckboxChange}
                />
                Wild mode*
              </label>
              {recipeURL.wildMode && 
                <div>
                  <p className='text-hint'>*try wild mode if your url isn't included in the scrapable websites</p>
                  <p className='text-hint'>*may not scrape perfectly</p>
                </div>
              }
            </div>
          }
        </div>
      </form>
    </div>
  )
}

export default Scraper
