import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTable, useSortBy } from "react-table";

function ModelTable({ data, header }) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const columns = React.useMemo(() => header, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);

	return (
		<table {...getTableProps()} className="w-full border border-collapse">
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}
								className="bg-primary-900 text-white p-2 border"
							>
								{column.render("Header")}
								<span>
									{column.isSorted ? (
										column.isSortedDesc ? (
											<FontAwesomeIcon
												icon={icon({
													name: "caret-down",
													style: "solid",
												})}
												className="scale-105 ml-2 opacity-90"
											/>
										) : (
											<FontAwesomeIcon
												icon={icon({
													name: "caret-up",
													style: "solid",
												})}
												className="scale-105 ml-2 opacity-90"
											/>
										)
									) : (
										""
									)}
								</span>
							</th>
						))}
						<th className="bg-primary-900 text-white py-2 border">
							Manage
						</th>
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				<tr className="border-t">
					{header.map((val) => {
						return (
							<td className="p-2 border">
								<input
									type="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder={val.Header}
									required
								/>
							</td>
						);
					})}
					<td className="p-2 border text-center">
						<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-lg font-medium">
							<FontAwesomeIcon
								icon={icon({
									name: "plus",
									style: "solid",
								})}
								className="text-lg w-8"
							/>
							<span>Add</span>
						</button>
					</td>
				</tr>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()} className="border-t">
							{row.cells.map((cell) => (
								<td
									{...cell.getCellProps()}
									className="p-2 border"
								>
									{cell.render("Cell")}
								</td>
							))}
							<td className="p-2">
								<div className="flex justify-evenly">
									<FontAwesomeIcon
										icon={icon({
											name: "pen-to-square",
											style: "solid",
										})}
										className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
									/>
									<FontAwesomeIcon
										icon={icon({
											name: "trash",
											style: "solid",
										})}
										className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
									/>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ModelTable;
