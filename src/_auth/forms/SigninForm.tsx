
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { SigninValidation } from '@/lib/validation'
import { z } from 'zod'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import {
	useSigninAccount,
} from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const SigninForm = () => {
	const { toast } = useToast()
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
	const navigate = useNavigate()


	const { mutateAsync: signInAccount } =
		useSigninAccount()

	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof SigninValidation>) {

		const session = await signInAccount({
			email: values.email,
			password: values.password,
		})

		if (!session) {
			return toast({
				title: 'Sign-in Failed',
				description: 'Something went wrong',
			})
		}

		const isLoggedIn = await checkAuthUser()

		if (isLoggedIn) {
			form.reset()
			navigate('/root')
		} else {
			return toast({
				title: 'Sign-up Failed, please try again',
				description: 'Something went wrong',
			})
		}

	}

	return (
		<Form {...form}>
			<div className='sm:w-420 flex-center flex-col'>
				<img src='/assets/images/logo.svg' alt='logo' />
				<h2 className='h3-bold md:h2-bold sm:pt-4'>Log in, my bro</h2>
				<p className='text-light-3  small-medium md:base-regular mt-2 '>
					Wellcome back, you have been missed
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4 w-full mt-4'
				>
					<FormField
						control={form.control}
						name='email' // Change this to 'email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type='email' className='shad-input' placeholder='Enter your email'  {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password' // Change this to 'password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type='password' className='shad-input' placeholder='Enter your password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className='shad-button_primary' type='submit'>
						{isUserLoading ? (
							<div className='flex-center gap-2'>
								<Loader /> Loading...
							</div>
						) : (
							'Sign in'
						)}
					</Button>

					<p className='text-small-regular text-light-3  mt-2 text-center'>
						Don't have an account?
						<Link
							to='/sign-up'
							className=' text-primary-500 hover:underline ml-2 hover:text-primary-600'
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	)
}

export default SigninForm
