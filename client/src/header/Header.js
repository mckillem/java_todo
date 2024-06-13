import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import UserMenu from "./UserMenu";

function Header() {
	let params = useParams();

	function dashboard() {
		// todo: nemá přístup k id přihlášeného uživatele
		// window.location.href="/dashboard/" + params.id;
	}

	return (
		<>
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

		</>
	)
}

export default Header;