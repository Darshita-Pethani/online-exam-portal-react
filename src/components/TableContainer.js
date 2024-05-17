import { useEffect, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const TableContainer = ({ columns, data, title, defaultFilter, setDefaultFilter, rowCount }) => {
    // columnFilters ma default  onColumnFiltersChange thi j id and value padi jay che
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: defaultFilter?.currentPage - 1,
        pageSize: defaultFilter?.itemsPerPage,
    });

    // defaultFilter ne update karva pagination add 
    const setPaginationValue = () => {
        setDefaultFilter(prevState => ({
            ...prevState,
            itemsPerPage: pagination?.pageSize,
            currentPage: pagination?.pageIndex + 1,
            sortBy: sorting,
            filters: columnFilters
        }));
    }

    useEffect(() => {
        setPaginationValue();
    }, [sorting, columnFilters, pagination]);


    // for default hidden column
    const findColum = () => {
        let column = {};
        columns?.map((columnName) => {
            if (columnName?.defaultHiddenColumn === true) {
                column[columnName?.accessorKey] = false
            }
        });
        return column;
    }
    const table = useMantineReactTable({
        columns,
        data,
        enableGlobalFilter: false,
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableColumnActions: false,
        // paginationDisplayMode: 'pages',   // For display page number in pagination 
        onColumnFiltersChange: setColumnFilters,   // set the id and value using onColumnFiltersChange function in state like 0:  {id: 'name', value: 'a'}
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        manualSorting: true,
        manualFiltering: true,
        manualPagination: true,
        // Define states for manual sorting, filtering, and pagination
        // state ma etle nakhyu km k aanu documentaion che aakhu ane a enathi j acceble che
        state: { sorting, columnFilters, pagination },
        rowCount,
        renderTopToolbarCustomActions: () => (
            <div style={{ marginTop: '10px', marginLeft: '8px' }}>
                <h4
                    style={{
                        fontSize: "20px",
                        textTransform: "uppercase",
                        fontWeight: "700",
                        letterSpacing: "1.5px",
                    }}
                >{title}</h4>
            </div >
        ),
        initialState: { columnVisibility: findColum() }, // for hide column in listing page
    });

    return <MantineReactTable table={table} />
}

export default TableContainer


