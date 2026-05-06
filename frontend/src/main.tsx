import { createRoot } from 'react-dom/client'
import {Suspense, lazy } from "react"
import './index.css'
//import App from './App.tsx'
import Loading from './components/Loading.tsx'

const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
  <>
  <Suspense fallback={<Loading/>}>
    <App />
  </Suspense>
  </>,
)
