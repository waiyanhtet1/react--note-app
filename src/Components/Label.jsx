import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import LabelContext from '../Context/LabelContext'
import Spinner from './Spinner'
export default function Label() {

    const {label,loader,selected,setSelected} = useContext(LabelContext)
    const {push} = useHistory()
    const {pathname} = useLocation()
    
    const renderAll = () =>{
        setSelected(null)
        push('/')
    }
    return (
        <div>
            <div className="card-body">
                {
                    loader ?  <Spinner />
                    :
                    <>
                        <li className="list-group-item bg-bg text-white">
                        Label
                        </li>
                        <ul className="list-group label">

                        
                          <li className={`list-group-item text-white ${pathname==='/'?'bg-danger':'bg-dark'}`} onClick={()=>renderAll()} >
                          <span className="fas fa-tags text-white text-small" />
                          &nbsp; &nbsp;
                          All
                          </li>
                          {
                              label.data.map(d=>(
                                  <Link key={d.id} to={`/${d.slug}/note`}>
                                    <li className={`list-group-item text-white ${d.id===selected ?'bg-danger':'bg-dark'}`} onClick={()=>setSelected(d.id)}>
                                  <span className="fas fa-tags text-white text-small" />
                                  &nbsp; &nbsp;
                                  {d.name} 
                                  <span className="badge badge-primary float-right">{d.note_count}</span>
                                  </li>
                                  </Link>
                              ))
                          }
                        </ul>       
                    </>
                }
                  
              </div>
        </div>
      )
}
