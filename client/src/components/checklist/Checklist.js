import React, { useState, useEffect } from'react'

const Checklist = () => {
    const [checklist, setChecklist] = useState([])

    const getChecklist = async () => {
        try {
            const response = await fetch(`/api/v1/checklist`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setChecklist(body.listItems)
        } catch (error) {
            console.error(`Error in fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getChecklist()
    }, [])
    
    return (
        <div className='form-container'>
            <ol>
                {checklist[0]
                    ? checklist.map((listItem, index) => {
                        return <li key={index}>{listItem.name}</li>
                    })
                    : <p>No saved items</p>
                }
            </ol>
        </div>
        )
}

export default Checklist