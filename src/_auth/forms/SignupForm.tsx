
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { SignupValidation } from '@/lib/validation';
import { z } from 'zod';
import Loader from '@/components/shared/Loader';
import { Link } from 'react-router-dom';





const SignupForm = () => {
  const isLoading = false;


  // 1. Define your form.
	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
      name: '',
			username: '',
      email: '',
      password: '',
		},
	})

	// 2. Define a submit handler.
async	function onSubmit(values: z.infer<typeof SignupValidation>) {
		// create user account
    const response = await createUserAccount(values);
    
		
	}

	return (
		<Form {...form}>
			<div className='sm:w-420 flex-center flex-col'>
				<img src='/assets/images/logo.svg' alt='logo' />
				<h2 className='h3-bold md:h2-bold sm:pt-12'>
					Create a new account bro
				</h2>
				<p className='text-light-3 small-medium md:base-regular mt-2 '>
					To use Azzagram, please fill details below
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4 w-full mt-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type='text' className='shad-input' {...field} />
								</FormControl>
								{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type='text' className='shad-input' {...field} />
								</FormControl>
								{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type='email' className='shad-input' {...field} />
								</FormControl>
								{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type='password' className='shad-input' {...field} />
								</FormControl>
								{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className='shad-button_primary'  type='submit'>
                {isLoading ? (<div className="flex-center gap-2">
                  <Loader />  Loading...
                  </div>) : 'Sign up'}
          </Button>

          <p className='text-small-regular text-light-3 mt-2 text-center'>
            Already have an account? 
            <Link to="/sign-in" className='text-primary hover:underline ml-2 hover:text-red'>Log in</Link>
          </p>
				</form>
			</div>
		</Form>
	)
}

export default SignupForm;
