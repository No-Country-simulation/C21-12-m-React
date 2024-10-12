import "./App.css";
import { MainLayout } from "./layout/mainLayout";
import { MainContent } from "./components/mainContent";
import { CustomerTable } from "./components/customerTable";
import ClientPage from "./components/ClientPage";


function App() {
	return (
		<>
			<MainLayout>
				<MainContent>
					<ClientPage />
					<CustomerTable />
				</MainContent>
			</MainLayout>
		</>
	);
}

export default App;
