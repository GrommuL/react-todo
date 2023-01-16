import { createContext, useState } from "react";

export const CustomContext = createContext()

export const Context = (props) => {

    const [user,setUser] = useState({
        email: ''
    })

    const [status, setStatus] = useState('Все задачи')

    const [colorStatus, setColorStatus] = useState('#FFFFFF')

    const value = {
        user: user,
        setUser: setUser,
        status,
        setStatus,
        colorStatus,
        setColorStatus
    }

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}