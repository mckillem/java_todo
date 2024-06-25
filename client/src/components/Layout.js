import React from 'react';
import Header from "../header/Header";
import ListOfProjects from "../sidebar/ListOfProjects";
import {Outlet} from "react-router-dom";

const Layout = () => {
	return (
		<main>
			{/*todo: header jsem upravil, držet se html tagů. Co bude main?*/}
			<Header/>
			<ListOfProjects/>
			<Outlet/>
		</main>
	);
};

export default Layout;