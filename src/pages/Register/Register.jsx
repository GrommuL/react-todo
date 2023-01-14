import React from 'react'

const Register = () => {
  return (
    <div className='login'>
    <form action="">
        <h2>Регистрация</h2>
        <input type="text" placeholder='Введите логин' />
        <input type="email" placeholder='Введите почту' />
        <input type="password" placeholder='Введите пароль' />
        <input type="password" placeholder='Подтвердите пароль' />
        <button type='submit'>Зарегистрироваться</button>
    </form>
</div>
  )
}

export default Register