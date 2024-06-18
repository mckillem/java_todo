import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import UserMenu from "./UserMenu";

function Header() {
	function dashboard() {
		// todo: nemá přístup k id přihlášeného uživatele
		// window.location.href="/dashboard/" + params.id;
	}

	return (
		<header>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					'& > *': {
						m: 1,
					}
				}}
			>
				{/*todo: nepřišel jsem na to, jak zařídit, aby byla ikona vždy v pravo*/}
				<Stack direction="row" spacing={200}>
					<Button onClick={dashboard}>Nástěnka</Button>
					<UserMenu/>
				</Stack>
			</Box>

		</header>
	)
}

export default Header;