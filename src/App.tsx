import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionList } from "./components/TransactionList/TransactionList";
import { useEffect } from "react";
import { changeThemeTo, currentTheme } from "./lib/theme";

const queryClient = new QueryClient();

function App() {
	useEffect(() => {
		changeThemeTo(currentTheme());
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<TransactionList />
		</QueryClientProvider>
	);
}

export default App;
