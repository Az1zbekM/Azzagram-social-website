// import { getCurrentUser } from '@/lib/appwrite/api';
// import { IUser } from '@/types';
// import { createContext , useState , useEffect , useContext } from 'react'
// import { useNavigate } from 'react-router-dom';

// export const INITIAL_USER  = {
//     id: '',
//     name: '',
//     email: '',
//     username : '',
//     password : '',
//     imageUrl: '',
//     bio: '',
// }

// const INITIAL_STATE = {
//     user: INITIAL_USER,
//     isLoading: false,
//     isAuthinticated: false,
//     setUser: () => {},
//     setIsAuthinticated: () => {},
//     checkAuthUser: async () => false as boolean,
// }

// const AuthContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {

//   const [user, setUser] = useState<IUser>(INITIAL_USER);
//   const [isLoading, setIsLoadin] = useState<boolean>(false);
//   const [isAuthinticated, setIsAuthinticated] = useState<boolean>(false);

//   const navigate = useNavigate();
    
//   const checkAuthUser = async () => {
//       try {
//             const currentAccount = await getCurrentUser();

//             if(currentAccount) {
//                 setUser({
//                     id: currentAccount.$id,
//                     name: currentAccount.name,
//                     email: currentAccount.email,
//                     username: currentAccount.username,
//                     imageUrl: currentAccount.imgUrl,
//                     bio: currentAccount.bio,
//                 })
//                 setIsAuthinticated(true);
//                 return true;
//             }
//                 return false     
//       } catch (error) {
//             console.log(error)
//             return false
//       } finally {
//           setIsLoadin(false)
//       }
//   }

//     useEffect(() => {
//         if(
//             localStorage.getItem('cookieFallback') === '[]' ||
//              localStorage.getItem('cookieFallback') === null
//         ) navigate('/sign-in');

//         checkAuthUser();
//     }, [])

//     const value ={
//          user,
//           setUser,
//            isLoading,
//             setIsLoadin,
//             isAuthinticated,
//              setIsAuthinticated,
//              checkAuthUser
//     }
//   return (
//     <AuthProvider value={value}>
//       {children}
//     </AuthProvider>
//   )
// }

// export default AuthProvider;

// export const useAuth = () => useContext(AuthContext)

//////////////////////////////////////////////////////////////////////////////

import { getCurrentUser } from '@/lib/appwrite/api'
import { IUser } from '@/types'
import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { boolean } from 'zod'




export const INITIAL_USER = {
	id: '',
	name: '',
	email: '',
	username: '',
	password: '',
	imageUrl: '',
	bio: '',

}

const INITIAL_STATE = {
	user: INITIAL_USER,
	isLoading: false,
	isAuthinticated: false,
	setUser: () => {},
	setIsAuthinticated: () => {},
	checkAuthUser: async () => false as boolean,

}

const AuthContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser>(INITIAL_USER)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isAuthinticated, setIsAuthinticated] = useState<boolean>(false)

	const navigate = useNavigate()

	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentUser()

			if (currentAccount) {
				setUser({
					id: currentAccount.$id,
					name: currentAccount.name,
					email: currentAccount.email,
                    password: currentAccount.password,
					username: currentAccount.username,
					imageUrl: currentAccount.imgUrl,
					bio: currentAccount.bio,
				})
				setIsAuthinticated(true)
				return true
			}
			return false
		} catch (error) {
			console.log(error)
			return false
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		
        if (
			localStorage.getItem('cookieFallback') === '[]' ||
			localStorage.getItem('cookieFallback') === null
		)
			navigate('/sign-in')

		checkAuthUser()
	}, [])





	const value = {
		user: user,
        setUser: () => void {},
		isLoading:  isLoading,
		setIsLoading: () => void {},
		isAuthinticated: isAuthinticated,
		setIsAuthinticated: () => void {},
		checkAuthUser: async () => true as boolean,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext)



