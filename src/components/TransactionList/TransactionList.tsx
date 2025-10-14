import { QuickInput } from "./QuickInput/QuickInput";
import { TransactionRow } from "./TransactionRow/TransactionRow";
import { useInitApp } from "../../hooks/useInitApp";
import { useEffect, useState } from "react";
import { Transaction } from "../../types/transaction";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../../api/transactions/createTransaction";
import { FormValues } from "../../types/form";

export function TransactionList() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [activeUser, setActiveUser] = useState({ name: "", id: 0 });
	const {
		transactions: fetchedTransactions,
		categories,
		users,
		isError,
		isLoading,
		error,
	} = useInitApp();
	const { mutate } = useMutation({
		mutationFn: createTransaction,
		onSuccess: ({ id }) => {
			const successfulTransaction = transactions.find((t) => t.id === 0);
			if (!successfulTransaction) return;

			setTransactions((prev) => [
				{ ...successfulTransaction, id, status: "completed" },
				...prev.filter((t) => t.id !== 0),
			]);
		},
	});

	useEffect(() => {
		if (!fetchedTransactions) return;

		setTransactions(fetchedTransactions);
	}, [fetchedTransactions]);

	useEffect(() => {
		if (!users) return;

		setActiveUser(users[0]);
	}, [users]);

	if (isError && error) return <h1>{error}</h1>;
	if (isLoading || !transactions || !categories || !users)
		return <h1>Loading...</h1>;

	function addTransaction({ description, amount, category }: FormValues) {
		if (!activeUser || !categories) return;

		const categoryId = categories.find((c) => c.name === category)
			?.id as number;
		setTransactions((prev) => [
			...prev,
			{
				id: 0,
				description,
				amount: parseInt(amount, 10),
				category,
				user: activeUser.name,
				date: new Date(),
				status: "loading",
			},
		]);
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
			<QuickInput categories={categories} addTransaction={addTransaction} />
			<section className="transactions">
				{transactions.map((t) => (
					<TransactionRow key={t.id} transaction={t} />
				))}
			</section>
		</main>
	);
}
