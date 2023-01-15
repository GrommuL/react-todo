import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { CustomContext } from '../../utils/Context'
import Aside from './Aside'

const Home = () => {

const {user} = useContext(CustomContext)
  if (user.email.length === 0){
    return <Navigate to='/login'/>
  }

  return (
    <section className='home'>
      <Aside/>
      <div className='content'>
        asd
      </div>
    </section>
  )
}

export default Home