import React, { useState } from 'react'
import ax from '../../ax'
import Master from '../Layout/Master'

export default function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const Login = () => {
    ax.post('/login').then(res=>{
      console.log(res.data)
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
              <input type="email" className="form-control bg-dark border-0 text-white" onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor className="text-white">Enter Password</label>
              <input type="password" className="form-control bg-dark border-0 text-white" onChange={(e)=>setPassword(e.target.value)} placeholder="*****" />
            </div>
            <input type="submit" value="Login" className="btn btn-dark" onClick={()=>Login()} />
        </div>
      </div>
    </div>
  </div>
</div>

    </Master>
  )
}
