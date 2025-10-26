import type { Dispatch, SetStateAction } from "react";
import type { Category } from "../../../types/category";

interface FilterNavProps {
	categories: Category[];
	setActiveCategory: Dispatch<SetStateAction<string>>;
}

export function FilterNav({ categories, setActiveCategory }: FilterNavProps) {
	return (
		<nav className="filter-nav">
			<details>
				<summary>Categories</summary>
				<div className="content">
					<button onClick={() => setActiveCategory("all")}>All</button>
					{categories.map(({ name, id }) => (
						<button key={id} onClick={() => setActiveCategory(name)}>
							{name}
						</button>
					))}
				</div>
			</details>
			<button>&lt; September '25</button>
			<button>November '25 &gt;</button>
		</nav>
	);
}
