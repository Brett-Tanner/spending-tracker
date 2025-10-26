import { useQuery } from "@tanstack/react-query";
import { fetchTransactionList } from "../api/transactions/fetchTransactionList";
import { fetchCategories } from "../api/categories/fetchCategories";
import { fetchUsers } from "../api/users/fetchUsers";

export function useInitApp() {
	const {
		data: transactions,
		isLoading: isLoadingTransactions,
		isError: isTransactionError,
		error: transactionError,
		refetch: refetchTransactions,
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

	const {
		data: users,
		isLoading: isLoadingUsers,
		isError: isUserError,
		error: userError,
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	const isLoading =
		isLoadingTransactions || isLoadingCategories || isLoadingUsers;
	const isError = isTransactionError || isCategoryError || isUserError;
	const error = `Transaction Error: ${transactionError?.message || ""},
	     Category Error: ${categoryError?.message || ""}, User Error: ${userError?.message || ""}`.trim();

	return {
		transactions,
		refetchTransactions,
		categories,
		users,
		isLoading,
		isError,
		error,
	};
}
