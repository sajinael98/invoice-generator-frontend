import { RowModel } from "@tanstack/react-table";

export interface TableBodyProps {
    rowModel: () => RowModel<any>
}