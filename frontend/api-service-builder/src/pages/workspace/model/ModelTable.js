import React from "react";
import { useTable, useSortBy } from "react-table";

function ModelTable({ data }) {
	const columns = React.useMemo(
		() => [
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Email",
				accessor: "email",
			},
			{
				Header: "Password",
				accessor: "password",
			},
			{
				Header: "Tel",
				accessor: "tel",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);

	return (
		<table {...getTableProps()} className="w-full border-collapse">
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}
								className="bg-primary-900 text-white p-2"
							>
								{column.render("Header")}
								<span>
									{column.isSorted
										? column.isSortedDesc
											? " 🔽"
											: " 🔼"
										: ""}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()} className="border-t">
							{row.cells.map((cell) => (
								<td {...cell.getCellProps()} className="p-2">
									{cell.render("Cell")}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ModelTable;
