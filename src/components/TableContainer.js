import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const TableContainer = ({ columns, data, title }) => {

    const table = useMantineReactTable({
        columns,
        data,
        enableGlobalFilter: false,
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableColumnActions: false,
        renderTopToolbarCustomActions: () => (
            <div style={{ marginTop: '10px', marginLeft: '8px' }}>
                <h4>{title}</h4>
            </div>
        ),
    });

    return <MantineReactTable table={table} />
}

export default TableContainer


