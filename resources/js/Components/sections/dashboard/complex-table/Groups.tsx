import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconifyIcon from "@/components/base/IconifyIcon";
import GroupsDataTable from "./GroupsDataTable";

const GroupsTable = ({ rows, leaderName }) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <Box component={Paper} px={0} height={{ xs: 635, sm: 590 }}>
            <Stack
                px={3.5}
                spacing={{ xs: 2, sm: 0 }}
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
            >
                <Typography
                    variant="h4"
                    textAlign={{ xs: "center", sm: "left" }}
                    className="vazir"
                >
                    گروهان تماشاگر
                </Typography>

                <TextField
                    variant="filled"
                    size="small"
                    placeholder="Search here"
                    value={searchText}
                    onChange={handleInputChange}
                    sx={{
                        mx: { xs: "auto", sm: "initial" },
                        width: 1,
                        maxWidth: { xs: 300, sm: 220 },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconifyIcon icon="eva:search-fill" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Box mt={{ xs: 1.25, sm: 1 }} height={513}>
                <GroupsDataTable
                    searchText={searchText}
                    groups={rows}
                    leaderName={leaderName}
                />
            </Box>
        </Box>
    );
};

export default GroupsTable;
