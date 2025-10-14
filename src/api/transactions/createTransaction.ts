import type { Input } from "../../types/form";

interface CreateTransactionParams extends Record<Input, string> {
	userId: number;
	date?: number;
}

export async function createTransaction({
	description,
	amount,
	categoryId,
	userId,
	date = Date.now(),
}: CreateTransactionParams) {
	await fetch("/transactions", {
		method: "POST",
		body: JSON.stringify({
			description,
			amount: parseInt(amount, 10),
			categoryId: parseInt(categoryId, 10),
			userId,
			date,
		}),
	});
}
