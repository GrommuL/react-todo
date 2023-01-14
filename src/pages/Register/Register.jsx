import React from 'react'
import './register.scss'
import RegisterBottomDecaration from './RegisterBottomDecaration'

const Register = () => {
  return (
    <div className='register'>
    <form className='form' action="">
        <h2 className='form__title'>Регистрация</h2>
        <input className='form__field' type="text" placeholder='Введите логин' />
        <input className='form__field' type="email" placeholder='Введите почту' />
        <input className='form__field' type="password" placeholder='Введите пароль' />
        <input className='form__field' type="password" placeholder='Подтвердите пароль' />
        <p></p>
        <button className='form__btn' type='submit'>Зарегистрироваться</button>
    </form>
    <RegisterBottomDecaration/>
</div>
  )
}

export default Register