import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId='554042409823-qeskck846p2lmj5p8m7vf1rv2pfagi74.apps.googleusercontent.com'>
    <Provider store={store}>
    <App />
  </Provider>
    </GoogleOAuthProvider>
   
   
    </BrowserRouter>
  </StrictMode>,
)
