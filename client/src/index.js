import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom";

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
import WorkspaceMenu from "./pages/workspace/menu/WorkspaceMenu";
import MyAPI from "./pages/workspace/myapi/MyAPI";
import ModelView from "./pages/workspace/model/ModelView";
import ModelMenu from "./pages/workspace/model/ModelMenu";
import ModelAdd from "./pages/workspace/model/ModelAdd";
import FlowList from "./pages/workspace/flow/FlowList";
import FlowMain from "./pages/workspace/flow/main/FlowMain";

import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducers } from "./reducers/rootReducers";
import { thunk } from "redux-thunk";
import { applyMiddleware, legacy_createStore } from "redux";
import { getUserID } from "./utils/userUtils";

const middlewares = [thunk];
const store = legacy_createStore(
	rootReducers,
	composeWithDevTools(applyMiddleware(...middlewares))
);

const AuthRedirect = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			const userID = await getUserID();

			if (userID) {
				navigate("/workspace");
			}

			setLoading(false);
		};

		checkUser();
	}, [navigate]);

	return loading ? null : <>{children}</>;
};

const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			const userID = await getUserID();

			if (userID === null) {
				navigate("/login");
			}

			setLoading(false);
		};

		checkUser();
	}, [navigate]);

	return loading ? null : <>{children}</>;
};

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
		element: (
			<AuthRedirect>
				<Login />
			</AuthRedirect>
		),
	},
	{
		path: "/register",
		element: (
			<AuthRedirect>
				<RegisterStep1 />
			</AuthRedirect>
		),
	},
	{
		path: "/register/1",
		element: (
			<AuthRedirect>
				<RegisterStep1 />
			</AuthRedirect>
		),
	},
	{
		path: "/register/2",
		element: (
			<AuthRedirect>
				<RegisterStep2 />
			</AuthRedirect>
		),
	},
	//Workspace
	{
		path: "/workspace",
		element: (
			<PrivateRoute>
				<div className="flex">
					<ProjectMenu />
					<Workspace />
				</div>
			</PrivateRoute>
		),
	},
	{
		path: "/workspace/:project/myapi",
		element: (
			<PrivateRoute>
				<div className="flex">
					<WorkspaceMenu />
					<MyAPI />
				</div>
			</PrivateRoute>
		),
	},
	{
		path: "/workspace/:project/model/:model",
		element: (
			<PrivateRoute>
				<div className="flex">
					<WorkspaceMenu />
					<ModelMenu />
					<ModelView />
				</div>
			</PrivateRoute>
		),
	},
	{
		path: "/workspace/:project/addModel",
		element: (
			<PrivateRoute>
				<div className="flex">
					<WorkspaceMenu />
					<ModelMenu />
					<ModelAdd />
				</div>
			</PrivateRoute>
		),
	},
	{
		path: "/workspace/:project/flows",
		element: (
			<PrivateRoute>
				<div className="flex">
					<WorkspaceMenu />
					<FlowList />
				</div>
			</PrivateRoute>
		),
	},
	{
		path: "/workspace/:project/flows/:flow",
		element: (
			<PrivateRoute>
				<div className="flex">
					<WorkspaceMenu />
					<FlowMain />
				</div>
			</PrivateRoute>
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
