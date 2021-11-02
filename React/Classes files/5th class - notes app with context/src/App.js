import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddNewTodo from './components/AddNewTodo'
import './App.css';
import TodosList from './components/TodosList';
import Smile from './components/Smile';





function App (props){
  const [todos, setTodos] = useState([])
  const [todosLoaded, setTodosLoaded] = useState(true)
  const [showTodosList, setShowTodosList] = useState(true)
  useEffect(() => {
    //getTodosFromServer()
  }, [])
  const addTodo  = (newTodo) => {
    //axios.post('http://localhost:5500/todos', newTodo)
    setTodos([...todos, newTodo])
  }
  const deleteTodo = (index) => {
    const newTodosList = [...todos]
    newTodosList.splice(index, 1) 
    setTodos(newTodosList)
  }

  const getTodosFromServer = async () => {
     //const todos = await axios.get('http://localhost:5500/todos')
     setTodos(todos.data)
     setTodosLoaded(true)
   }
   console.log('app')
  return (
   
      <div className="App">
        {todosLoaded ? 
          <div>
            <AddNewTodo addTodo={addTodo}>
              <Smile />
              <div>
                Hello world
              </div>
            </AddNewTodo> 
            
            <button onClick={() => setShowTodosList(!showTodosList)}>
              Show/Hide List
            </button>

           {showTodosList && <TodosList todos={todos} deleteTodo={deleteTodo}/>}
          </div> : 'Loading...' 
        }
      </div>

      
  )
}
export default App;
