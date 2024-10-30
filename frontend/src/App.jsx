import "./App.css";
import { MainLayout } from "./layout/mainLayout";
import { MainContent } from "./components/mainContent";
/* import ClientPage from "./components/ClientPage"; */
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";

function App() {
	return (
		<Router>
			<MainLayout>
				<MainContent>
					<Routes>
						<Route path="/" element={<WelcomePage />} />
						{/* <Route path="/clientes" element={<ClientPage />} /> */}
						<Route path="/dashboard" element={<Dashboard/>} />
					</Routes>
				</MainContent>
			</MainLayout>
		</Router>
	);
}

export default App;
