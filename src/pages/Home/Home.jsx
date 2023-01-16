import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CustomContext } from '../../utils/Context'
import Aside from './Aside'
import HomeContent from './HomeContent'

const Home = () => {

const {user} = useContext(CustomContext)
  if (user.email.length === 0){
    return <Navigate to='/login'/>
  }

  return (
    <section className='home'>
      <Aside/>
      <HomeContent/>
      <ToastContainer />
    </section>
  )
}

export default Home