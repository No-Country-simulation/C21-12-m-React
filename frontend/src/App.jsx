import "./App.css";
import { MainLayout } from "./layout/mainLayout";
import { MainContent } from "./components/mainContent";
import { CustomerTable } from "./components/customerTable";




function App() {
	return (
		<>
			<MainLayout>
				<MainContent>
					<CustomerTable/>
				</MainContent>
			</MainLayout>
		</>
	);
}

export default App;
