/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const TodosController = () => import('#controllers/todos_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
// Routes
// @ts-ignore
router.get('/to-do', [TodosController, 'index']) // <-- GET route
// @ts-ignore
router.post('/to-do', [TodosController, 'create']) // <-- POST route

router.patch('/to-do/:id/toggle', [TodosController, 'update']) // <-- POST route
router.delete('/to-do/:id/delete', [TodosController, 'delete'])
