import React, { useContext } from 'react'
import ContentCategory from '../../components/ContentCategory/ContentCategory'
import { CustomContext } from '../../utils/Context'
import './homeContent.scss'

const HomeContent = () => {


const {user,status, colorStatus} = useContext(CustomContext)

  return (
    <div className='content'>
        {
            status === 'Все задачи' ? user.categories.map(item =>(
                <ContentCategory key={item.id} status={item.categoryName} colorStatus = {item.color}/>
            )) : <ContentCategory status = { status } colorStatus = { colorStatus }/>
        }
    </div>
  )
}

export default HomeContent