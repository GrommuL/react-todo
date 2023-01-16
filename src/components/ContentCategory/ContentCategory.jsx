import React, { useContext, useState } from 'react'
import { CustomContext } from '../../utils/Context'
import EditPencil from '../../pages/Home/EditPencil'
import '../../pages/Home/homeContent.scss'

const ContentCategory = ({status, colorStatus}) => {

    const {user} = useContext(CustomContext)
    const [complete, setComplete] = useState(false)
  return (
    <>
        <div className="content__title">
            <h2 className='content__title-name' style={{color: colorStatus}}>{status}</h2>
            <EditPencil/>
        </div>
        <ul className='content__tasks'>
        {
            status !== 'Все задачи' ?
            user.categories.find(item => item.categoryName === status).tasks.map(task => (
                 <li className='content__tasks-item' key={task.id}>
                    <div className={`content__tasks-status ${task.isComplete ? 'complete' : ''}`} onClick={()=> setComplete(!complete)}></div>
                    <p className='content__tasks-name'>{task.taskTitle}</p>
                </li>
            )) : ''
        }
        </ul>
    </>
  )
}

export default ContentCategory