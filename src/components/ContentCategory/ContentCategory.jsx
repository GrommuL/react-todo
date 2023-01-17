import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { CustomContext } from '../../utils/Context'
import EditPencil from '../../pages/Home/EditPencil'
import '../../pages/Home/homeContent.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

const ContentCategory = ({statusContent, colorStatusContent}) => {

    const {user, setUser, status, setStatus} = useContext(CustomContext)
    const [showTitle, setShowTitle] = useState(false)
    const [show, setShow] = useState(false)


    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm({
        mode: 'onBlur'
    })

    const addTask = (data) => {
        let newTask ={
            ...data,
            id:uuidv4(),
            isComplete: false
        }

        let newCategories = user.categories.map( item => {
            if(item.categoryName === statusContent ){
                return {...item,tasks: [...item.tasks, newTask]}
            }
            return item
        })

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories}).then(({data}) => {
            setUser({
                ...data,
                token: user.token
            })
            localStorage.setItem('user', JSON.stringify({
                ...data,
                token: user.token
            }))
            setShow(false)
            reset()
            toast("Задача была успешно добавлена")
        }).catch(err => toast(`Произошла ошибка при добавлении папки, ${err.message}`))
    }


    const checkTasks = (data) => {
        let has = user.categories.find(item => item.categoryName === statusContent).tasks.findIndex(el => el.taskTitle === data.taskTitle)
        if(has > -1){
            toast('Задача с таким именем уже существует')
        } else{
            addTask(data)
        }

    }


    const deleteTask = (id) => {

        let newCategories = user.categories.map( item => {
            if(item.categoryName === statusContent ){
                return {...item,tasks: item.tasks.filter(el => el.id !== id)}
            }
            return item
        })
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories}).then(({data}) => {
            setUser({
                ...data,
                token: user.token
            })
            localStorage.setItem('user', JSON.stringify({
                ...data,
                token: user.token
            }))
            toast("Задача удалена")
        }).catch(err => toast(`Задача не удалена, ${err.message}`))
    }


    const handleCompleteTask = (id)=>{
        let newCategories = user.categories.map( item => {
            if(item.categoryName === statusContent ){
                return {...item,tasks: item.tasks.map(el => el.id === id  ? {...el, isComplete :!el.isComplete} : el)}
            }
            return item
        })
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories}).then(({data}) => {
            setUser({
                ...data,
                token: user.token
            })
            localStorage.setItem('user', JSON.stringify({
                ...data,
                token: user.token
            }))
            toast("Задача выполнена")
        }).catch(err => toast(`Задача не выполнена, ${err.message}`))
    }


    const handleChangeCategory = (data) => {
        let newCategory = user.categories.map(item => item.categoryName === statusContent ? {...item, categoryName: data.categoryName} : item)
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategory}).then((res) => {
            setUser({
                ...res.data,
                token: user.token
            })
            localStorage.setItem('user', JSON.stringify({
                ...res.data,
                token: user.token
            }))
            setStatus(data.categoryName)
            setShowTitle(false)
            toast("Название категории изменено")
        }).catch(err => toast(`Название категории не изменено, ${err.message}`))
    }

    const checkCategoryName = (data) => {
        if(data.categoryName === 'Все задачи'){
            toast("Название категории не может называться Все категории")
        } else{
            handleChangeCategory(data)
        }
    }


  return (
    <>
        {
            showTitle ? <form className="content__create-add" noValidate onSubmit={handleSubmit(checkCategoryName)} >
            <input defaultValue={statusContent} {...register('categoryName', {
                required:{
                    message:'Название категории, обязательно к заполнению',
                    value:true
                  },
                  minLength: {
                    message: 'Минимальная длина 3 символа',
                    value: 3
                  }
            })} className='content__create-field' type="text" placeholder='Текст задачи'/>
            <p className='form__error'>{errors.categoryName && errors.categoryName.message}</p>
            <div className="content__create-buttons">
                <button className='content__create-accept' type='submit'>Изменить</button>
                <div className='content__create-cancel' type='button'onClick={() => setShowTitle(false)}>Отмена</div>
            </div>
        </form>
        : <div className="content__title">
        <h2 className='content__title-name' style={{color: colorStatusContent}}>{statusContent}</h2>
        <EditPencil setShowTitle={setShowTitle} showTitle={showTitle}/>
    </div>
        }

        <ul className='content__tasks'>
        {
            statusContent !== 'Все задачи' ?
            user.categories.find(item => item.categoryName === statusContent).tasks.map(task => (
                 <li className='content__tasks-item' key={task.id}>
                    <div className="content__tasks-block">
                        <div className={`content__tasks-status ${task.isComplete ? 'complete' : ''}`} onClick={()=> handleCompleteTask(task.id)}></div>
                        <p className='content__tasks-name'>{task.taskTitle}</p>
                    </div>
                    <span className='content__tasks-close' onClick={(e)=> deleteTask(task.id)}>+</span>
                </li>
            )) : ''
        }
        </ul>
            {
                status !== 'Все задачи' ? <>
                {
                    show ? <form className="content__create-add" noValidate onSubmit={handleSubmit(checkTasks)} >
                    <input {...register('taskTitle', {
                        required:{
                            message:'Название задачи, обязательно к заполнению',
                            value:true
                          },
                          minLength: {
                            message: 'Минимальная длина 3 символа',
                            value: 3
                          }
                    })} className='content__create-field' type="text" placeholder='Текст задачи'/>
                    <p className='form__error'>{errors.taskTitle && errors.taskTitle.message}</p>
                    <div className="content__create-buttons">
                        <button className='content__create-accept' type='submit'>Добавить задачу</button>
                        <div className='content__create-cancel' type='button'onClick={() => setShow(false)}>Отмена</div>
                    </div>
                </form>
                : <button className='content__create-btn' type='button' onClick={() => setShow(true)}>+ Добавить задачу</button>
                }
                </> : ''
            }
    </>
  )
}

export default ContentCategory