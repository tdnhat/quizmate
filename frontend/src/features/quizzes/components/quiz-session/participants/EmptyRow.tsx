import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyRowProps {
    colSpan: number;
}

const EmptyRow = ({ colSpan }: EmptyRowProps) => (
    <TableRow>
        <TableCell
            colSpan={colSpan}
            className="text-center text-muted-foreground"
        >
            No participants
        </TableCell>
    </TableRow>
);

export default EmptyRow; 