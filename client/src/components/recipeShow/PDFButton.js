import React from "react";
import { jsPDF } from 'jspdf'
import DownloadIcon from '@mui/icons-material/Download';
import { green } from "@mui/material/colors";

const PDFButton = (recipe) => {
    const doc = new jsPDF()
    const saveRecipeToPDF = (recipe) => {
        let recipeToPDF = new Array(
            recipe.recipe.name, 
            '',
            'Ingredients',
        )
        const ingredients = recipe.recipe.ingredients.split('\n')
        ingredients.forEach(ingredient => recipeToPDF.push(ingredient))
        recipeToPDF.push('')
        recipeToPDF.push('Instructions')
        const instructions = recipe.recipe.instructions.split('\n')
        instructions.forEach((instruction, index) => recipeToPDF.push(`${index+1}. ${instruction}`))
        const options = {
            maxWidth: 180,
            lineHeightFactor: 1.5
        }
        doc.setFontSize(10)
        doc.text(recipeToPDF, 10, 7, options)
        doc.save(`${recipe.recipe.name}.pdf`)
    }
    return (
        <DownloadIcon onClick={() => {saveRecipeToPDF(recipe)}} sx={{ color: green[800] }}/>
    )
}

export default PDFButton