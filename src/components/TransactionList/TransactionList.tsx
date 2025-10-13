import { useTransactionList } from "../../hooks/transactions/useTransactionList";
import { QuickInput } from "./QuickInput/QuickInput";
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

	return (
		<main className="transaction-list">
			<QuickInput categories={[]} />
			<section className="transactions">
				{transactions.map((t) => (
					<TransactionRow key={t.id} transaction={t} />
				))}
			</section>
		</main>
	);
}
