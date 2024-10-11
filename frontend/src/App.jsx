import "./App.css";
import ClientPage from "./components/ClientPage";
import MainLayout from "./layout/mainLayout";

function App() {
	return (
		<>
			<MainLayout>
				<main>
				<ClientPage></ClientPage>				</main>
			</MainLayout>
		</>
	);
}

export default App;
