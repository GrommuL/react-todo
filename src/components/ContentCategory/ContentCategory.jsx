import React, { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import EditPencil from '../../pages/Home/EditPencil'
import '../../pages/Home/homeContent.scss'

const ContentCategory = ({status, colorStatus}) => {

    const {user} = useContext(CustomContext)

  return (
    <>
        <div className="content__title">
            <h2 className='content__title-name' style={{color: colorStatus}}>{status}</h2>
            <EditPencil/>
        </div>
        <ul>
        {
            status !== 'Все задачи' ?
            user.categories.find(item => item.categoryName === status).tasks.map(task => (
                 <li key={task.id}>{task.taskTitle}</li>
            )) : ''
        }
        </ul>
    </>
  )
}

export default ContentCategory