import MainLayout from "@/Layouts/main-layout";
import { CheckBox, Fingerprint, Spa } from "@mui/icons-material";
import {
    Backdrop,
    Box,
    Button,
    Checkbox,
    Divider,
    Fade,
    FormControl,
    Grid2,
    Icon,
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
import MusicNoteTwoToneIcon from "@mui/icons-material/MusicNoteTwoTone";
import ScienceTwoToneIcon from "@mui/icons-material/ScienceTwoTone";
import TheaterComedyTwoToneIcon from "@mui/icons-material/TheaterComedyTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import SlideshowTwoToneIcon from "@mui/icons-material/SlideshowTwoTone";
import "@/echo";

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

export default function Test({
    rooms,
    groups,
    waitingGroups,
    onGroups,
    megaRooms,
}) {
    const finalOnGroups = Object.keys(waitingGroups).map((key) => [
        key,
        waitingGroups[key],
    ]);

    const finalOnGroups2 = Object.keys(onGroups).map((key) => [
        key,
        onGroups[key],
    ]);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [roomID, setRoomID] = useState(0);
    const [megaRoomID, setMegaRoomID] = useState(0);
    const [groupId, setGroupId] = useState(0);
    const [chooseRoomMode, setChooseRoomMode] = useState(false);
    const [chooseMegaRoomMode, setChooseMegaRoomMode] = useState(false);
    const [chosenRoom, setChosenRoom] = useState(0);
    const [chosenMegaRoom, setChosenMegaRoom] = useState(0);
    const [chosenProject, setChosenProject] = useState(0);
    const [chosenMegaProject, setChosenMegaProject] = useState(0);
    const { post, processing, errors } = useForm();
    const [editGroupId, setEditGroupId] = useState(0);

    const [roomProjectValues, setRoomProjectValues] = useState([]);
    const [megaRoomValues, setMegaRoomValues] = useState([]);
    const [megaRoomWithoutGroupsValues, setMegaRoomWithoutGroupsValues] =
        useState([]);
    const [groupValues, setGroupValues] = useState([]);
    const [groupValues2, setGroupValues2] = useState([]);

    const [values, setValues] = useState(rooms);
    const [megaRoomsValues, setMegaRoomsValues] = useState(megaRooms);
    const finalRooms = Object.keys(values).map((key) => [key, values[key]]);

    useEffect(() => {
        Echo.channel("map").listen("MapRoomStatusChanged", (data) => {
            // Handle the received message data (e.g., update chat UI)
            // console.log(data);
            // setChangedProject(data.project);
            setValues(data.rooms);
            // .. update your chat interface with the received message
        });

        Echo.channel("map.megaRoom").listen(
            "MapMegaRoomStatusChanged",
            (data) => {
                // Handle the received message data (e.g., update chat UI)
                // console.log(data);
                // setChangedProject(data.project);
                setMegaRoomsValues(data.megaRooms);
                // .. update your chat interface with the received message
            },
        );
    }, []);

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
            })
            .catch((e) => console.log(e));
        setOpen2(true);
    };

    const handleOpen3 = () => {
        axios
            .get("/management/projects/megaRoomsWithGroups/" + megaRoomID)
            .then((result) => {
                setMegaRoomValues(result.data);
            })
            .catch((e) => console.log(e));
        axios
            .get("/management/projects/megaRooms/" + megaRoomID)
            .then((result) => {
                setMegaRoomWithoutGroupsValues(result.data);
            })
            .catch((e) => console.log(e));
        setOpen3(true);
    };

    useEffect(() => {
        if (roomID !== 0) {
            handleOpen();
        }
    }, [roomID]);

    useEffect(() => {
        if (megaRoomID !== 0) {
            handleOpen3();
        }
    }, [megaRoomID]);

    useEffect(() => {
        setChooseRoomMode(false);
        setChooseMegaRoomMode(false);
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
        if (chosenMegaRoom !== 0 && megaRoomID !== 0) {
            handleOpen3();
        }
    }, [chosenMegaRoom]);

    useEffect(() => {
        // setChooseRoomMode(false);
        if (chosenRoom !== 0 && chosenProject !== 0 && groupId !== 0) {
            handleChosenProjectChange();
        }
    }, [chosenProject]);

    useEffect(() => {
        // setChooseRoomMode(false);
        if (chosenMegaRoom !== 0 && chosenMegaProject !== 0 && groupId !== 0) {
            handleChosenMegaProjectChange();
        }
    }, [chosenMegaProject]);

    function handleChosenProjectChange() {
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

    function handleChosenMegaProjectChange() {
        post(
            "/management/projects/setOnMegaRoom/" +
                groupId +
                "/" +
                chosenMegaProject,
        );
        setChooseMegaRoomMode(false);
        setGroupId(0);
        setChosenMegaRoom(0);
        setChosenMegaProject(0);
        handleClose();
    }

    function handleGroupChange(e) {
        setGroupId(e.target.value);
        axios
            .get("/management/projects/groups/" + e.target.value)
            .then((result) => {
                setGroupValues2(result.data);
            })
            .catch((e) => console.log(e));
    }

    function handleEditGroupChange(e) {
        setEditGroupId(e.target.value);
    }

    const handleClose = () => {
        setRoomID(0);
        setOpen(false);
        setOpen2(false);
        setMegaRoomID(0);
        setOpen3(false);
        setGroupValues([]);
        setRoomProjectValues([]);
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
                                {finalRooms.map((room) => {
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
                                                className={`circle-project circle-project-${isEven(room[1].info) ? `right` : `left`}`}
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
                                                        غرفه {room[1].info}
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
                                                        {room[1].room_status !==
                                                        "ONAIR" ? (
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (
                                                                        chooseRoomMode ===
                                                                        true
                                                                    ) {
                                                                        setChosenRoom(
                                                                            room[1]
                                                                                .id,
                                                                        );
                                                                        setRoomID(
                                                                            room[1]
                                                                                .id,
                                                                        );
                                                                    } else {
                                                                        setRoomID(
                                                                            room[1]
                                                                                .id,
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
                                                                            room[1]
                                                                                .id,
                                                                        );
                                                                        setRoomID(
                                                                            room[1]
                                                                                .id,
                                                                        );
                                                                    } else {
                                                                        setRoomID(
                                                                            room[1]
                                                                                .id,
                                                                        );
                                                                    }
                                                                }}
                                                                sx={{
                                                                    backgroundColor:
                                                                        "#E82561",
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

                                {megaRoomsValues.map((mRoom) => {
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
                                                className={`circle-project circle-project-${isEven(mRoom.id) ? `right` : `left`}`}
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
                                                        {mRoom.name}
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
                                                        {mRoom.status !==
                                                        "FULL" ? (
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (
                                                                        chooseMegaRoomMode ===
                                                                        true
                                                                    ) {
                                                                        setChosenMegaRoom(
                                                                            mRoom.id,
                                                                        );
                                                                        setMegaRoomID(
                                                                            mRoom.id,
                                                                        );
                                                                    } else {
                                                                        setMegaRoomID(
                                                                            mRoom.id,
                                                                        );
                                                                    }
                                                                }}
                                                                size="large"
                                                            >
                                                                {mRoom.name ===
                                                                "نٌتکا" ? (
                                                                    <MusicNoteTwoToneIcon />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {mRoom.name ===
                                                                "نتکارگاه" ? (
                                                                    <ScienceTwoToneIcon />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {mRoom.name ===
                                                                "نقالیکا" ? (
                                                                    <TheaterComedyTwoToneIcon />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                                {mRoom.id ===
                                                                    4 ||
                                                                mRoom.id ===
                                                                    5 ||
                                                                mRoom.id ===
                                                                    6 ? (
                                                                    <MovieCreationTwoToneIcon />
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (
                                                                        chooseMegaRoomMode ===
                                                                        true
                                                                    ) {
                                                                        setChosenMegaRoom(
                                                                            mRoom.id,
                                                                        );
                                                                        setMegaRoomID(
                                                                            mRoom.id,
                                                                        );
                                                                    } else {
                                                                        setMegaRoomID(
                                                                            mRoom.id,
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
                                                setChooseMegaRoomMode(true);
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

            <Modal //Modal1
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
                                console.log(project);
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
                                        {project.project_name} <br />
                                        <span>گروه حاضر </span>
                                        <br />
                                        نام‌: {project.group_name}
                                        <br />
                                        جنسیت:{" "}
                                        {project.group_gender == "female"
                                            ? "دخترانه"
                                            : "پسرانه"}
                                        <br />
                                        تعداد: {project.group_number}
                                        <br />
                                    </Paper>
                                );
                            })}
                        </Stack>
                    </Box>
                </Fade>
            </Modal>

            <Modal //Modal 2
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
                            {groupValues.length !== 0 ? (
                                <span>
                                    گروه {groupValues.group.school_name}
                                </span>
                            ) : (
                                <></>
                            )}
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
                                    groupValues.room != null ? (
                                        <div>
                                            <span
                                                style={{ marginLeft: "10px" }}
                                            >
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
                                            <span
                                                style={{ marginLeft: "10px" }}
                                            >
                                                در حال تماشای طرح
                                            </span>
                                            <span
                                                style={{
                                                    color: "#526D82",
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {
                                                    groupValues.project
                                                        .project_name
                                                }
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span
                                                style={{ marginLeft: "10px" }}
                                            >
                                                در حال حاضر در
                                            </span>
                                            <span
                                                style={{
                                                    color: "#3282B8",
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {groupValues.megaRoom.name}
                                            </span>
                                            <br />
                                        </div>
                                    )
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

            <Modal //Modal 3
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open3}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 400,
                    },
                }}
            >
                <Fade in={open3}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            ابر غرفه {megaRoomWithoutGroupsValues.name}
                        </Typography>
                        {megaRoomWithoutGroupsValues.id !== 2 ? (
                            <div>
                                <span>
                                    ظرفیت :{" "}
                                    {megaRoomWithoutGroupsValues.capacity}
                                </span>
                                <br />
                            </div>
                        ) : (
                            <></>
                        )}
                        <span>
                            تعداد حال حاضر :{" "}
                            {megaRoomWithoutGroupsValues.people}
                        </span>
                        <br />
                        {megaRoomWithoutGroupsValues.id !== 2 ? (
                            <div>
                                <span style={{ color: "#754E1A" }}>
                                    تعداد باقیمانده :{" "}
                                    {megaRoomWithoutGroupsValues.capacity -
                                        megaRoomWithoutGroupsValues.people}
                                </span>
                                <br />
                            </div>
                        ) : (
                            <></>
                        )}

                        {chooseRoomMode ? (
                            <span style={{ color: "#CBA35C" }}>
                                تعداد انتخابی شما : {groupValues2.group.number}
                            </span>
                        ) : (
                            <></>
                        )}

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginTop: "10px" }}
                        >
                            {megaRoomWithoutGroupsValues.status !== "FULL" ? (
                                <div
                                    style={{
                                        // backgroundColor:
                                        //     "color(display-p3 0.9686 0.9647 1)",
                                        width: "100%",
                                        // padding: "5px",
                                    }}
                                >
                                    {megaRoomValues.map((megaRoom) => {
                                        return (
                                            <Paper
                                                sx={{
                                                    backgroundColor:
                                                        "color(display-p3 0.9686 0.9647 1)",
                                                    width: "100%",
                                                    borderRadius: "20px",
                                                    marginBottom: "11px",
                                                    display: "flex",
                                                    gap: "2px",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <Typography display="block">
                                                    {megaRoom.school_name}
                                                </Typography>
                                                <Typography display="block">
                                                    {megaRoom.gender ===
                                                    "male" ? (
                                                        "پسرانه"
                                                    ) : megaRoom.gender ===
                                                      "female" ? (
                                                        "دخترانه"
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Typography>
                                                <Typography display="block">
                                                    تعداد :{" "}
                                                    {megaRoom.number == null
                                                        ? 0
                                                        : megaRoom.number}
                                                </Typography>
                                            </Paper>
                                        );
                                    })}

                                    {chooseMegaRoomMode ? (
                                        megaRoomWithoutGroupsValues.id !== 2 ? (
                                            <div>
                                                {groupValues2.group.number <=
                                                megaRoomWithoutGroupsValues.capacity -
                                                    megaRoomWithoutGroupsValues.people ? (
                                                    <span
                                                        style={{
                                                            color: "#497D74",
                                                        }}
                                                    >
                                                        شما مجاز به انتقال گروه{" "}
                                                        {
                                                            groupValues2.group
                                                                .school_name
                                                        }{" "}
                                                        به{" "}
                                                        {
                                                            megaRoomWithoutGroupsValues.name
                                                        }{" "}
                                                        هستید
                                                    </span>
                                                ) : (
                                                    <span
                                                        style={{
                                                            color: "#DE3163",
                                                        }}
                                                    >
                                                        شما مجاز به انتقال گروه{" "}
                                                        {
                                                            groupValues2.group
                                                                .school_name
                                                        }{" "}
                                                        به{" "}
                                                        {
                                                            megaRoomWithoutGroupsValues.name
                                                        }{" "}
                                                        نیستید
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    {chooseMegaRoomMode ? (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ marginTop: "12px" }}
                                            fullWidth
                                            onClick={() => {
                                                setChosenMegaProject(
                                                    megaRoomWithoutGroupsValues.id,
                                                );
                                            }}
                                            disabled={
                                                processing ||
                                                (megaRoomWithoutGroupsValues.id !==
                                                    2 &&
                                                    groupValues2.group.number >
                                                        megaRoomWithoutGroupsValues.capacity -
                                                            megaRoomWithoutGroupsValues.people)
                                            }
                                        >
                                            انتخاب
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        // backgroundColor: "#C30E59",
                                        width: "100%",
                                    }}
                                >
                                    {megaRoomValues.map((megaRoom) => {
                                        return (
                                            <Paper
                                                sx={{
                                                    backgroundColor: "#C30E59",
                                                    color: "white",
                                                    width: "100%",
                                                    borderRadius: "20px",
                                                    marginBottom: "11px",
                                                    display: "flex",
                                                    gap: "2px",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <Typography display="block">
                                                    {megaRoom.school_name}
                                                </Typography>
                                                <Typography display="block">
                                                    {megaRoom.gender ===
                                                    "male" ? (
                                                        "پسرانه"
                                                    ) : megaRoom.gender ===
                                                      "female" ? (
                                                        "دخترانه"
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Typography>
                                                <Typography display="block">
                                                    تعداد :{" "}
                                                    {megaRoom.number == null
                                                        ? 0
                                                        : megaRoom.number}
                                                </Typography>
                                            </Paper>
                                        );
                                    })}
                                </div>
                            )}
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </MainLayout>
    );
}
