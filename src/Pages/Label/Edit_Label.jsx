import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ax from '../../ax'
import Spinner from '../../Components/Spinner'
import MessageContext from '../../Context/MessageContext'
import Master from '../Layout/Master'

function Edit_Label() {
  const {setMessage} = useContext(MessageContext)

  const location = useLocation()
  const {push} = useHistory()
  const [label,setLabel] = useState(location.state.label.name)
  const [loader,setLoader] = useState(false)
  const token = localStorage.getItem('token')

  const update = () => {
    setLoader(true)
    const frmData = new FormData()
    frmData.append('name',label)
    ax.post('/category/'+location.state.label.slug, frmData
    ,{headers:{Authorization: `Bearer ${token}`}}).then((d)=>{
      setLoader(false)
      if(d.success){
        setMessage({type: 'success',message:'Label Edited!'})
        push('/label')
      }
    })
  }

  return (
    <Master>
        <div className="conatiner mt-3">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header">
                    <Link to='/label' className='btn btn-danger'>Back</Link>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className='text-white'>New Label</label>
                    <input type="text" className='form-control' value={label} onChange={(e)=>setLabel(e.target.value)} />
                  </div>
                    
                    {
                      loader ? <Spinner />
                      :
                  <button className='btn btn-danger' onClick={()=>update()}>
                    <span>Update</span>
                  </button>
                    }
                    
                </div>
              </div>
            </div>
        </div>
    </Master>
  )
}

export default Edit_Label