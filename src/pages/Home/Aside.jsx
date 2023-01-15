import React from 'react'
import './aside.scss'
import ListGroupIcon from './ListGroupIcon'

const Aside = () => {
  return (
    <aside className='aside'>
        <div className='aside__all'>
            <ListGroupIcon/>
            <p className='aside__text'>Все задачи</p>
        </div>
        <ul className='aside__menu'>
            <li className='aside__item'>
                <span style={{background: 'red'}} className='aside__item-color'></span>
                <p className='aside__item-text'>Покупки</p>
            </li>
            <li className='aside__item'>
                <span className='aside__item-color'></span>
                <p className='aside__item-text'>Покупки</p>
            </li>
            <li className='aside__item'>
                <span style={{background: 'red'}} className='aside__item-color'></span>
                <p className='aside__item-text'>Покупки</p>
            </li>
        </ul>
        <button className='aside__btn'>+ Добавить папку</button>
    </aside>
  )
}

export default Aside