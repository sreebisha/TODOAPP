import React from 'react'
import './Todo.css' 
import { useState , useRef , useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";


function Todo() {
  const[todo , setTodo] = useState('')
  const[todos ,setTodos] = useState([])
  const[editID , setEditId] = useState(0)

  const handleSubmit = (e) =>{
    e.preventDefault()
  }


         const addTodo = () =>{
          if(todo !==''){
            setTodos([...todos,{list : todo , id : Date.now() ,  status : false}])
          console.log(todos);
          setTodo('') 
        }
          if(editID){
            const editTodo = todos.find((todo)=>todo.id == editID)
            const updateTodo = todos.map((to)=>to.id=== editTodo.id
            ?(to = {id : to.id , list : todo})
            : (to = {id : to.id , list : to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setEditId('')
          } 
         }


         const inputRef = useRef('null')

         
         useEffect(()=>{
          inputRef.current.focus()
         })


         const onComplete = (id)=>{
          let complete = todos.map((list)=>{
            if(list.id === id)
           {
            return ({...list , status : !list.status})

           }
        return list
          })
          setTodos(complete)
         }


         const onEdit = (id)=>{
         const editTodo  = todos.find((to)=> to.id === id)
         setTodo(editTodo.list)
         setEditId(editTodo.id)
         }



         const onDelete = (id)=>{
          setTodos(todos.filter((to)=>to.id !== id))
         }



  return (
    <div className='container'>
       <h2>TODO APP</h2>

       <form className='form-group' onSubmit={handleSubmit}>
        <input type="text" value={todo} ref={inputRef} placeholder='Enter your todo'
         className='form-control' onChange={(event)=>setTodo(event.target.value)}/>
        
        <button onClick={addTodo}>{editID  ? 'EDIT' : 'ADD'}</button>
       </form>

       <div className='list'>
        <ul>
           {
            todos.map((to)=>(
              <li className='list-items'>
                <div className='list-item-list' id={to.status ? 'list-item' : ''}>{to.list}</div>
                <span>
                <IoMdDoneAll 
                className='list-item-icons' 
                id='complete'
                 title='Complete'
                 onClick={()=>onComplete(to.id)}
                 />


                <FiEdit  
                className='list-item-icons' 
                id='edit'
                 title='Edit'
                 onClick={()=>onEdit(to.id)}
                 />


                <MdDeleteForever 
                className='list-item-icons'
                 id='delete'
                  title='Delete'
                  onClick={()=>onDelete(to.id)}
                  />
 
                  </span>
                  </li>
            ))
           }

        </ul>
       </div>
    </div>
  )
}
export default Todo