import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import ax from '../../ax'
import Spinner from '../../Components/Spinner'
import Master from '../Layout/Master'
import MessageContext from '../../Context/MessageContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Create_Label() {
  const {setMessage} = useContext(MessageContext)
  const token = localStorage.getItem('token')
  const [label,setLabel] = useState('')
  const[loader,setLoader] = useState(false)
  const {push} = useHistory()

  const frmData = new FormData()
  frmData.append('name',label)

  const storeLabel = () =>{
    setLoader(true)
    ax.post('/category',frmData,{headers:{Authorization: `Bearer ${token}`}}).then((d)=>{
      setLoader(false)
      if(d.data.success){
        setMessage({type:'success', message:'New Label Created!'})
         setLabel('')
          push('/label')
      } else {
        setMessage({type:'fail',message:'Fill the field!'})
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
                    <input type="text" className='form-control' onChange={(e)=>setLabel(e.target.value)}  value={label}/>
                  </div>
                    {
                      loader ? <Spinner />
                      :
                  <button className='btn btn-danger' onClick={()=>storeLabel()}>
                      <span>Create</span>
                  </button>
                    }
                </div>
              </div>
            </div>
        </div>
    </Master>
  )
}

export default Create_Label