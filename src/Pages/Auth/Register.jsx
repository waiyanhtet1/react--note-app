import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ax from '../../ax'
import AuthContext from '../../Context/AuthContext'
import Master from '../Layout/Master'

export default function Register() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState({})
  const [loader,setLoader] = useState(false)
  const authUserContext = useContext(AuthContext)
  const history = useHistory()

  const Register = () => {
    setLoader(true)
    var frmData = new FormData();
    frmData.append('name',name)
    frmData.append('email',email)
    frmData.append('password',password)

    ax.post('/register',frmData).then(res=>{
        setLoader(false)
        const {success,data} = res.data
        if(success === false) {
          setError(data)
        } else {
          // token
          localStorage.setItem('token',data.token)
          // auth user data
          authUserContext.setAuthUser(data.user)

          // redirect
          history.push('/')
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
              <h3 className="text-white">Register</h3>
            </div>
            <div className="card-body">
              
                <div className="form-group">
                  <label htmlFor className="text-white">Enter Username</label>
                  <input type="text" className={`form-control bg-dark ${error.name && 'border border-danger'} text-white`} onChange={(e)=>setName(e.target.value)}  placeholder="enter your name" />
                  {
                    error.name && error.name.map((err)=>
                      <small key={err} className='text-danger'>{err}</small>
                    )
                  }
                </div>

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
                  <input type="password" className={`form-control bg-dark ${error.password && 'border border-danger'} text-white`} onChange={(e)=>setPassword(e.target.value)} placeholder="*****" />
                  {
                    error.password && error.password.map((err)=>
                      <small key={err} className='text-danger'>{err}</small>
                    )
                  }
                </div>

                <button disabled={loader} type="submit" defaultValue="Register" className="btn btn-dark" onClick={()=>Register()}>
                {
                    loader ? <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> 
                    : <span>Regsiter</span>
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
