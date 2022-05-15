import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import MessageContext from '../Context/MessageContext'
import Master from './Layout/Master'
 import Label from '../Components/Label'
import { useParams } from 'react-router-dom'
import ax from '../ax'
import Spinner from '../Components/Spinner'
import { Link } from 'react-router-dom'

export default function Home() {
  const [note,setNote] = useState([])
  const [nextPage,setNextPage] = useState('')
  const [Pageloader,setPageLoader] = useState(true)
  const [loadMoreState,setLoadMoreState] = useState(false)

  const history = useHistory()
  const msgContext = useContext(MessageContext)
  const {category_slug} = useParams()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    setPageLoader(true)
    if(!token){
      msgContext.setMessage({type:'fail' , message:'Login first!'})
      history.push('/login')
    }
    
    // get all note
    var url = '/note'
    if(category_slug){
      url += '?category_slug=' + category_slug
    }
    ax.get(url,{headers: {Authorization: `Bearer ${token}`}}).then((d)=>{
      const {data} = d.data.data
      // console.log(data)
      setNote(data)
      setNextPage(d.data.data.next_page_url)
      setPageLoader(false)
    })
  },[category_slug])

  
  const loadMore = () =>{
    setLoadMoreState(true)
    ax.get(nextPage,{headers: {Authorization: `Bearer ${token}`}}).then((d)=>{
      const {data} = d.data.data
      setNote([...note,data])
      setNextPage(d.data.data.next_page_url)
      setLoadMoreState(false)
    })

  }

  return (
    <Master>
     
        <div className="container mt-3">
      <div className="row">
        {/* For Category and Information */}
        <div className="col-md-4">

          <div className="card bg-gray-100">
          <Label />
          </div>
          <div className="card bg-gray-100">
            <div className="card-body">
              <li className="list-group-item bg-bg text-white">
                Contribute Notes
                <a href className="badge badge-dark  text-white float-right">All</a>
              </li>
              <ul className="list-group label">
                <li className="list-group-item bg-dark text-white">
                  <i className="far fa-newspaper" />
                  &nbsp; &nbsp;
                  Laravel Note
                  <small> from</small>
                  <b className="text-primary">Myo Thant Kyaw</b>
                </li>
                <li className="list-group-item bg-dark text-white">
                  <i className="far fa-newspaper" />
                  &nbsp; &nbsp;
                  Vue Note
                  <small> from</small>
                  <b className="text-primary">Myo Thant Kyaw</b>
                </li>
                <li className="list-group-item bg-dark text-white">
                  <i className="far fa-newspaper" />
                  &nbsp; &nbsp;
                  Income Note
                  <small> from</small>
                  <b className="text-primary">Myo Thant Kyaw</b>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
                  <Link to='/note/create' className='btn btn-danger mb-3'>
                    New Note
                  </Link>
                {
                  Pageloader ? <Spinner />
                  :
                  <>
                <div className="row">
                  {
                    note.map((d)=>(
                      <div className="col-md-4" key={d.id}>
                        <div className="card"><a href="detail.html">
                            <div className="card-header " style={{backgroundColor: d.color}}>
                              <h5 className="text-white">{d.title}</h5>
                            </div>
                          </a><div className="card-body"><a href="detail.html">
                            </a><div className="row"><a href="detail.html">
                              </a><div className="col-md-4 text-center"><a href="detail.html">
                                </a><a href className="badge badge-primary">
                                  <i className="fas fa-eye" />
                                </a>
                              </div>
                              <div className="col-md-4 text-center">
                                <a href className="badge badge-warning">
                                  <i className="fas fa-edit" />
                                </a>
                              </div>
                              <div className="col-md-4 text-center">
                                <a href className="badge badge-warning">
                                  <i className="fas fa-share" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                </>
                }
                
              {/* For Load */}
            
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
    
    </Master>
  )
}
