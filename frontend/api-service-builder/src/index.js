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

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div>
				<div className="main-background">
					<Header />
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
					<Header />
					<Home />
				</div>
				<BottomHome />
				<Footer />
			</div>
		),
	},
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
