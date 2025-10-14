import { QuickInput } from "./QuickInput/QuickInput";
import { TransactionRow } from "./TransactionRow/TransactionRow";
import { useInitApp } from "../../hooks/useInitApp";

export function TransactionList() {
	const { transactions, categories, isError, isLoading, error } = useInitApp();

	if (isError && error) return <h1>{error}</h1>;
	if (isLoading || !transactions || !categories) return <h1>Loading...</h1>;

	return (
		<main className="transaction-list">
			<QuickInput categories={categories} />
			<section className="transactions">
				{transactions.map((t) => (
					<TransactionRow key={t.id} transaction={t} />
				))}
			</section>
		</main>
	);
}
