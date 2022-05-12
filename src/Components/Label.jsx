import React from 'react'
import Spinner from './Spinner'

export default function Label() {
  return (
    <div>
        <div className="card-body">
            <Spinner />
            <li className="list-group-item bg-bg text-white">
              Label
            </li>
            <ul className="list-group label">
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Laravel Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Vue JS Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Vue JS Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Vue JS Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <a href className="float-right">View All</a>
              </li>
            </ul>
          </div>
    </div>
  )
}
