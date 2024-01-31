import * as z from 'zod'

export const SignupValidation = z.object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).max(50),
		username: z.string().min(2, { message: 'Username must be at least 2 characters long' }).max(50),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
	})

export const SigninValidation = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
	})

export const ProfileValidation = z.object({
	file: z.custom<File[]>(),
	name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
	username: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters.' }),
	email: z.string().email(),
	bio: z.string(),
})

export const PostValidation = z.object({
        caption: z.string().min(2).max(2200),
        file: z.any(),
        tags: z.string(),	
		location: z.string(),
	})

	export const UpdatePostValidation = z.object({
		postId: z.string(),
		caption: z.string().min(2).max(2200),
		imageId: z.string(),
		imageUrl: z.string(),
		file: z.any(),
		location: z.string().nullable(),
		tags: z.string(),
	})
