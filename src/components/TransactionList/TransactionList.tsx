import { QuickInput } from "./QuickInput/QuickInput";
import { TransactionRow } from "./TransactionRow/TransactionRow";
import { useInitApp } from "../../hooks/useInitApp";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../../api/transactions/createTransaction";
import type { FormValues } from "../../types/form";
import { FilterMenu } from "./FilterMenu/FilterMenu";
import { MonthlyBalance } from "./MonthlyBalance/MonthlyBalance";

export function TransactionList() {
	const [activeUser, setActiveUser] = useState({ name: "", id: 0 });
	const [activeCategory, setActiveCategory] = useState(0);
	const [search, setSearch] = useState("");
	const {
		transactions,
		refetchTransactions,
		categories,
		users,
		isError,
		isLoading,
		error,
	} = useInitApp();

	const { mutate } = useMutation({
		mutationFn: createTransaction,
		onSuccess: refetchTransactions,
	});

	useEffect(() => {
		if (!users) return;

		setActiveUser(users[0]);
	}, [users]);

	if (isError && error) return <h1>{error}</h1>;
	if (isLoading || !transactions || !categories || !users)
		return <h1>Loading...</h1>;

	function addTransaction({ description, amount, categoryId }: FormValues) {
		if (!activeUser || !categories) return;

		mutate({
			description,
			amount,
			categoryId,
			userId: activeUser.id,
		});
	}

	return (
		<main className="transaction-list">
			<h1>{`You are ${users[0].name}`}</h1>
			<MonthlyBalance transactions={transactions} />
			<FilterMenu
				categories={categories}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
				search={search}
				setSearch={setSearch}
			/>
			<QuickInput categories={categories} addTransaction={addTransaction} />
			<section className="transactions">
				{transactions
					.filter(
						(t) => activeCategory === 0 || t.categoryId === activeCategory,
					)
					.filter((t) => t.description.includes(search))
					.map((t) => (
						<TransactionRow key={t.id} transaction={t} />
					))}
			</section>
		</main>
	);
}
