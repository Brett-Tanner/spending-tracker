const transactionStatuses = ["loading", "error", "completed"] as const;

export interface Transaction {
	amount: number;
	category: string;
	date: Date;
	description: string;
	id: number;
	user: string;
	status: keyof typeof transactionStatuses;
}
