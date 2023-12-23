import {
    useQuery, 
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api"
import { INewUser } from "@/types"

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(),
    })
}

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn : (user: INewUser) => createUserAccount(user)
    })
} // For creating user

export const useSigninAccount = () => {
	return useMutation({
		mutationFn: 
        (
            user: {
                email: string; 
                password: string
            }
            ) => signInAccount(user),
	})
} // For signing in 

export const useSignOutAccount = () => {
	return useMutation({
		mutationFn: signOutAccount,
	})
} // For signing out

function getUser(): any {
    throw new Error("Function not implemented.")
}

