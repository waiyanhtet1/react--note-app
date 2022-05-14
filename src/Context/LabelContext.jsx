import React, { createContext, useEffect, useState } from "react";
import ax from '../ax'
const LabelContext = createContext()

export const LabelContextProvider = (props) => {
    const [label,setLabel] = useState({})
    const [loader,setLoader] = useState(true)
    const [selected,setSelected] = useState()
    const token = localStorage.getItem('token')

    useEffect(()=>{
        ax.get('/category',{ headers:{Authorization:`Bearer ${token}`} }).then((d)=>{
            const {data} = d.data
            setLabel(data)
            setLoader(false)
        })
    },[])

    return(
        <LabelContext.Provider value={{label,setLabel,loader,selected,setSelected}}>
            {props.children}
        </LabelContext.Provider>
    )
}

export default LabelContext
