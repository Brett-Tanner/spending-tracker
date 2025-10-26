import type { RawTransaction, Transaction } from "../../types/transaction";

export async function fetchTransactionList(): Promise<Transaction[]> {
	const response = await fetch("/transactions");

	if (response.status !== 200) return [];

	const rawTransactions = (await response.json()) as RawTransaction[];

	return rawTransactions.map((t) => ({
		...t,
		date: new Date(t.date),
	}));
}
