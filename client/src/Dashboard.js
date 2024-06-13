import {useEffect} from "react";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

function Dashboard() {
	useEffect(() => {
		console.log("dashboard is mounted");
	}, []);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'left',
					'& > *': {
						m: 1,
					}
				}}
			>
				<Stack>
				</Stack>
			</Box>
		</>
	)
}

export default Dashboard;