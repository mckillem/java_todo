import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import MenuNavbar from "./navbar/MenuNavbar";

function Navbar() {
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
				<Stack direction="row" spacing={100}>
					<Button onClick={dashboard}>Nástěnka</Button>
					<MenuNavbar/>
				</Stack>
			</Box>

		</>
	)
}

export default Navbar;