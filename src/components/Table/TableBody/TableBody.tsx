import React from 'react'
import { TableBodyProps } from './TableBody.d'
import { flexRender } from '@tanstack/react-table'

const TableBody = ({ rowModel }: TableBodyProps) => {
    return (
        <tbody>
            {rowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody