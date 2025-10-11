import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionList } from "./components/TransactionList/TransactionList";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TransactionList />
		</QueryClientProvider>
	);
}

export default App;
