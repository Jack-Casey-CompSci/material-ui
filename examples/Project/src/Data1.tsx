import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
  GridColumns,
  GridRowsProp,
  DataGrid,
  GridRowId,
  GridCellModes,
  GridEventListener,
  GridCellModesModel,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import {
  randomId,
  randomAddress,
} from '@mui/x-data-grid-generator';
import Axios from 'axios';

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

interface EditToolbarProps {
  selectedCellParams?: SelectedCellParams;
  cellModesModel: GridCellModesModel;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setCellModesModel: (value: GridCellModesModel) => void;
  cellMode: 'view' | 'edit';
}

const Initialrows: GridRowsProp = [
    {
      id: randomId(),
      address: randomAddress(),
      size: 25000,
      type: 'Office',
      market: 'Dallas, TX',
    },
    {
      id: randomId(),
      address: randomAddress(),
      size: 2000000,
      type: 'Industrial',
      market: 'New York, NY',
    },
    {
      id: randomId(),
      address: randomAddress(),
      size: 50000,
      type: 'Office',
      market: 'Philadelphia, PA',
    },
    {
      id: randomId(),
      address: randomAddress(),
      size: 2750000,
      type: 'Industrial',
      market: 'Chicago, IL',
    },
    {
      id: randomId(),
      address: randomAddress(),
      size: 100000,
      type: 'Office',
      market: 'Los Angeles, CA',
    },
  ];


function EditToolbar(props: EditToolbarProps) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel, setRows, } = props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, address: '', size: '', isNew: true }]);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        color="primary"
        variant="outlined"
      >
        {cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === 'view'}
        color="primary"
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Property 
      </Button>
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    </Box>
  );
}

export default function StartEditButtonGrid() {
  const [selectedCellParams, setSelectedCellParams] =
    React.useState<SelectedCellParams | null>(null);
  const [rows, setRows] = React.useState([]);
  const [cellModesModel, setCellModesModel] = React.useState<GridCellModesModel>({});

  const handleCellFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    [],
  );

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback<GridEventListener<'cellKeyDown'>>(
    (params, event) => {
      if (cellMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode],
  );

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        components={{
          Toolbar: EditToolbar, 
        }}
        componentsProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
            setRows,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}

const columns: GridColumns = [
  { field: 'address', headerName: 'Address', width: 180, editable: true },
  { field: 'size', headerName: 'Size (sq. ft)', type: 'number', width: 120,  editable: true },
  {
    field: 'type',
    headerName: 'Asset Type',
    type: 'singleSelect',
    valueOptions: ['Office', 'Industrial'],
    width: 180,
    editable: true,
  },
  {
    field: 'market',
    headerName: 'Asset Market',
    type: 'singleSelect',
    valueOptions: ['Dallas, TX', 'New York, NY', 'Philadelphia, PA', 'Chicago, IL', 'Los Angeles, CA'],
    width: 220,
    editable: true,
  },
];

