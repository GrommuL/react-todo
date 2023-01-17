import React, { useContext, useState } from 'react'
import { CustomContext } from '../../utils/Context'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditPencil from '../../pages/Home/EditPencil'
import '../../pages/Home/homeContent.scss'

const ContentCategory = ({status, colorStatus}) => {

    const {user, setUser} = useContext(CustomContext)
    const [complete, setComplete] = useState(false)
    const [add, setAdd] = useState(false)
    const [task, setTask] = useState('')


    const addNewTask = () =>{
        if(status !== 'Все задания'){
            let newTask = {
                ...user.categories.find(item => status === item.categoryName),
                tasks: [{
                    ...user.categories.find(item => status === item.categoryName).tasks,
                },
                {
                    id: uuidv4(),
                    taskTitle: task ,
                    isComplete: complete
                }]
            }
            axios.patch(`http://localhost:8080/users/${user.id}`, {categories: [...user.categories.filter(item => item.categoryName !== status), newTask]}).then(({data}) => {
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                toast("Папка была успешно добавлена")
            }).catch(err => toast(`Произошла ошибка при добавлении папки, ${err.message}`))
        }


    }

  return (
    <>
        <div className="content__title">
            <h2 className='content__title-name' style={{color: colorStatus}}>{status}</h2>
            <EditPencil/>
        </div>
        <ul className='content__tasks'>
            {
                status !== 'Все задачи' ?
                user.categories.find(item => item.categoryName === status).tasks.map(task => (
                    <li className='content__tasks-item' key={task.id}>
                        <div className="content__tasks-block">
                        <div className={`content__tasks-status ${task.isComplete ? 'complete' : ''}`} onClick={()=> setComplete(!complete)}></div>
                        <p className='content__tasks-name'>{task.taskTitle}</p>
                        </div>
                        <span className='content__tasks-close'>+</span>
                    </li>
                )) : ''
            }
        </ul>
        <div className="content__create">
            <button className='content__create-btn' type='button' style={{display: add ? 'none' : 'flex'}} onClick={()=> setAdd(prev => !prev)}>+ Добавить задачу</button>
            <div className="content__create-add" style={{display: add ? 'flex' : 'none'}}>
                <input className='content__create-field' type="text" placeholder='Текст задачи' value={task} onInput={(e)=> setTask(e.target.value)}/>
                <div className="content__create-buttons">
                    <button className='content__create-accept' type='button'onClick={addNewTask}>Добавить задачу</button>
                    <button className='content__create-cancel' type='button' onClick={()=> setAdd(prev => !prev)}>Отмена</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ContentCategory