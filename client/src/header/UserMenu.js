import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import {MenuList} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {deleteLocaleStorage} from "../localStorage/LocalStorage";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import useLogout from "../hooks/useLogout";

export default function UserMenu() {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const navigate = useNavigate();
	const logout = useLogout();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	// const handleLogout = () => {
	//   	deleteLocaleStorage();
	// 	//   todo: spravit
	// 	navigate("/login");
	// }


	const handleSignOut = async () => {
		await logout();
		navigate('/login');
	}

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<Stack direction="row" spacing={2}>
			<div>
				<Button
					ref={anchorRef}
					id="composition-button"
					aria-controls={open ? 'composition-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					<AccountCircleIcon/>
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					placement="bottom-start"
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom-start' ? 'left top' : 'left bottom',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="composition-menu"
										aria-labelledby="composition-button"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem onClick={handleClose}>Profile</MenuItem>
										<MenuItem onClick={handleClose}>My account</MenuItem>
										<MenuItem onClick={handleSignOut}>Logout</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</Stack>
	);
}
