import { useQuery } from "@tanstack/react-query";
import { fetchTransactionList } from "../api/transactions/fetchTransactionList";
import { fetchCategories } from "../api/categories/fetchCategories";

export function useInitApp() {
	const {
		data: transactions,
		isLoading: isLoadingTransactions,
		isError: isTransactionError,
		error: transactionError,
	} = useQuery({
		queryKey: ["transactions"],
		queryFn: fetchTransactionList,
	});

	const {
		data: categories,
		isLoading: isLoadingCategories,
		isError: isCategoryError,
		error: categoryError,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	const isLoading = isLoadingTransactions || isLoadingCategories;
	const isError = isTransactionError || isCategoryError;
	const error = `Transaction Error: ${transactionError?.message || ""},
	     Category Error: ${categoryError?.message || ""}`.trim();

	return { transactions, categories, isLoading, isError, error };
}
