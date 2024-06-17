import React from 'react';
import Header from "./header/Header";
import ListOfProjects from "./sidebar/ListOfProjects";
import {Outlet} from "react-router-dom";

const Layout = () => {
	return (
		<div className="App">
			{/*todo: header jsem upravil, držet se html tagů. Co bude main?*/}
			<Header/>
			<ListOfProjects/>
			<Outlet/>
		</div>
	);
};

export default Layout;