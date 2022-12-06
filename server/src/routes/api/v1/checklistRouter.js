import express from 'express'
import objection from 'objection'
import { ListItem, User } from '../../../models/index.js'

const checklistRouter = new express.Router()

checklistRouter.get('/', async (req, res) => {
    const user = await User.query().findById(req.user.id)
    try {
        user.listItems = await user.$relatedQuery('listItems').orderBy('createdAt')
        return res.status(200).json({ listItems: user.listItems })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

checklistRouter.post('/', async (req, res) => {
    const { name } = req.body
    const userId = req.user.id
    const isChecked = false
    try {
        const newListItem = await ListItem.query().insertAndFetch({ name, userId, isChecked })
        console.log(newListItem)
        return res.status(200).json({ newListItem })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default checklistRouter