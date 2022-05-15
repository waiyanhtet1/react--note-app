import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ax from '../../ax'
import AuthContext from '../../Context/AuthContext'
import LabelContext from '../../Context/LabelContext'
import MessageContext from '../../Context/MessageContext'
import Master from '../Layout/Master'

export default function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loader,setLoader] = useState(false)
  const [error,setError] = useState({})
  const authUserContext = useContext(AuthContext)
  const msgContext = useContext(MessageContext)
  const {setLabel,setSelected} = useContext(LabelContext)
  const history = useHistory()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      msgContext.setMessage({type:'fail' , message:'Already Login!'})
      history.push('/')
    }
  },[])

  const Login = () => {
    setLoader(true)
    var frmData = new FormData()
    frmData.append('email',email)
    frmData.append('password',password)

    ax.post('/login',frmData).then(res=>{
      setLoader(false)
      const{success,data} = res.data
      if(success === false){
        setError(data)
      } else {
        localStorage.setItem('token',data.token)
        authUserContext.setAuthUser(data.user)
        msgContext.setMessage({type:'success', message:`Welcome Back ${data.user.name}`})
        
        ax.get('/category',{headers: {Authorization : `Bearer ${data.token}`}}).then((d)=>{
          const {data} = d.data
          setLabel(data)
          setSelected('')
          history.push('/')
        })

        
      } 
    })
  }
  return (
    <Master>
        <div className="container mt-3">
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header bg-dark">
            <h3 className="text-white">Login</h3>
          </div>
          <div className="card-body">

              <div className="form-group">
                <label htmlFor className="text-white">Enter Email</label>
                <input type="email" className={`form-control bg-dark ${error.email && 'border border-danger'} text-white`} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email" />
                {
                  error.email && error.email.map((err)=>
                    <small key={err} className='text-danger'>{err}</small>
                  )
                }
              </div>
              <div className="form-group">
                <label htmlFor className="text-white">Enter Password</label>
                <input type="password" className={`form-control bg-dark ${error.password &&  'border border-danger'} text-white`}onChange={(e)=>setPassword(e.target.value)} placeholder="*****" />
                {
                  error.password && error.password.map(err=>
                      <small key={err} className='text-danger'>{err}</small>
                    )
                }
              </div>
            <button onClick={()=>Login()} className='btn btn-dark' disabled={loader}>
              {
                loader ? <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> 
                : 
                <span>Login</span>
              }
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>


    </Master>
  )
}
