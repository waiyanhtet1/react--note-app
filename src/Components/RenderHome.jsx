import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import LabelContext from '../Context/LabelContext'

function RenderHome(props) {
  const {setSelected} = useContext(LabelContext)
    const {push} = useHistory()

    const renderHome = () =>{
        setSelected('')
        push('/')
    }
  return (
    <div>
        <Link to='/' className='btn btn-danger' onClick={()=>renderHome()}>Back</Link>
    </div>
  )
}

export default RenderHome