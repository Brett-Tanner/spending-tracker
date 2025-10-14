import type { Category } from "../../types/category";

export async function fetchCategories() {
	const response = await fetch("/categories");

	if (response.status !== 200) return [];

	return (await response.json()) as Category[];
}
