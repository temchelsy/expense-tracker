import { useState } from 'react'
import { Navigate, Outlet, Route, Routes} from 'react-router-dom'
import signIn from './pages/auth/sign-in'
import signUp from './pages/auth/sign-up'
import setting from './pages/setting'
import dashboard from './pages/dashboard'
import transaction from './pages/transaction'
import accountPages from './pages/accountPage'



function App() {
  const [count, setCount] = useState(0)

  return  <main>
    <div>
      <Routes>
         <Route path='/sign-in' element={<signIn />} />
         <Route path='/sign-up' element={<signUp />} />
      </Routes>
    </div>
  </main>
  
}

export default App 
