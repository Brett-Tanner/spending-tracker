import { QuickInput } from "./QuickInput/QuickInput";
import { TransactionRow } from "./TransactionRow/TransactionRow";
import { useInitApp } from "../../hooks/useInitApp";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../../api/transactions/createTransaction";
import type { FormValues } from "../../types/form";
import { FilterMenu } from "./FilterMenu/FilterMenu";
import { MonthlyBalance } from "./MonthlyBalance/MonthlyBalance";
import { BubbleMenu } from "../BubbleMenu/BubbleMenu";
import { TransactionDialog } from "../shared/TransactionDialog/TransactionDialog";
import type { Transaction } from "../../types/transaction";
import type { User } from "../../types/user";

export function TransactionList() {
	const [activeUser, setActiveUser] = useState<User>({ name: "", id: 0 });
	const [activeTransaction, setActiveTransaction] = useState<
		Transaction | undefined
	>(undefined);
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
	const dialogRef = useRef<HTMLDialogElement>(null);

	const { mutate: createMutation } = useMutation({
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

	function addTransaction({
		description,
		amount,
		categoryId,
		date,
	}: FormValues) {
		if (!activeUser || !categories) return;

		const parsedDate = date ? Date.parse(date) : undefined;

		if (activeTransaction) {
			// make a request to the UPDATE endpoint
			return;
		}

		createMutation({
			description,
			amount,
			categoryId,
			date: parsedDate,
			userId: activeUser.id,
		});
	}

	function editTransaction(transaction: Transaction) {
		setActiveTransaction(transaction);
		dialogRef.current?.showModal();
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
						<TransactionRow
							key={t.id}
							transaction={t}
							onEdit={editTransaction}
						/>
					))}
			</section>
			<BubbleMenu dialogRef={dialogRef} />
			<TransactionDialog
				ref={dialogRef}
				categories={categories}
				users={users}
				submitCallback={addTransaction}
				transaction={activeTransaction}
			/>
		</main>
	);
}
