import "./App.css";
import ClientPage from "./components/ClientPage";
import WelcomePage from "./components/WelcomePage";
import MainLayout from "./layout/mainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
function App() {
	return (
		<Router>
			<MainLayout>
			<Routes>
				<Route path="/" element={<WelcomePage/>} />
			<Route path="/clientes" element={<ClientPage />} /> 
			</Routes>
			</MainLayout>
		</Router>
		
	);
}

export default App;
