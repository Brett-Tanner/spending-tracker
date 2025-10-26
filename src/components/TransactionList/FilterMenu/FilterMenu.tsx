import type { Dispatch, SetStateAction } from "react";
import type { Category } from "../../../types/category";

interface FilterMenuProps {
	categories: Category[];
	activeCategory: number;
	setActiveCategory: Dispatch<SetStateAction<number>>;
}

export function FilterMenu({
	categories,
	activeCategory,
	setActiveCategory,
}: FilterMenuProps) {
	return (
		<details className="filter-menu">
			<summary>Filters</summary>
			<h3>Categories</h3>
			<button
				className={activeCategory === 0 ? "active" : ""}
				onClick={() => setActiveCategory(0)}
			>
				All
			</button>
			{categories.map(({ name, id }) => (
				<button
					className={activeCategory === id ? "active" : ""}
					key={id}
					onClick={() => setActiveCategory(id)}
				>
					{name}
				</button>
			))}
		</details>
	);
}
