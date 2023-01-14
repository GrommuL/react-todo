import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import './form.scss'

const Form = () => {


    const navigate = useNavigate()

    const location = useLocation()

    const {
      register,
      reset,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm({mode: 'onBlur'})

    const registerUser = (data) => {
      axios.post('http://localhost:8080/register',{
        ...data,
        categories:[]
      }).then((res) => {
        reset()
        navigate('/')
      }).catch(err => console.log(err))
    }

    const loginUser = (data) => {
        axios.post('http://localhost:8080/login',{
          ...data
        }).then((res) => {
          reset()
          navigate('/')
        }).catch(err => console.log(err))
      }

    const onSubmit = (data) => {
        location.pathname === '/register' ? registerUser(data) : loginUser(data)
    }

  return (
    <form noValidate className='form' onSubmit={handleSubmit(onSubmit)}>
    <h2 className='form__title'>{location.pathname === '/register' ? 'Регистрация' : 'Вход'}</h2>
        {location.pathname === '/register' ?<label className='form__label'>
    <input className='form__field' type="text" placeholder='Введите логин' {...register('login',{
      required:{
        message:'Поле логин,обязателен к заполнению',
        value:true
      },
      maxLength: {
        message: 'Максимальная длина 10 символов',
        value: 10
      },
      minLength: {
        message: 'Минимальная длина 3 символа',
        value: 3
      }
    })}/>
    <p className='form__error'>{errors.login && errors.login.message}</p>
    </label> : ''}
    <label className='form__label'>
    <input className='form__field' type="email" placeholder='Введите почту' {...register('email',{
      required:{
        message:'Email,обязателен к заполнению',
        value:true
      },
      minLength: {
        message: 'Минимальная длина 10 символов',
        value: 10
      },
      pattern:{
        message: 'Напишите правильно свой Email',
        value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/
      }
    })}/>
    <p className='form__error'>{errors.email && errors.email.message}</p>
    </label>
    <label className='form__label'>
    <input className='form__field' type="password" placeholder='Введите пароль' {...register('password',{
      required:{
        message:'Пароль обязателен к заполнению',
        value:true
      },
      pattern:{
        message: 'Пароль должен содержать не менее 8 символов, заглавную букву, число!',
        value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
      }
      })} />
    <p className='form__error'>{errors.password && errors.password.message}</p>
    </label>
    {/* <label className='form__label'>
    <input className='form__field' type="password" placeholder='Подтвердите пароль' />
    </label> */}
    <p className='form__text'>{location.pathname === '/register' ? <>У меня уже есть аккаунт,чтобы <Link className='form__text-link' to='/login'>войти</Link></> : <>Еще нет аккаунта? <Link className='form__text-link' to='/register'>Зарегестрироваться</Link></>}</p>
    <button className='form__btn' type='submit'>{location.pathname === '/register' ? 'Зарегистрироваться' : 'Войти'}</button>
    </form>
  )
}

export default Form