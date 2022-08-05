class RecipeSerializer {
  static getSummary(recipe) {
    const allowedAttributes = [
      'id', 
      'name', 
      'ingredients', 
      'instructions', 
      'notes', 
      'url', 
      'image', 
      'tags', 
      'source'
    ]

    let serializedRecipe = {}
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }

    return serializedRecipe
  }
}

export default RecipeSerializer
