import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import ax from '../../ax'
import Spinner from '../../Components/Spinner'
import Master from '../Layout/Master'

function All_Label() {

const [nextPage,setNextPage] = useState('')
const [pageLoader,setPageLoader] = useState(false)
const [loadMoreState,setLoadMoreState] = useState(false)
const [label,setLabel] = useState([])

const token = localStorage.getItem('token')

useEffect(()=>{
    setPageLoader(true)
    ax.get('/category',{headers: {Authorization: `Bearer ${token}`}}).then((d)=>{
        const data = d.data.data.data
        setLabel(data)
        setNextPage(d.data.data.next_page_url)
        setPageLoader(false)
     })
},[])

const loadMore = () =>{
    setLoadMoreState(true)
    ax.get(nextPage,{headers: {Authorization: `Bearer ${token}`}}).then((d)=>{
        const {data} = d.data.data
        setLabel([...label,...data])
        setNextPage(d.data.data.next_page_url)
        setLoadMoreState(false)
      })
}

const DeleteLabel = (props)=>{
    const frmData = new FormData()
    ax.delete('/category/'+props,{headers:{Authorization:`Bearer ${token}`}}).then((d)=>{
        // window.location.reload()
        setPageLoader(true)
        ax.get('/category',{headers: {Authorization: `Bearer ${token}`}}).then((d)=>{
            const data = d.data.data.data
            setLabel(data)
            setPageLoader(false)
         })
    })

}  



  return (
    <Master>
        {
            pageLoader ? <Spinner />
            :
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card shadow-lg">
                            <div className="card-header">
                                <h4 className='text-white'>All Label</h4>
                                <Link to='/label/create' className='btn btn-danger'>New Label</Link>
                            </div>
                            <div className="card-body">
                                <table className='table table-striped text-white'>
                                    <thead>
                                        <tr>
                                        <th>Label Name</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            label.map((d)=>(
                                        <tr key={d.id}>
                                            <td>{d.name}</td>
                                            <td><Link to={{
                                                pathname : `/label/edit/${d.slug}` ,
                                                state: {label: d}
                                            }} className='btn btn-warning'>Edit</Link>
                                            <button onClick={()=>DeleteLabel(d.slug)} className='btn btn-danger ml-3'>Delete</button></td>
                                        </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                <div className="row mt-5">
                {
                    nextPage !== null ?
                    <div className="col-md-12 text-center">
                    {
                        loadMoreState ? <Spinner />
                        :
                    <button className="btn btn-primary btn-fab btn-icon btn-round" onClick={()=>loadMore()}>
                        <i className="fas fa-arrow-down" />
                    </button>
                    }
                    </div>
                    :
                    <div></div>
                }
                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </Master>
  )
}

export default All_Label