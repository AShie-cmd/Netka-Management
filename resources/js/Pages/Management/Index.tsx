import MainLayout from "@/Layouts/main-layout";
import {
    Alert,
    Backdrop,
    Button,
    Fade,
    FormControl,
    Grid2,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    NativeSelect,
    Select,
    SelectChangeEvent,
    TableHead,
    TextField,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import GroupsTable from "@/Components/sections/dashboard/complex-table/Groups";
import { router, useForm } from "@inertiajs/react";
import { group } from "console";
import axios from "axios";

//this is the style of the Modal
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 530,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "11px",
};

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

const Index = ({ groups, leaders }) => {
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [leadersP, setLeadersP] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [groupId, setGroupId] = useState(0);

    // const [group, setGroup] = useState({});

    const { data, setData, post, processing, errors } = useForm({
        school_name_p: "",
        gender_p: "",
        leader_p: 0,
        school_name: "",
        gender: "",
        leader_id: "unchanged",
    });

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const [gender, setGender] = useState("");
    // const handleChange = (event: SelectChangeEvent) => {
    //     setGender(event.target.value as string);
    // };
    // const [leader, setLeader] = useState("");
    // const handleLeaderChange = (event: SelectChangeEvent) => {
    //     setLeader(event.target.value as string);
    // };

    const [values, setValues] = useState({
        school_name: "",
        gender: "",
        leader_id: 0,
    });

    function handleValuesChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleValuesChangePrime(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleGroupChange(e) {
        setGroupId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/management/groups");
    };

    const handleSubmitPrime = (e) => {
        try {
            e.preventDefault();
            post("/management/groups/" + groupId);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    function handleCancelGroup(e) {
        try {
            e.preventDefault();
            post("/management/groups/delete/" + groupId);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpen = () => {
        axios
            .get("/management/groups/" + groupId)
            .then((result) => setValues(result.data))
            .catch((e) => console.log(e));
        setOpen(true);
        axios
            .get("/management/getAllFreeLeaders/")
            .then((result) => {
                setLeadersP(result.data);
            })
            .catch((e) => console.log(e));
    };
    const handleClose = () => setOpen(false);

    return (
        <MainLayout>
            <Grid2 container size={12} spacing={2}>
                <Grid2 size={8}>
                    <Paper>
                        {/* <Typography variant="h4" className="vazir">
                            گروهان تماشاگر
                        </Typography> */}
                        <GroupsTable rows={groups} />
                    </Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Grid2
                        container
                        size={12}
                        direction="column"
                        spacing={2}
                        sx={{
                            alignItems: "stretch",
                            justifyContent: "center",
                        }}
                    >
                        <Grid2 size={8} sx={{ width: "100%" }}>
                            <Paper>
                                <div>
                                    <Typography
                                        variant="h5"
                                        className="vazir"
                                        sx={{ marginBottom: "15px" }}
                                    >
                                        ایجاد گروه تماشاگر جدید
                                    </Typography>
                                </div>
                                {/* {errors && (
                                        <Alert
                                            severity="error"
                                            variant="filled"
                                            sx={{ marginBottom: "45px" }}
                                        >

                                            <div>{errors.school_name_p}</div>


                                            <div>{errors.leader_p}</div>

                                        </Alert>,
                                    )} */}

                                {(errors.school_name_p || errors.gender_p) && (
                                    <div>
                                        <Alert
                                            severity="error"
                                            variant="filled"
                                            // sx={{ marginBottom: "45px" }}
                                        >
                                            <div>{errors.school_name_p}</div>
                                            <div>{errors.gender_p}</div>
                                        </Alert>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    style={{ marginTop: "45px" }}
                                >
                                    <FormControl
                                        sx={{
                                            width: "100%",
                                        }}
                                        // onSubmit={handleSubmit}
                                    >
                                        {/* {errors.school_name_p && (
                                            <div>{errors.school_name_p}</div>
                                        )} */}
                                        <TextField
                                            id="school_name_p"
                                            label=" * نام مدرسه"
                                            variant="outlined"
                                            sx={{
                                                marginBottom: "15px",
                                            }}
                                            onChange={handleValuesChange}
                                            value={data.school_name_p}
                                        />
                                    </FormControl>
                                    <Grid2 container size={12} spacing={2}>
                                        <Grid2 size={6}>
                                            <FormControl fullWidth>
                                                {/* {errors.gender_p && (
                                                    <div>{errors.gender_p}</div>
                                                )} */}
                                                <label htmlFor="gender_p">
                                                    * جنسیت
                                                </label>
                                                <NativeSelect
                                                    value={data.gender_p}
                                                    onChange={
                                                        handleValuesChange
                                                    }
                                                    id="gender_p"
                                                >
                                                    <option value={""}>
                                                        انتخاب جنسیت
                                                    </option>
                                                    <option value={"male"}>
                                                        پسرانه
                                                    </option>
                                                    <option value={"female"}>
                                                        دخترانه
                                                    </option>
                                                </NativeSelect>
                                            </FormControl>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <FormControl fullWidth>
                                                <label htmlFor="leader_p">
                                                    لیدر
                                                </label>
                                                <NativeSelect
                                                    value={data.leader_p}
                                                    onChange={
                                                        handleValuesChange
                                                    }
                                                    id="leader_p"
                                                    defaultValue={0}
                                                >
                                                    <option value={0}>
                                                        بعدا انتخاب میشود
                                                    </option>
                                                    {leaders.length !== 0 ? (
                                                        leaders.map(
                                                            (leader) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            leader.id
                                                                        }
                                                                    >
                                                                        {
                                                                            leader.name
                                                                        }
                                                                    </option>
                                                                );
                                                            },
                                                        )
                                                    ) : (
                                                        <option
                                                            value={"none"}
                                                            disabled
                                                        >
                                                            هیج لیدر آزادی وجود
                                                            ندارد
                                                        </option>
                                                    )}
                                                </NativeSelect>
                                            </FormControl>
                                        </Grid2>
                                    </Grid2>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        sx={{ marginTop: "20px" }}
                                        fullWidth
                                        disabled={processing}
                                    >
                                        ثبت
                                    </Button>
                                </form>
                            </Paper>
                        </Grid2>
                        <Grid2 size={4} sx={{ width: "100%" }}>
                            <Paper>
                                <Typography variant="h6" className="vazir">
                                    تغییر گروه ها
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "20px",
                                        gap: "10px",
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <NativeSelect
                                            value={groupId}
                                            onChange={handleGroupChange}
                                            id="group"
                                            sx={{ borderRadius: "16px" }}
                                        >
                                            <option value={0}>
                                                انتخاب گروه
                                            </option>
                                            {groups.length !== 0 ? (
                                                groups.map((group) => {
                                                    return (
                                                        <option
                                                            key={group.id}
                                                            value={group.id}
                                                        >
                                                            {group.school_name}
                                                        </option>
                                                    );
                                                })
                                            ) : (
                                                <></>
                                            )}
                                        </NativeSelect>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        {groupId == 0 ? (
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                sx={{ height: "100%" }}
                                                disabled
                                            >
                                                باز کردن
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                sx={{ height: "100%" }}
                                                onClick={handleOpen}
                                            >
                                                باز کردن
                                            </Button>
                                        )}
                                        {/* <Button
                                            variant="contained"
                                            color="warning"
                                            sx={{ height: "100%" }}
                                            onClick={handleOpen}
                                        >
                                            باز کردن
                                        </Button> */}
                                    </FormControl>
                                </div>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 400,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            <div>
                                <Typography
                                    variant="h5"
                                    className="vazir"
                                    sx={{ marginBottom: "50px" }}
                                >
                                    تغییر گروه
                                </Typography>
                            </div>

                            <form
                                onSubmit={handleSubmitPrime}

                                // style={{ width: "100%" }}
                            >
                                <FormControl
                                    sx={{
                                        width: "100%",
                                    }}
                                    // onSubmit={handleSubmit}
                                >
                                    {errors.school_name && (
                                        <div>{errors.school_name}</div>
                                    )}
                                    <TextField
                                        id="school_name"
                                        label=" * نام مدرسه"
                                        variant="outlined"
                                        sx={{
                                            marginBottom: "15px",
                                        }}
                                        onChange={handleValuesChangePrime}
                                        value={values.school_name}
                                    />
                                </FormControl>
                                <Grid2 container size={12} spacing={2}>
                                    <Grid2 size={6}>
                                        <FormControl fullWidth>
                                            {errors.gender && (
                                                <div>{errors.gender}</div>
                                            )}
                                            <label htmlFor="gender">
                                                * جنسیت
                                            </label>
                                            <NativeSelect
                                                value={values.gender}
                                                onChange={
                                                    handleValuesChangePrime
                                                }
                                                id="gender"
                                            >
                                                <option value={""}>
                                                    انتخاب جنسیت
                                                </option>
                                                <option value={"male"}>
                                                    پسرانه
                                                </option>
                                                <option value={"female"}>
                                                    دخترانه
                                                </option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <FormControl fullWidth>
                                            {errors.leader_id && (
                                                <div>{errors.leader_id}</div>
                                            )}
                                            <label htmlFor="leader_id">
                                                لیدر
                                            </label>
                                            <NativeSelect
                                                value={values.leader_id}
                                                onChange={
                                                    handleValuesChangePrime
                                                }
                                                id="leader_id"
                                            >
                                                <option value={0}>
                                                    بعدا انتخاب میشود
                                                </option>
                                                {leadersP.length !== 0 ? (
                                                    leadersP.map((leader) => {
                                                        return (
                                                            <option
                                                                key={leader.id}
                                                                value={
                                                                    leader.id
                                                                }
                                                            >
                                                                {leader.name}
                                                            </option>
                                                        );
                                                    })
                                                ) : (
                                                    <option
                                                        value={"none"}
                                                        disabled
                                                    >
                                                        هیج لیدر آزادی وجود
                                                        ندارد
                                                    </option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid2>
                                </Grid2>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    sx={{ marginTop: "20px" }}
                                    fullWidth
                                    disabled={processing}
                                >
                                    ویرایش
                                </Button>
                            </form>

                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginTop: "10px" }}
                                fullWidth
                                onClick={handleCancelGroup}
                            >
                                پایان بازدید
                            </Button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </MainLayout>
    );
};

export default Index;
