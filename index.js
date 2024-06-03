const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { order, clientName, price, status } = request.body
    
    const user = {id:uuid.v4(),  order, clientName, price, status }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body

    const updatedUser = {id, order, clientName, price, status }

    const index = users.findIndex(user => user.id === id)
    
    if(index <0){
        return response.status(404).json({ message: "user not found"})
    }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index <0){
        return response.status(404).json({ message: "user not found"})
    }

    users.splice(index,1)

    return response.status(204).json({ message:"Pedido deletado com sucesso"})
})




app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})


/*
{
	"order": "X- Salada, 2 batatas grandes, 1 coca-cola",
	"clientName":"José",
	"price": 44.50
}

*/