
import React from "react";

const TableResponse = ({ table }) => {
  if (!table || !table.columns || !table.rows) return null;

  return (
    <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-md overflow-x-auto text-xs md:text-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {table.columns.map((col, index) => (
              <th
                key={index}
                className="px-3 py-2 text-left font-semibold border-b border-gray-200 dark:border-gray-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? "bg-white dark:bg-gray-950"
                  : "bg-gray-50 dark:bg-gray-900"
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-3 py-2 border-b border-gray-200 dark:border-gray-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResponse;
