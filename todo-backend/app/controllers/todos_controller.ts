import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
  // GET /to-do - Fetch all todos
  public async index({ response }: HttpContext) {
    const todos = await Todo.all()
    return response.ok(todos)
  }

  // POST /to-do - Create a new todo
  public async create({ request, response }: HttpContext) {
    let { description, completed } = request.all()
    if (typeof completed === 'string') completed = completed === 'true'

    const newTodo = await Todo.create({
      description,
      completed,
    })

    // Artificial delay for loading simulation (optional)
    function blockForSeconds(seconds: number) {
      const end = Date.now() + seconds * 1000
      while (Date.now() < end) {
        // Blocking loop
      }
    }
    blockForSeconds(10)

    return response.created(newTodo)
  }
  public async update({ params, request, response }: HttpContext) {
    const { id } = params // Get the Todo ID from the URL
    const { completed } = request.all() // Get the new 'completed' status from the body

    // Find the Todo by ID
    const todo = await Todo.find(id)

    if (!todo) {
      return response.notFound({ message: 'Todo not found' })
    }

    // Toggle the 'completed' status
    todo.completed = completed

    // Save the updated Todo
    await todo.save()

    // Return the updated Todo
    return response.ok(todo)
  }
  // DELETE /to-do/:id - Delete a todo by ID
  public async delete({ params, response }: HttpContext) {
    const { id } = params // Get the Todo ID from the URL

    // Find the Todo by ID
    const todo = await Todo.find(id)

    if (!todo) {
      return response.notFound({ message: 'Todo not found' }) // If not found, return 404
    }

    // Delete the Todo
    await todo.delete()

    // Return a success response (204 No Content)
    return response.noContent() // 204 No Content, meaning deletion was successful but no content is returned
  }
}
