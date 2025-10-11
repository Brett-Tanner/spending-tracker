import { useQuery } from "@tanstack/react-query";
import { fetchTransactionList } from "../../api/transactions/fetchTransactionList";

export function useTransactionList() {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: fetchTransactionList,
	});
}
