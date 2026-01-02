import type { FormValues } from "../../types/form";

interface CreateTransactionParams
	extends Omit<FormValues, "date" | "category"> {
	userId: number;
	date?: number;
	categoryId: number;
}

export async function createTransaction({
	description,
	amount,
	categoryId,
	userId,
	date = Date.now(),
}: CreateTransactionParams) {
	const response = await fetch("/transactions", {
		method: "POST",
		body: JSON.stringify({
			amount,
			categoryId,
			date,
			description,
			userId,
		}),
	});

	if (response.status !== 200) throw new Error("Failed to create transaction");

	return await response.json();
}
