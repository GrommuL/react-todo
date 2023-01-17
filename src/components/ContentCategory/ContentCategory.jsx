import React, { useContext, useState } from 'react'
import { CustomContext } from '../../utils/Context'
import EditPencil from '../../pages/Home/EditPencil'
import '../../pages/Home/homeContent.scss'
import ContentTasks from './ContentTasks'

const ContentCategory = ({status, colorStatus}) => {

  return (
    <>
        <div className="content__title">
            <h2 className='content__title-name' style={{color: colorStatus}}>{status}</h2>
            <EditPencil/>
        </div>
        <ContentTasks status={status}/>
    </>
  )
}

export default ContentCategory