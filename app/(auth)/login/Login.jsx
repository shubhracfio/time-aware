'use client'
import { useState } from 'react';
import { Typography, Box, Link, FormHelperText, Snackbar, Alert } from '@mui/joy';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@/components/GoogleIcon';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginCredentials, loginWithGoogle } from './action';


export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [googleBtnLoading, setGoogleBtnLoading] = useState(false);

	const handleShowPasswordChange = () => {
		setShowPassword((prev) => !prev);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		
		const formData = new FormData(e.currentTarget);
		try {
			const res = await loginCredentials({
					email: formData.get('email'),
					password: formData.get('password'),
				})

			if(res?.status == 'success'){
				window.location.reload();
				return null
			}
			setOpenSnackbar(true);
			setLoading(false);
			
		} catch (error) {
			// console.error('Login error:', error);
			setLoading(false);
			setOpenSnackbar(true);
		} finally {
			// setLoading(false);
		}
	};
	const handleGoogleLogin = async () => {
		setGoogleBtnLoading(true);
		try {
			await loginWithGoogle();
		} catch (error) {
			console.error('Google login error:', error);
			setOpenSnackbar(true);
			setGoogleBtnLoading(false);
		}
	}

	return (
		<>
			<Box
				sx={{
					maxWidth: 400, // Set max width for the form
					m: `auto`,
					p: 3, // Padding inside the form
					border: '1px solid rgba(34, 36, 38, 0.15)', // Border styling
					borderRadius: 'sm', // Border radius for rounded corners
				}}
			>
				<div>
					<Typography level="h2">Login</Typography>
					<Box mb={3} />
					<form 
					onSubmit={handleSubmit}
					action='/login' method='post'
					>
						<Stack spacing={3} >
							<FormControl disabled={loading|| googleBtnLoading}>
								<Input startDecorator={<EmailIcon />} placeholder="Email" name="email" type='email' required />
							</FormControl>

							<FormControl disabled={loading|| googleBtnLoading}>
								<Input
									type={showPassword ? 'text' : 'password'}
									startDecorator={<LockIcon />}
									placeholder="Password"
									name="password"
									required
									endDecorator={
										<IconButton onClick={handleShowPasswordChange}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									}
								/>
								<Box textAlign="right" paddingTop='5px'>
									<Typography level="body-sm">
										<Link href="/forgot">Forgot your password?</Link>
									</Typography>
								</Box>
							</FormControl>
							<Button type="submit" loading={loading} disabled={googleBtnLoading}>Sign In</Button>
							<Box textAlign="center">
								<Divider>OR</Divider>
							</Box>

							<Button
								disabled={loading}
								loading={googleBtnLoading}
								startDecorator={
									<GoogleIcon />
								}
								component='a'
								fullWidth
								variant="soft"
								color='neutral'
								// href='/auth/google'
								onClick={()=>{
									handleGoogleLogin()
								}}

							>
								Continue with Google
							</Button>

							<Box textAlign="center">
								<Typography level="body-sm" >
									<Link href="/signup">Create free account</Link>
								</Typography>
							</Box>
						</Stack>
					</form>
				</div>
				<Snackbar
					open={openSnackbar}
					autoHideDuration={3000}
					color='danger'
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					variant='soft'
				>

					Invalid login credentials. Please try again.
				</Snackbar>
			</Box>
		</>

	);
}
