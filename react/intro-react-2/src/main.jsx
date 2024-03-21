import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelloWorldApp } from './HelloWorldApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelloWorldApp user = {{name:'Agustin', lastName:'Escalante'}}
    id = {'asda'}
    book = {{name: 'Book name example', date : 'xample'}}/> 
  </React.StrictMode>
)
