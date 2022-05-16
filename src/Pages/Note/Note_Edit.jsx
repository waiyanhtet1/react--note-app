import React, { useContext, useEffect, useState } from 'react'
import Master from '../Layout/Master'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'; 
import LabelContext from '../../Context/LabelContext'
import MessageContext from '../../Context/MessageContext'
import ax from '../../ax'
import { useHistory } from 'react-router-dom';
import RenderHome from '../../Components/RenderHome';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Spinner from '../../Components/Spinner'

function Note_Edit() {

    const [description,setDescription] = useState('')
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('')
    const [color,setColor] = useState('')
    const [loader,setLoader] = useState(false)
    const [error,setError] = useState({})
    const [pageLoader,setPageLoader] = useState(false)

    const {label,setSelected} = useContext(LabelContext)
    const {setMessage} = useContext(MessageContext)
    const token = localStorage.getItem('token')
    const {push} = useHistory()
    const parm = useParams()

    // set data value
    useEffect(()=>{
        setPageLoader(true)
        ax.get('/note/'+parm.slug, {headers: {Authorization: `Bearer ${token}`}}).then((d)=>{
            const data = d.data.data
            setTitle(data.title)
            setCategory(data.category.slug)
            setColor(data.color)
            setDescription(data.description)
            setPageLoader(false)
        })
    },[])


    // update note
    const update_note = () =>{
        setLoader(true)
        var frmData = new FormData()
        frmData.append('title',title)
        frmData.append('description',description)
        frmData.append('category_slug',category)
        frmData.append('color',color)
        frmData.append('_method','PUT')

        ax.post('/note/'+parm.slug ,frmData ,{headers:{Authorization: `Bearer ${token}`}}).then((d)=>{
            const {success,data} = d.data
            
            if(success === false){
                setError(data)
                setLoader(false)
                setMessage({type:'fail', message:'Fill all Fields!'})
            } else {
                setMessage({type:'success', message:'Note Edited!'})
                
                setSelected('')
                push('/')
            }
        })
    }   
  return (
    <Master>
        
        {
            pageLoader ? <Spinner />
            :
        
            <div className="col-md-6 offset-md-3 p-3" >
                <div className="card ">
                    <div className="card-header" style={{backgroundColor:color?color:'bg-dark'}}>
                    <RenderHome />
                    </div>

                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="">New Title</label>
                            <input type="text" className='form-control' style={error.title && {border:' 3px solid red'}}  onChange={e=>setTitle(e.target.value)} value={title}/>
                            {
                                error.title && error.title.map((err)=> <small key={err} className='text-danger'>{err}</small>)
                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Choose Label</label>
                            <select className='form-control' onChange={e=>setCategory(e.target.value)} style={error.category_slug && {border:' 3px solid red'}} value={category} >
                                <option value=''>--Choose Label--</option>
                                {
                                    label.data.map((d)=>(
                                        <option key={d.id} value={d.slug}>{d.name}</option>
                                    ))
                                }
                            </select>
                            {
                                error.category_slug && error.category_slug.map((err)=> <small key={err} className='text-danger'>{err}</small>)
                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="">New Color</label>
                            <select className='form-control' onChange={e=>setColor(e.target.value)} style={error.color && {border:' 3px solid red'}} value={color}>
                                <option value="">Pick Color</option>
                                <option value="#6610f2">Indigo</option>
                                <option value="#dc3545">Red</option>
                                <option value="#ffc107">Yellow</option>
                                <option value="#28a745">Green</option>
                            </select>
                            {
                                error.color && error.color.map((err)=> <small key={err} className='text-danger'>{err}</small>)
                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="">New Description</label>
                            <ReactQuill theme="snow" value={description} onChange={setDescription}  style={{backgroundColor:'white'}}
                             />
                              {
                                error.description && error.description.map((err)=> <small key={err} className='text-danger'>{err}</small>)
                            }
                        </div>


                        <button onClick={()=>update_note()} className='btn btn-danger' disabled={loader}>
                            {
                                loader ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                                : <span>Update</span>
                            }
                            </button>
                    </div>
                </div>
            </div>
        }
    </Master>
  )
}

export default Note_Edit