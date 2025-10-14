import { QuickInput } from "./QuickInput/QuickInput";
import { TransactionRow } from "./TransactionRow/TransactionRow";
import { useInitApp } from "../../hooks/useInitApp";

export function TransactionList() {
	const { transactions, categories, users, isError, isLoading, error } =
		useInitApp();

	if (isError && error) return <h1>{error}</h1>;
	if (isLoading || !transactions || !categories || !users)
		return <h1>Loading...</h1>;

	return (
		<main className="transaction-list">
			<h1>{`You are ${users[0].name}`}</h1>
			<QuickInput categories={categories} user={users[0]} />
			<section className="transactions">
				{transactions.map((t) => (
					<TransactionRow key={t.id} transaction={t} />
				))}
			</section>
		</main>
	);
}
