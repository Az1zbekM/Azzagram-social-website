import {Routes, Route} from 'react-router-dom';
import './globals.css'
import SigninFrom from '../src/_auth/forms/SigninForm';
import SignupFrom from '../src/_auth/forms/SignupForm';
import AuthLayout from './_auth/forms/AuthLayout';
import RootLayout from './_root/pages/RootLayout';
import { Home } from './_root/pages';
//toast
import { Toaster } from '@/components/ui/toaster'



const App = () => {
  return (
      <main className="flex h-screen">
        <Routes>
          <Route element={<AuthLayout/>}>
            {/* public routes */}
            <Route path="sign-in" element={<SigninFrom />}/>
            <Route path="sign-up" element={<SignupFrom />}/>
          </Route>
            {/* protected routes */}
           <Route path="root" element={<RootLayout/>}/>

            <Route  index element={<Home/>}/>
        </Routes>
        <Toaster/>
      </main>
  )
}

export default App
