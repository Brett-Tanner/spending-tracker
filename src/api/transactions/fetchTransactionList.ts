import type { Transaction } from "../../types/transaction";

export async function fetchTransactionList() {
	const response = await fetch("/transactions");

	if (response.status !== 200) return [];

	return (await response.json()) as Transaction[];
}
