import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/layout/Header";
import Home from "./pages/home/Home";
import Footer from "./components/layout/Footer";
import NotFound404 from "./pages/NotFound404";
import BottomHome from "./pages/home/BottomHome";
import Login from "./pages/home/login/Login";
import RegisterStep1 from "./pages/home/register/RegisterStep1";
import RegisterStep2 from "./pages/home/register/RegisterStep2";
import Document from "./pages/home/document/Document";
import Workspace from "./pages/workspace/Workspace";
import ProjectMenu from "./pages/workspace/menu/ProjectMenu";
import WorkSpaceMenu from "./pages/workspace/menu/WorkSpaceMenu";
import MyAPI from "./pages/workspace/myapi/MyAPI";
import ModelView from "./pages/workspace/model/ModelView";
import ModelMenu from "./pages/workspace/model/ModelMenu";

const router = createBrowserRouter([
	//Home
	{
		path: "/",
		element: (
			<div>
				<div className="main-background">
					<Header bg={false} />
					<Home />
				</div>
				<BottomHome />
				<Footer />
			</div>
		),
	},
	{
		path: "/home",
		element: (
			<div>
				<div className="main-background">
					<Header bg={false} />
					<Home />
				</div>
				<BottomHome />
				<Footer />
			</div>
		),
	},
	{
		path: "/document",
		element: (
			<div>
				<Header selected={1} />
				<Document />
			</div>
		),
	},
	//Login & Register
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <RegisterStep1 />,
	},
	{
		path: "/register/1",
		element: <RegisterStep1 />,
	},
	{
		path: "/register/2",
		element: <RegisterStep2 />,
	},
	//Workspace
	{
		path: "/workspace",
		element: (
			<div className="flex">
				<ProjectMenu />
				<Workspace />
			</div>
		),
	},
	{
		path: "/workspace/:project/myapi",
		element: (
			<div className="flex">
				<WorkSpaceMenu />
				<MyAPI />
			</div>
		),
	},
	{
		path: "/workspace/:project/models/:model",
		element: (
			<div className="flex">
				<WorkSpaceMenu />
				<ModelMenu />
				<ModelView />
			</div>
		),
	},
	{
		path: "*",
		element: (
			<div>
				<Header />
				<NotFound404 />
				<Footer />
			</div>
		),
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();