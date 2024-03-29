import {Routes, Route} from 'react-router-dom';
import SigninFrom from '../src/_auth/forms/SigninForm';
import SignupFrom from '../src/_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Home, PostDetails, Profiles, ChatsRoom, Saved, UpdateProfile, AllChats } from './_root/pages';
//toast
import { Toaster } from '@/components/ui/toaster'
import General from './components/shared/chat/General';
import Primary from './components/shared/chat/Primary';
import Request from './components/shared/chat/Request';
import Messaging from './components/shared/chat/Messaging';
import Conversation from './components/shared/chat/Conversation';

import './globals.css'

const App = () => {
  return (
		<main className='flex h-screen'>
			<Routes>
				{/* auth routes */}
				<Route element={<AuthLayout />}>
					{/* public routes */}
					<Route path='sign-in' element={<SigninFrom />} />
					<Route path='sign-up' element={<SignupFrom />} />
				</Route>
				{/* protected routes */}
				<Route element={<RootLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/saved' element={<Saved />} />
					<Route path='/all-users' element={<AllUsers />} />
					<Route path='/create-post' element={<CreatePost />} />
					<Route path='/update-post/:id' element={<EditPost />} />
					<Route path='/posts/:id' element={<PostDetails />} />
					<Route path='/profile/:id/*' element={<Profiles />} />
					<Route path='/update-profile/:id' element={<UpdateProfile />} />
					<Route path='/chats' element={<ChatsRoom />} />
					<Route path='/all-chats' element={<AllChats />}>
						<Route path='/all-chats' element={<Primary />} />
						<Route path='/all-chats/general' element={<General />} />
						<Route path='/all-chats/requests' element={<Request />} />
						<Route path='/all-chats/direct' element={<Messaging />} />
						<Route path='/all-chats/direct' element={<Conversation />} />
					</Route>
				</Route>
			</Routes>
			<Toaster />
		</main>
	)
}

export default App
