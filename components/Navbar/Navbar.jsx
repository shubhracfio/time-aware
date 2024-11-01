'use client';
import LogoV1 from '@/components/Switchless/Logo/Logo';
import { Box, Sheet, Typography, Link } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { redirect, usePathname } from 'next/navigation';

export default function Navbar({user,signOut}){
    const path = usePathname();
    const sectionPath = path.split('/').splice(0,4).join('/');

    if(!user && !['login','api/auth/'].find(e => sectionPath.includes(e))){
        redirect('/login');
    } else if(user && ['login','api/auth/','signup','forgot'].find(e => sectionPath.includes(e))){
        redirect('/')
    }

	return (
		<Sheet
			component="nav"
			sx={{
				p: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				boxShadow: 'sm',
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1000,
				bgcolor: 'background.surface',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<LogoV1 offering='Timeaware' />
			</Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {user && (
            <>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src={user?.user_metadata?.avatar_url}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                {/* <pre>{JSON.stringify(user,null,2)}</pre> */}
                <Typography level="title-sm">{user?.user_metadata?.full_name} </Typography>
                <Typography level="body-xs">{user?.email}</Typography>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    component='form'
                    action={signOut}
                >
                <IconButton
                    size="sm"
                    variant="soft"
                    color="neutral"
                    type="submit"
                > 
                <LogoutRoundedIcon />
                </IconButton>
                </Stack>
            </>
            )}
            </Box>

		</Sheet>
	);
};