import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef, useGridApiRef, GridApi } from "@mui/x-data-grid";
import DataGridFooter from "@/components/common/DataGridFooter";
import IconifyIcon from "@/components/base/IconifyIcon";
import { rows } from "@/data/complexTableData";
import ActionMenu from "./ActionMenu";

const columns: GridColDef<(typeof rows)[number]>[] = [
    {
        field: "__check__",
        headerName: "",
        width: 52,
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "school_name",
        headerName: "نام",
        editable: false,
        align: "left",
        flex: 2,
        minWidth: 160,
        renderHeader: () => (
            <Typography
                variant="body2"
                color="text.disabled"
                fontWeight={600}
                ml={1}
            >
                نام
            </Typography>
        ),
        renderCell: (params) => (
            <Stack
                ml={1}
                height={1}
                direction="column"
                alignSelf="center"
                justifyContent="center"
            >
                <Typography variant="body2" fontWeight={600}>
                    {params.value}
                </Typography>
            </Stack>
        ),
    },
    {
        field: "gender",
        headerName: "جنسیت",
        editable: false,
        align: "left",
        flex: 2,
        minWidth: 90,
        renderCell: (params) => {
            const gender = params.value.toLowerCase();
            let text = "";

            if (gender === "male") {
                text = "پسرانه";
            } else if (gender === "female") {
                text = "دخترانه";
            }

            return (
                <Stack alignItems="center" spacing={0.8} height={1}>
                    <Typography variant="body2" fontWeight={550}>
                        {text}
                    </Typography>
                </Stack>
            );
        },
    },

    // {
    //     field: "school_name",
    //     headerName: "NAME",
    //     editable: false,
    //     align: "left",
    //     flex: 2,
    //     minWidth: 190,
    // },
    {
        field: "status",
        headerName: "وضعیت",
        headerAlign: "left",
        editable: false,
        flex: 1,
        minWidth: 160,
        renderCell: (params) => {
            const status = params.value.toLowerCase();
            let color = "";
            let icon = "";
            let text = "";

            if (status === "on") {
                color = "success.main";
                icon = "ic:twotone-visibility";
                text = "در حال تماشا";
            } else if (status === "without-leader") {
                color = "warning.main";
                icon = "ic:twotone-person-off";
                text = "بدون لیدر";
            } else if (status === "off") {
                color = "se.main";
                icon = "ic:baseline-cancel";
                text = "پایان بازدید";
            } else if (status === "waiting") {
                color = "secondary.main";
                icon = "ic:round-warning";
                text = "منتظر";
            }
            return (
                <Stack alignItems="center" spacing={0.8} height={1}>
                    <IconifyIcon
                        icon={icon}
                        color={color}
                        fontSize="h5.fontSize"
                    />
                    <Typography variant="body2" fontWeight={600}>
                        {text}
                    </Typography>
                </Stack>
            );
        },
    },
    {
        field: "project_name",
        headerName: "نام غرفه",
        editable: false,
        align: "left",
        flex: 2,
        minWidth: 160,
    },
    {
        field: "leader_name",
        headerName: "نام لیدر",
        editable: false,
        align: "left",
        flex: 2,
        minWidth: 120,
    },
    // {
    //     field: "action",
    //     headerName: "",
    //     headerAlign: "right",
    //     align: "right",
    //     editable: false,
    //     sortable: false,
    //     flex: 1,
    //     minWidth: 100,
    //     // renderHeader: () => <ActionMenu />,
    //     renderCell: () => <ActionMenu />,
    // },
];

interface TaskOverviewTableProps {
    searchText: string;
    groups: object;
}

const GroupsDataTable = ({ searchText, groups }: TaskOverviewTableProps) => {
    const apiRef = useGridApiRef<GridApi>();

    useEffect(() => {
        apiRef.current.setQuickFilterValues(
            searchText.split(/\b\W+\b/).filter((word) => word !== ""),
        );
    }, [searchText]);

    return (
        <DataGrid
            apiRef={apiRef}
            density="standard"
            columns={columns}
            rows={groups}
            rowHeight={52}
            disableColumnResize
            disableColumnMenu
            disableColumnSelector
            disableRowSelectionOnClick
            initialState={{
                pagination: { paginationModel: { pageSize: 8 } },
            }}
            autosizeOptions={{
                includeOutliers: true,
                includeHeaders: false,
                outliersFactor: 1,
                expand: true,
            }}
            slots={{
                pagination: DataGridFooter,
            }}
            checkboxSelection
            pageSizeOptions={[8]}
        />
    );
};

export default GroupsDataTable;
