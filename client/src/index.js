import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
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
import userUtils from "./utils/userUtils";
import workspaceUtils from "./utils/workspaceUtils";
import ModelEdit from "./pages/workspace/model/ModelEdit";
import Loading from "./components/Loading";

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
			const userID = await userUtils.getID();

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

	const location = useLocation();

	useEffect(() => {
		const pathNameSplit = location.pathname
			.toLowerCase()
			.split("/")
			.filter((word) => word.length > 0);

		const checkUser = async () => {
			const userID = await userUtils.getID();

			if (userID === null) {
				navigate("/login");
				setLoading(false);
				return false;
			} else {
				setLoading(false);
				return true;
			}
		};

		const checkWorkspace = async () => {
			if (pathNameSplit.length >= 2 && pathNameSplit[0] === "workspace") {
				let data = await workspaceUtils.findByName(pathNameSplit[1]);
				if (data === null) {
					workspaceUtils.clear();
					navigate("/workspace");
					setLoading(false);
					return false;
				} else {
					workspaceUtils.init(data);
					setLoading(false);
					return true;
				}
			}
		};

		checkUser().then((status) => {
			if (status) {
				checkWorkspace();
			}
		});
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
		path: "/workspace/:projectName/myapi",
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
		path: "/workspace/:projectName/model/:activeModel",
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
		path: "/workspace/:projectName/addmodel",
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
		path: "/workspace/:projectName/editmodel",
		element: (
			<PrivateRoute>
				<div className="flex">
					<WorkspaceMenu />
					<ModelMenu />
					<ModelEdit />
				</div>
			</PrivateRoute>
		),
	},
	{
		path: "/workspace/:projectName/flows",
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
		path: "/workspace/:projectName/flows/:activeFlow",
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
			<Loading></Loading>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
