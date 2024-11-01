'use client'
import { useState, FormEvent } from 'react';
import { Typography, Box, Link, Sheet } from '@mui/joy';
import { InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@/components/GoogleIcon';
import * as React from 'react';
import FormHelperText from '@mui/joy/FormHelperText';
import Checkbox from '@mui/joy/Checkbox';

// import PasswordMeterInput from '@/components/PasswordMeterInput';



export default function Signup({ data }
) {
	const [name, setName] = useState(''); //👈 Add Name state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (<>
		<Box
			sx={{
				maxWidth: 400, // Set max width for the form
				m: 'auto',
				p: 3, // Padding inside the form
				border: '1px solid rgba(34, 36, 38, 0.15)', // Border styling
				borderRadius: 'sm', // Border radius for rounded corners
			}}
		>
			<div>
				<Typography level="h2">
					Signup
				</Typography>

				<Box mb={3} />
				<form onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<FormControl>
							<Input name="name" startDecorator={<PersonIcon />} placeholder="Name" value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{/* {nameNull && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    Name is required

                                </FormHelperText>
                            )} */}
						</FormControl>
						<FormControl
						// error={emailNull || emailExists}
						>
							<Input
								startDecorator={<EmailIcon />}
								placeholder="Email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{/* {emailNull && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    Email is required

                                </FormHelperText>)
                            } */}
							{/* {emailExists && (
                                <FormHelperText>
                                    <InfoOutlined />
                                    This email already exists

                                </FormHelperText>)
                            } */}
						</FormControl>
						{/* <FormControl>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  startDecorator={<LockIcon />}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endDecorator={
                    <IconButton onClick={handleShowPasswordChange}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </FormControl> */}
						{/* <PasswordMeterInput password={password} setPassword={setPassword} passwordError={true} /> */}
						{/* <FormControl size="sm" sx={{ width: 400 }}>
                <Checkbox
                  label={
                    <React.Fragment>
                      I have read and agree to the{' '}
                      <Typography fontWeight="md">terms and conditions</Typography>.
                    </React.Fragment>
                  }
                />
                <FormHelperText>
                  <Typography level="body-sm">
                    Read our <Link target='_blank' href="https://cashflowy.io/terms-and-conditions/">terms and conditions</Link>.
                  </Typography>
                </FormHelperText>
              </FormControl> */}
						<Button type="submit">Sign Up</Button>
						<Box textAlign="center">
							<Divider>Or</Divider>
						</Box>
						<Button
							startDecorator={<GoogleIcon />}
							fullWidth
							variant="soft"
							color='neutral'
							component='a'
							href='/auth/google'

						>
							Continue with Google
						</Button>
						<Box textAlign="center">
							<Typography level="body-sm">
								<Link href="/login">Already have an account? Login</Link>
							</Typography>
						</Box>
					</Stack>
				</form>
			</div>
		</Box>
	</>
	);
}