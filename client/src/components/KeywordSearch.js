import React, { useState } from "react";
import { Button, TextField } from '@mui/material'

const KeywordSearch = ({ recipes, setRecipes, getRecipes }) => {
  const [keyword, setKeyword] = useState({
    keyword: ''
  })
  const [searchResults, setSearchResults] = useState(false)
  const [returnedKeyword, setReturnedKeyword] = useState(undefined)

  const handleInputChange = (event) => {
    setKeyword({
      ...keyword,
      [event.currentTarget.name]: event.currentTarget.value
    }
    )
  }

  const searchRecipes = async (keyword) => {
    try {
      const response = await fetch(`/api/v1/recipes/search?keyword=${keyword.keyword}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      const { recipes, returnedKeyword } = body
      setRecipes(recipes)
      setSearchResults(true)
      setReturnedKeyword(returnedKeyword)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await searchRecipes(keyword)
  }

  const handleReset = async (event) => {
    event.preventDefault()
    await getRecipes()
    setSearchResults(false)
    setReturnedKeyword(undefined)
    setKeyword({keyword: ''})
  }

  return (
    <div className="container">
      <div className="search">
        <form className="search-form" id='keywordSearch' onSubmit={handleSubmit}>
          <label className="search-bar">
            <TextField 
              id='keyword'
              name='keyword'
              variant='outlined' 
              label='Search saved recipes' 
              size='small'
              onChange={handleInputChange}
              value={keyword.keyword}
            />
          </label>
          <Button type='submit' size='small' variant='contained'>Search</Button>
        </form>
        <div>
          {searchResults && 
            <>
              <p>
                Showing {recipes.length} recipes
                for '{returnedKeyword}'
              </p>
              <form onSubmit={handleReset}>
                <Button type='submit' size='small' variant="contained">Reset</Button>
              </form>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default KeywordSearch
