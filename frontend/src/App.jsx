import "./App.css";
import { MainLayout } from "./layout/mainLayout";
import { MainContent } from "./components/mainContent";
import ClientPage from "./components/ClientPage";
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 


function App() {
	return (
		<Router>
			<Routes>
			<Route path="/" element={<WelcomePage/>} />
			<Route path="/clientes" element={<ClientPage />} /> 
			</Routes>
			<MainLayout>
				<MainContent>
					<ClientPage />
				</MainContent>
			</MainLayout>
		</Router>
		
	);
}

export default App;
