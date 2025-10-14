export type Input = "description" | "amount" | "category";

export interface FormValues {
	description: string;
	amount: string;
	category: string;
	user?: string;
	date?: Date;
}
