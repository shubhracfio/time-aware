import LogoV1 from '@/components/Switchless/Logo/Logo';
import { Box, Sheet, Typography, Link } from '@mui/joy';
import Image from 'next/image';

const Navbar = () => {
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

		</Sheet>
	);
};

export default function Layout({ children }) {
	return (
		<>
			{/* <Navbar /> */}
			<Box component="main" sx={{ pt: 8, px: 2, margin: 'auto' }}>
				{children}
			</Box>
		</>
	);
}

