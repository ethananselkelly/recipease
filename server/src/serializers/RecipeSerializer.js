class RecipeSerializer {
  static getSummary(recipe) {
    const allowedAttributes = [
      'id', 
      'name', 
      'source',
      'url', 
      'ingredients', 
      'instructions', 
      'notes', 
      'tags', 
      'image'
    ]

    let serializedRecipe = {}
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }

    return serializedRecipe
  }
}

export default RecipeSerializer
