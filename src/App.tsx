import {Routes, Route} from 'react-router-dom';
import './globals.css'
import SigninFrom from '../src/_auth/forms/SigninForm';
import SignupFrom from '../src/_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Home, PostDetails, Profiles, Room, Saved, UpdateProfile } from './_root/pages';
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
          <Route element={<RootLayout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:id' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profiles/>}/>
            <Route path='/update-profile/:id' element={<UpdateProfile/>}/> 
            <Route path='/chats' element={<Room/>}/>
          </Route> 
         
        </Routes>
        <Toaster/>
      </main>
  )
}

export default App
