import React, { useContext, useState } from 'react'
import './aside.scss'
import ListGroupIcon from './ListGroupIcon'
import { dataColors } from '../../utils/dataColors'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { CustomContext } from '../../utils/Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Aside = () => {

    const [active,setActive] = useState(false)
    const [color, setColor] = useState(dataColors[0])
    const [category, setCategory] = useState('')
    const {user, setUser} = useContext(CustomContext)


    const logOutUser = () =>{
        localStorage.removeItem('user')
        setUser({
            email: ''
        })
    }

    const checkCategoryName = () => {
        if(user.categories.findIndex(item => item.categoryName === category) > -1){
            toast('Папка с таким именем уже существует')
        } else{
            addCategories()
        }

    }


    const deleteCategory = (id) => {
        let newCategory = user.categories.filter(item => item.id !== id)
        axios.patch(`http://localhost:8080/users/${user.id}`,{categories : newCategory})
        .then(({data})=> {
            setUser({
                ...data,
                token: user.token
            })
            localStorage.setItem('user', JSON.stringify({
                ...data,
                token: user.token
            }))
            toast("Папка была успешно удалена")
        }).catch(err => toast(`Произошла ошибка при удалении папки, ${err.message}`))
    }


    const addCategories = () =>{
        let newCategory ={
            id:uuidv4(),
            categoryName: category,
            color: color,
            tasks: []
        }
        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: [...user.categories, newCategory]}).then(({data}) => {
            setUser({
                ...data,
                token: user.token
            })
            localStorage.setItem('user', JSON.stringify({
                ...data,
                token: user.token
            }))
            setActive(false)
            setCategory('')
            toast("Папка была успешно добавлена")
        }).catch(err => toast(`Произошла ошибка при добавлении папки, ${err.message}`))
    }



  return (
    <aside className='aside'>
        <div className='aside__all'>
            <ListGroupIcon/>
            <p className='aside__text'>Все задачи</p>
        </div>
        <ul className='aside__menu'>
            {
                user.categories.map(item => (
                    <li className='aside__item' key={item.id}>
                        <div className='aside__item-left'>
                        <span style={{background: item.color}} className='aside__item-color'></span>
                        <p className='aside__item-text'>{item.categoryName}</p>
                        </div>
                        <span className='aside__item-delete' onClick={()=> deleteCategory(item.id)}>+</span>
                    </li>
                ))
            }
        </ul>
        <div className="aside__create">
            <button className='aside__btn' type='button'onClick={()=> setActive((prev)=>!prev)}>+ Добавить папку</button>
            <div className="aside__popup" style={{display: active ? 'flex' : 'none'}}>
                <input className='aside__field' type="text" placeholder='Название папки' value={category} onInput={(e)=> setCategory(e.target.value)}/>
                <div className='aside__colors'>
                    {dataColors.map(item => (
                        <span className='aside__color' key={item} style={{background: item, border: color === item ? '2px solid black' : 'none'}} onClick={()=> setColor(item)}/>
                    ))}
                </div>
                <button className='aside__add' type='button' onClick={checkCategoryName}>Добавить</button>
                <span className='aside__popup-close'onClick={()=> setActive(false)}>+</span>
            </div>
        </div>
        <button className='aside__exit' onClick={logOutUser}>Выйти из аккаунта</button>
    </aside>
  )
}

export default Aside