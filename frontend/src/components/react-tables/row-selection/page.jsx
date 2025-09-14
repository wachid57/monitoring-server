import * as React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  AvatarGroup,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Stack } from '@mui/system';
import DownloadCard from 'src/components/shared/DownloadCard';
import { basicsTableData } from 'src/components/tables/tableData';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';

const basics = basicsTableData;

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <CustomCheckbox
      ref={ref} type="checkbox"
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('checkboxes', {
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  }),

  columnHelper.accessor('imgsrc', {
    header: () => 'Users',
    cell: info => (
      <Stack direction="row" spacing={2}>
        <Avatar src={info.getValue()} alt={info.getValue()} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography variant="h6" sx={{
            fontWeight: "600"
          }}>
            {info.row.original.name}
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {info.row.original.post}
          </Typography>
        </Box>
      </Stack>
    ),
  }),
  columnHelper.accessor('pname', {
    header: () => 'Project Name',
    cell: info => (
      <Typography color="textSecondary" variant="h6" sx={{
        fontWeight: 400
      }}>
        {info.row.original.pname}
      </Typography>
    ),
  }),
  columnHelper.accessor('teams', {
    header: () => 'Team',
    cell: info => (
      <Stack direction="row">
        <AvatarGroup max={4}>
          {info.getValue().map((team) => (
            <Avatar
              key={team.id}
              sx={{
                bgcolor: team.color,
                width: 35,
                height: 35,
              }}
            >
              {team.text}
            </Avatar>
          ))}
        </AvatarGroup>
      </Stack>
    ),
  }),
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: info => (
      <Chip
        sx={{
          bgcolor:
            info.getValue() === 'Active'
              ? (theme) => theme.palette.success.light
              : info.getValue() === 'Pending'
                ? (theme) => theme.palette.warning.light
                : info.getValue() === 'Completed'
                  ? (theme) => theme.palette.primary.light
                  : info.getValue() === 'Cancel'
                    ? (theme) => theme.palette.error.light
                    : (theme) => theme.palette.secondary.light,
          color:
            info.getValue() === 'Active'
              ? (theme) => theme.palette.success.main
              : info.getValue() === 'Pending'
                ? (theme) => theme.palette.warning.main
                : info.getValue() === 'Completed'
                  ? (theme) => theme.palette.primary.main
                  : info.getValue() === 'Cancel'
                    ? (theme) => theme.palette.error.main
                    : (theme) => theme.palette.secondary.main,
          borderRadius: '8px',
        }}
        size="small"
        label={info.getValue()}
      />
    ),
  }),
  columnHelper.accessor('budget', {
    header: () => 'Budget',
    cell: info => (
      <Typography variant="h6">
        ${info.row.original.budget}k
      </Typography>
    ),
  }),
];

const TableRowSelection = () => {
  const [data, _setData] = React.useState(() => [...basics]);

  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleDownload = () => {
    const headers = ["Users", "Project Name", "Team", "Status", "Budget"];
    const rows = data.map(item => [

      item.name,
      item.pname,
      item.teams.map(team => team.text).join(", "),
      item.status,
      item.budget,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (

    <DownloadCard title="Row Selection Table" onDownload={handleDownload}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Box>
            <TableContainer>
              <Table
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell key={header.id}>
                          <Typography variant="h6">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </DownloadCard>
  );
};

export default TableRowSelection;
