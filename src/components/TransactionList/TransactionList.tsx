import { useTransactionList } from "../../hooks/transactions/useTransactionList";
import { TransactionRow } from "./TransactionRow/TransactionRow";

export function TransactionList() {
	const {
		data: transactions,
		isLoading,
		isError,
		error,
	} = useTransactionList();

	if (isError) return <h1>{error.name}</h1>;
	if (isLoading || !transactions) return <h1>Loading...</h1>;

	return transactions.map((t) => <TransactionRow key={t.id} transaction={t} />);
}
