import React, { useState } from "react";

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
    document.getElementById('keyword').value = ''
  }

  const handleReset = async (event) => {
    event.preventDefault()
    await getRecipes()
    setSearchResults(false)
    setReturnedKeyword(undefined)
    document.getElementById('keyword').value = ''
  }

  let showResults

  if (searchResults) {
    showResults = 
    <>
      <p>
      Showing {recipes.length} recipes
       for '{returnedKeyword}'
      </p>
      <form onSubmit={handleReset}>
        <input type='submit' value='Reset' />
      </form>
    </>
  }

  return (
    <div className="container">
      <div className="search">
        <form className="search form" id='keywordSearch' onSubmit={handleSubmit}>
          <label className="search bar">
            <input type='text' name='keyword' id='keyword' onChange={handleInputChange} value={keyword.keyword} />
          </label>
          <input className="submit" type='submit' value='Search' />
        </form>
        <div>
          {showResults}
        </div>
      </div>
    </div>
  )
}

export default KeywordSearch
