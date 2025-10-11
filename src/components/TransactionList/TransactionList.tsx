import { useTransactionList } from "../../hooks/transactions/useTransactionList";

export function TransactionList() {
	const {
		data: transactions,
		isLoading,
		isError,
		error,
	} = useTransactionList();

	if (isError) return <h1>{error.name}</h1>;
	if (isLoading || !transactions) return <h1>Loading...</h1>;

	return transactions.map((t) => <h2 key={t.id}>{t.description}</h2>);
}
