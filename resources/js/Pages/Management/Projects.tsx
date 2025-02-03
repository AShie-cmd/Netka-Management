import MainLayout from "@/Layouts/main-layout";
import { CheckBox, Fingerprint } from "@mui/icons-material";
import {
    Backdrop,
    Box,
    Button,
    Checkbox,
    Divider,
    Fade,
    FormControl,
    Grid2,
    IconButton,
    Modal,
    NativeSelect,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import DesktopWindowsTwoToneIcon from "@mui/icons-material/DesktopWindowsTwoTone";
import { useEffect, useState } from "react";
import RoomTwoToneIcon from "@mui/icons-material/RoomTwoTone";
import axios from "axios";
import GroupsTable from "@/Components/sections/dashboard/complex-table/Groups";
import { useForm } from "@inertiajs/react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { sm: 400, xs: 300 },
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
};

export default function Test({ rooms, groups, waitingGroups, onGroups }) {
    const finalOnGroups = Object.keys(waitingGroups).map((key) => [
        key,
        waitingGroups[key],
    ]);

    console.log(groups);

    const finalOnGroups2 = Object.keys(onGroups).map((key) => [
        key,
        onGroups[key],
    ]);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [roomID, setRoomID] = useState(0);
    const [groupId, setGroupId] = useState(0);
    const [chooseRoomMode, setChooseRoomMode] = useState(false);
    const [chosenRoom, setChosenRoom] = useState(0);
    const [chosenProject, setChosenProject] = useState(0);
    const { post, processing, errors } = useForm();
    // const { data, setData, post, processing, errors } = useForm({
    //     group_id: 0,
    //     room_id: 0,
    //     project_id: 0,
    // });
    // const [chooseGroupMode, setChooseGroupMode] = useState(false);
    const [editGroupId, setEditGroupId] = useState(0);

    const [roomProjectValues, setRoomProjectValues] = useState([]);
    const [groupValues, setGroupValues] = useState([]);

    const handleOpen = () => {
        axios
            .get("/management/projects/rooms/" + roomID)
            .then((result) => setRoomProjectValues(result.data))
            .catch((e) => console.log(e));
        setOpen(true);
    };

    const handleOpen2 = () => {
        axios
            .get("/management/projects/groups/" + editGroupId)
            .then((result) => {
                setGroupValues(result.data);
                console.log(result);
            })
            .catch((e) => console.log(e));
        setOpen2(true);
    };

    useEffect(() => {
        if (roomID !== 0) {
            handleOpen();
        }
    }, [roomID]);

    useEffect(() => {
        setChooseRoomMode(false);
    }, [groupId]);

    // useEffect(() => {
    // setChooseGroupMode(false);
    // }, [editGroupId]);

    useEffect(() => {
        // setChooseRoomMode(false);
        if (chosenRoom !== 0 && roomID !== 0) {
            handleOpen();
        }
    }, [chosenRoom]);

    useEffect(() => {
        // setChooseRoomMode(false);
        if (chosenRoom !== 0 && chosenProject !== 0 && groupId !== 0) {
            handleChosenProjectChange();
        }
    }, [chosenProject]);

    function handleChosenProjectChange() {
        console.log(groupId + "/" + chosenRoom + "/" + chosenProject);

        post(
            "/management/projects/set/" +
                groupId +
                "/" +
                chosenRoom +
                "/" +
                chosenProject,
        );
        setChooseRoomMode(false);
        setGroupId(0);
        setChosenRoom(0);
        setChosenProject(0);
        handleClose();
    }

    function handleGroupChange(e) {
        setGroupId(e.target.value);
    }

    function handleEditGroupChange(e) {
        setEditGroupId(e.target.value);
    }

    const handleClose = () => {
        setRoomID(0);
        setOpen(false);
        setOpen2(false);
    };

    function isEven(number: number) {
        if (number % 2 == 0) {
            return true;
        }
        return false;
    }

    function handleSubmit() {
        post("/management/projects/unset/" + editGroupId);
        setEditGroupId(0);
        handleClose();
    }

    return (
        <MainLayout>
            <Grid2
                container
                size={12}
                spacing={3}
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Grid2 size="grow">
                    <Grid2 direction={"column"} container spacing={3}>
                        <Paper sx={{ display: "flex" }}>
                            <Grid2 container size={12}>
                                {rooms.map((room) => {
                                    return (
                                        <Grid2
                                            size={6}
                                            sx={{
                                                // position: "relative",
                                                display: "flex",
                                                justifyContent: "center",
                                                marginBottom: "15px",
                                            }}
                                        >
                                            <div
                                                // style={{ position: "absolute" }}
                                                className={`circle-project circle-project-${isEven(room.info) ? `right` : `left`}`}
                                            >
                                                <Stack
                                                    justifyContent={"center"}
                                                    alignContent={"center"}
                                                    flexDirection={"column"}
                                                    sx={{
                                                        marginTop: "6px",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "14px",
                                                            marginLeft: "10px",
                                                            marginTop: "2px",
                                                            margin: "auto",
                                                            marginBottom: "2px",
                                                        }}
                                                    >
                                                        غرفه {room.info}
                                                    </span>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                            margin: "auto",
                                                        }}
                                                    >
                                                        {room.room_status !==
                                                        "ONAIR" ? (
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (
                                                                        chooseRoomMode ===
                                                                        true
                                                                    ) {
                                                                        setChosenRoom(
                                                                            room.id,
                                                                        );
                                                                        setRoomID(
                                                                            room.id,
                                                                        );
                                                                    } else {
                                                                        setRoomID(
                                                                            room.id,
                                                                        );
                                                                    }
                                                                }}
                                                                size="large"
                                                            >
                                                                <RoomTwoToneIcon />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (
                                                                        chooseRoomMode ===
                                                                        true
                                                                    ) {
                                                                        setChosenRoom(
                                                                            room.id,
                                                                        );
                                                                        setRoomID(
                                                                            room.id,
                                                                        );
                                                                    } else {
                                                                        setRoomID(
                                                                            room.id,
                                                                        );
                                                                    }
                                                                }}
                                                                sx={{
                                                                    backgroundColor:
                                                                        "#E82561",
                                                                    // background:
                                                                    //     "linear-gradient(90deg, #E82561 50%, color(srgb 0.9149 0.9299 0.9684) 50%)",
                                                                    width: "20px",
                                                                    height: "20px",
                                                                }}
                                                                size="large"
                                                            >
                                                                {/* <RoomTwoToneIcon color="primary" /> */}
                                                            </IconButton>
                                                        )}
                                                    </div>
                                                </Stack>
                                            </div>
                                        </Grid2>
                                    );
                                })}
                            </Grid2>
                        </Paper>
                        <Paper>
                            <Typography variant="h6" className="vazir">
                                فرستادن گروه به غرفه
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
                                        sx={{
                                            borderRadius: "16px",
                                            height: "100%",
                                        }}
                                    >
                                        <option value={0}>انتخاب گروه</option>
                                        {finalOnGroups.length !== 0 ? (
                                            finalOnGroups.map((group) => {
                                                return (
                                                    <option
                                                        key={group[1].id}
                                                        value={group[1].id}
                                                    >
                                                        {group[1].school_name}
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
                                            انتخاب
                                        </Button>
                                    ) : chooseRoomMode == false ? (
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            sx={{ height: "100%" }}
                                            onClick={() => {
                                                setChooseRoomMode(true);
                                            }}
                                        >
                                            انتخاب
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            sx={{ height: "100%" }}
                                            disabled
                                        >
                                            بر روی یکی از غرفه ها کلیک کنید
                                        </Button>
                                    )}
                                </FormControl>
                            </div>
                        </Paper>
                        <Paper>
                            <Typography variant="h6" className="vazir">
                                خالی کردن غرفه
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
                                        value={editGroupId}
                                        onChange={handleEditGroupChange}
                                        id="group"
                                        sx={{
                                            borderRadius: "16px",
                                            height: "100%",
                                        }}
                                    >
                                        <option value={0}>انتخاب گروه</option>
                                        {finalOnGroups2.length !== 0 ? (
                                            finalOnGroups2.map((group) => {
                                                return (
                                                    <option
                                                        key={group[1].id}
                                                        value={group[1].id}
                                                    >
                                                        {group[1].school_name}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                    </NativeSelect>
                                </FormControl>
                                <FormControl fullWidth>
                                    {editGroupId == 0 ? (
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            sx={{ height: "100%" }}
                                            disabled
                                        >
                                            انتخاب
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            sx={{ height: "100%" }}
                                            onClick={handleOpen2}
                                        >
                                            انتخاب
                                        </Button>
                                    )}
                                </FormControl>
                            </div>
                        </Paper>
                    </Grid2>
                </Grid2>
                <Grid2 size={{ md: 8, sm: 12 }}>
                    <Paper>
                        <GroupsTable rows={groups} leaderName={false} />
                    </Paper>
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
                            غرفه شماره {roomID}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginTop: "10px" }}
                        >
                            {roomProjectValues.map((project) => {
                                return project.project_status !== "ONAIR" ? (
                                    <Paper
                                        sx={{
                                            backgroundColor:
                                                "color(display-p3 0.9686 0.9647 1)",
                                            width: "100%",
                                        }}
                                    >
                                        {project.project_name}
                                        {chooseRoomMode ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                sx={{ marginTop: "12px" }}
                                                fullWidth
                                                onClick={() => {
                                                    setChosenProject(
                                                        project.id,
                                                    );
                                                }}
                                                disabled={processing}
                                            >
                                                انتخاب
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                    </Paper>
                                ) : (
                                    <Paper
                                        sx={{
                                            backgroundColor: "#C30E59",
                                            color: "white",
                                            width: "100%",
                                        }}
                                    >
                                        {project.project_name}
                                    </Paper>
                                );
                            })}
                        </Stack>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open2}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 400,
                    },
                }}
            >
                <Fade in={open2}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            گروه {groupValues.school_name}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginTop: "10px" }}
                        >
                            <Paper
                                sx={{
                                    backgroundColor:
                                        "color(display-p3 0.9686 0.9647 1)",
                                    width: "100%",
                                }}
                            >
                                {groupValues.length !== 0 ? (
                                    <div>
                                        <span style={{ marginLeft: "10px" }}>
                                            در حال حاضر در غرفه
                                        </span>
                                        <span
                                            style={{
                                                color: "#3282B8",
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {groupValues.room.info}
                                        </span>
                                        <br />
                                        <span style={{ marginLeft: "10px" }}>
                                            در حال تماشای طرح
                                        </span>
                                        <span
                                            style={{
                                                color: "#526D82",
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {groupValues.project.project_name}
                                        </span>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ marginTop: "33px" }}
                                    fullWidth
                                    onClick={handleSubmit}
                                    disabled={processing}
                                >
                                    اتمام ارايه
                                </Button>
                            </Paper>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </MainLayout>
    );
}
