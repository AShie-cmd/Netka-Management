// import MainLayout from "@/Layouts/main-layout";
import Analytics from "@/Components/sections/dashboard/analytics";
import DailyTraffic from "@/Components/sections/dashboard/daily-traffic";
import TotalSpent from "@/Components/sections/dashboard/total-spent";
import MapLayout from "@/Layouts/main-layout/index2";
import {
    Box,
    Button,
    Divider,
    Fade,
    Grid2,
    IconButton,
    Modal,
    Stack,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { relative } from "path";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DesktopWindowsTwoToneIcon from "@mui/icons-material/DesktopWindowsTwoTone";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import DirectionsTwoToneIcon from "@mui/icons-material/DirectionsTwoTone";
import PlaceTwoToneIcon from "@mui/icons-material/PlaceTwoTone";

//this is the style of the Modal
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
};

import "@/echo";
import axios from "axios";

const Map = ({ projects, megaRooms }) => {
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const [changedProject, setChangedProject] = useState();
    const [projectValue, setProjectValue] = useState([]);
    const [values, setValues] = useState(projects);
    const [megaRoomsValues, setMegaRoomsValues] = useState(megaRooms);

    useEffect(() => {
        Echo.channel("map").listen("MapRoomStatusChanged", (data) => {
            // Handle the received message data (e.g., update chat UI)
            // console.log(data);
            // setChangedProject(data.project);
            setValues(data.projects);
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

    useEffect(() => {
        axios
            .get("/map/project/" + roomName)
            .then((result) => {
                setProjectValue(result.data);
                console.log(result.data);
            })
            .catch((e) => console.log(e));
    }, [roomName]);

    // Echo.channel("map").listen("MapRoomStatusChanged", (data) => {
    //     // Handle the received message data (e.g., update chat UI)
    //     console.log(data);
    //     // .. update your chat interface with the received message
    // });

    function getPercentage(number: number, total: number) {
        return Math.round((number / total) * 100);
    }

    return (
        <MapLayout>
            <div className="floor">
                {/* <div className="floor-2">
                    <Typography
                        variant="h4"
                        sx={{ marginRight: "3px", display: "inline-block" }}
                        className="floor-number"
                    >
                        دو
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ marginLeft: "3px", display: "inline-block" }}
                        className="floor-text"
                    >
                        طبقه
                    </Typography>
                </div> */}
                {/* first */}
                <Grid2
                    container
                    spacing={1.2}
                    columns={18}
                    className="grid-container"
                    sx={{ height: "200px" }}
                >
                    <Grid2 size={3}>
                        <Paper //Netkargah
                            className={`${megaRoomsValues[1].status === "NOTFULL" ? `` : `room-present`}`}
                            variant="outlined"
                            sx={{
                                // borderRadius: 0,
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    marginRight: "3px",
                                    display: "inline-block",
                                }}
                                className="artka-notka-text"
                            >
                                🧪 نِتکارگاه
                            </Typography>
                            {/* <div
                                className="capacity"
                                style={{
                                    // position: "relative",
                                    // bottom: 0,
                                    // left: 0,
                                    display: "flex",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "45px",
                                        height: "45px",
                                        // background: "#000",
                                        border: "3px solid #fff",
                                        boxShadow: "0 0 0 3px #4973ff",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        marginBottom: "10px",
                                        marginLeft: "10px",
                                    }}
                                    id="circle"
                                >
                                    <div
                                        id="wave"
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "100%",
                                            background: "#4973ff",
                                            borderRadius: "50%",
                                            boxShadow:
                                                "inset 0 0 10px rgba(0, 0, 0, .5)",
                                        }}
                                    >
                                        <div
                                            className="wave-before"
                                            style={{
                                                width: "200%",
                                                height: "200%",
                                                borderRadius: "45%",
                                            }}
                                        ></div>
                                        <div
                                            className="wave-after"
                                            style={{
                                                width: "200%",
                                                height: "200%",
                                                borderRadius: "40%",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    gap: "8px",
                                    bottom: 0,
                                    left: 0,
                                    marginLeft: "15px",
                                    marginBottom: "12px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "light" }}
                                >
                                    ظرفیت:
                                </Typography>
                                <Typography variant="h5">۵۰٪</Typography>
                            </div> */}
                        </Paper>
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        {/* <Paper
                        variant="outlined"
                        className="stairs-end-2"
                        sx={{
                            borderRadius: 0,
                            bgcolor: "#f5f7fe",
                            border: "none",
                            height: "80%",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            bottom: 0,
                            position: "absolute",
                            width: "100%",
                        }}
                    >
                        stairs
                    </Paper> */}
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // Room 1
                            variant="outlined"
                            className={`grid-items ${values[0].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                width: "100%",
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                top: 0,
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>1</span>
                                <span
                                    className={`${values[0].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[0].project_name}
                                </span>
                                <span
                                    className={`${values[1].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[1].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(1);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // Room 6
                            variant="outlined"
                            className={`grid-items ${values[10].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                width: "100%",
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>6</span>
                                <span
                                    className={`${values[10].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[10].project_name}
                                </span>
                                <span
                                    className={`${values[11].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[11].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(6);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                    <Grid2 size={1}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                width: "100%",
                                // borderRadius: 0,
                                height: "80%",
                                textAlign: "center",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2
                        size={4}
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Paper
                            variant="outlined"
                            className="stairs-middle"
                            sx={{
                                borderRadius: 0,
                                bgcolor: "#f5f7fe",
                                border: "none",
                                textAlign: "center",
                                height: "65.3%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                position: "absolute",
                                top: 0,
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={1}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                // borderRadius: 0,
                                width: "100%",
                                height: "80%",
                                textAlign: "center",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper //Room 5
                            variant="outlined"
                            className={`grid-items ${values[8].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                width: "100%",
                                textAlign: "center",
                                height: "80%",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>5</span>
                                <span
                                    className={`${values[8].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[8].project_name}
                                </span>
                                <span
                                    className={`${values[9].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[9].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(5);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // Room 3
                            variant="outlined"
                            className={`grid-items ${values[4].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                width: "100%",
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                flexDirection: "column",
                                position: "absolute",
                                display: "flex",
                                top: 0,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>3</span>
                                <span
                                    className={`${values[4].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[4].project_name}
                                </span>
                                <span
                                    className={`${values[5].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[5].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(3);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={1.2} columns={18}>
                    <Grid2 size={9}></Grid2>
                    <Grid2
                        size={4}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{ marginRight: "3px", display: "inline-block" }}
                            className="floor-number"
                        >
                            دو
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{ marginLeft: "3px", display: "inline-block" }}
                            className="floor-text"
                        >
                            طبقه
                        </Typography>
                    </Grid2>
                    <Grid2 size={5}></Grid2>
                </Grid2>

                {/* second */}
                <Grid2
                    container
                    spacing={1.2}
                    columns={18}
                    className="grid-container"
                    sx={{ height: "200px", marginTop: "-15px" }}
                >
                    <Grid2 size={3}>
                        <Paper //Notka
                            className={`${megaRoomsValues[0].status === "NOTFULL" ? `` : `room-present`}`}
                            variant="outlined"
                            sx={{
                                // borderRadius: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    marginRight: "3px",
                                    display: "inline-block",
                                }}
                                className="artka-notka-text"
                            >
                                🎵 نُتکا
                            </Typography>
                            <div
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    gap: "8px",
                                    bottom: 0,
                                    left: 0,
                                    marginLeft: "15px",
                                    marginBottom: "12px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "light" }}
                                >
                                    درصد حضور:
                                </Typography>
                                <Typography variant="h5">
                                    {getPercentage(
                                        megaRoomsValues[0].people,
                                        megaRoomsValues[0].capacity,
                                    )}
                                    %
                                </Typography>
                            </div>
                        </Paper>
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="stairs-end"
                            sx={{
                                borderRadius: 0,
                                bgcolor: "#f5f7fe",
                                border: "none",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // Room 7
                            variant="outlined"
                            className={`grid-items ${values[12].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>7</span>
                                <span
                                    className={`${values[12].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[12].project_name}
                                </span>
                                <span
                                    className={`${values[13].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[13].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(7);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // 🚫
                            variant="outlined"
                            className="grid-items"
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                            }}
                        >
                            <Typography variant="h5">🚫 </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                // borderRadius: 0,
                                height: "80%",
                                textAlign: "center",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={4} sx={{ position: "relative" }}>
                        {/* <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            bgcolor: "#f5f7fe",
                            border: "none",
                            textAlign: "center",
                            height: "65.3%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    > */}
                        {/* Netka Office */}
                        <Grid2
                            container
                            columns={5}
                            spacing={0.6}
                            sx={{
                                height: "56%",
                                // display: "flex",
                                // alignItems: "center",
                                // justifyContent: "center",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        >
                            <Grid2 size={1}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        height: "100%",
                                        borderRadius: "10px",
                                        fontSize: "13px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    مدیریت
                                </Paper>
                            </Grid2>
                            <Grid2 size={3}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "10px",
                                    }}
                                >
                                    اتاق استراحت
                                </Paper>
                            </Grid2>
                            <Grid2 size={1}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        height: "100%",
                                        borderRadius: "10px",
                                        fontSize: "13px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <span
                                            style={{
                                                display: "flex",
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            نتکا
                                        </span>
                                        <span>دفتر</span>
                                    </div>
                                </Paper>
                            </Grid2>
                        </Grid2>
                        {/* </Paper> */}
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                // borderRadius: 0,
                                height: "80%",
                                textAlign: "center",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // Room 4
                            variant="outlined"
                            className={`grid-items ${values[6].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>4</span>
                                <span
                                    className={`${values[6].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[6].project_name}
                                </span>
                                <span
                                    className={`${values[7].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[7].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(4);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // Room 2
                            variant="outlined"
                            className={`grid-items ${values[2].room_status === "WAITING" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.001px",
                                }}
                            >
                                <span style={{ marginBottom: "4px" }}>2</span>
                                <span
                                    className={`${values[2].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[2].project_name}
                                </span>
                                <span
                                    className={`${values[3].project_status === "WAITING" ? `` : `presentation-text`}`}
                                    style={{
                                        fontSize: "17px",
                                    }}
                                >
                                    {projects[3].project_name}
                                </span>
                            </div>
                            <Stack
                                justifyContent={"center"}
                                alignContent={"center"}
                                sx={{
                                    marginTop: "6px",
                                }}
                            >
                                <IconButton
                                    onClick={() => {
                                        setRoomName(2);
                                        handleOpen();
                                    }}
                                >
                                    <DesktopWindowsTwoToneIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    </Grid2>
                </Grid2>
            </div>

            <Grid2 container spacing={1.2} columns={18}>
                <Grid2 size={9}></Grid2>
                <Grid2 size={4}>
                    <div className="divider-container">
                        <div className="divider"></div>
                        {/* <Divider /> */}
                        {/* <hr /> */}
                    </div>
                </Grid2>
                <Grid2 size={5}></Grid2>
            </Grid2>

            <div className="floor">
                {/* <div className="floor-3">
                    <Typography
                        variant="h4"
                        sx={{ marginRight: "3px", display: "inline-block" }}
                        className="floor-number"
                    >
                        یک
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ marginLeft: "3px", display: "inline-block" }}
                        className="floor-text"
                    >
                        طبقه
                    </Typography>
                </div> */}

                {/* third */}
                <Grid2
                    container
                    spacing={1.2}
                    columns={18}
                    className="grid-container"
                    sx={{ height: "200px", marginTop: "32px" }}
                >
                    <Grid2 size={3}>
                        <Paper
                            variant="outlined"
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                width: "100%",
                                borderBottom: "none",
                                borderRadius: "20px",
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            }}
                        >
                            {/* <NorthRoundedIcon
                            sx={{
                                fontSize: "63px",
                                color: "#000",
                                // bottom: "50%",
                                position: "absolute",
                            }}
                        /> */}
                            {/* <Typography
                                className="transform-origin text-floor-up floor-number"
                                sx={{
                                    // left: 0,
                                    position: "absolute",
                                    bottom: "0",

                                    background: "none",

                                    transform: "rotate(90deg)",
                                    color: "black",
                                }}
                                variant="h2"
                            >
                                {/* <NorthRoundedIcon
                                sx={{
                                    transform: "rotate(-90deg)",
                                    fontWeight: "bolder",
                                    paddingBottom: "8px",
                                    fontSize: "40px",
                                }}
                            /> */}
                            {/* یک */}
                            {/* </Typography>  */}
                            <Typography
                                className="transform-origin text-floor-down floor-text"
                                sx={{
                                    // left: 0,
                                    position: "absolute",
                                    bottom: 0,
                                    marginBottom: "39px",

                                    background: "none",

                                    transform: "rotate(270deg)",
                                }}
                                variant="h4"
                                // fontFamily="Vazir"
                            >
                                به سمت
                                <PlaceTwoToneIcon
                                    sx={{
                                        paddingLeft: "5px",
                                    }}
                                />
                            </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="stairs-end-2"
                            sx={{
                                borderRadius: 0,
                                bgcolor: "#f5f7fe",
                                border: "none",
                                height: "50%",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                position: "absolute",
                                bottom: "7px",
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={2}>
                        <Paper // 🎬 3
                            variant="outlined"
                            className={`grid-items ${megaRoomsValues[5].status === "NOTFULL" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            🎬 ۳
                        </Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper //  🎬 2
                            variant="outlined"
                            className={`grid-items ${megaRoomsValues[4].status === "NOTFULL" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "69%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            🎬 ۲
                        </Paper>
                    </Grid2>
                    <Grid2 size={1}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                width: "100%",
                                // borderRadius: 0,
                                height: "80%",
                                textAlign: "center",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={4}>
                        <Paper
                            variant="outlined"
                            className="stairs-middle"
                            sx={{
                                borderRadius: 0,
                                bgcolor: "#f5f7fe",
                                border: "none",
                                textAlign: "center",
                                height: "65.3%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={1}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                // borderRadius: 0,
                                width: "100%",
                                height: "80%",
                                textAlign: "center",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={4}>
                        <Paper // NAGHALIKA
                            variant="outlined"
                            className={`grid-items ${megaRoomsValues[2].status === "NOTFULL" ? `` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                width: "100%",
                                textAlign: "center",
                                height: "80%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    marginRight: "3px",
                                    display: "inline-block",
                                }}
                                className="artka-notka-text"
                            >
                                🧌 نقالی خوانی
                            </Typography>
                            <div
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    gap: "8px",
                                    bottom: 0,
                                    left: 0,
                                    marginLeft: "15px",
                                    marginBottom: "12px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "light" }}
                                >
                                    درصد حضور:
                                </Typography>
                                <Typography variant="h5">
                                    {getPercentage(
                                        megaRoomsValues[2].people,
                                        megaRoomsValues[2].capacity,
                                    )}
                                    %
                                </Typography>
                            </div>
                        </Paper>
                    </Grid2>
                    {/* <Grid2 size={2}>
                        <Paper
                            variant="outlined"
                            className="grid-items"
                            sx={{
                                width: "100%",
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                            }}
                        >
                            4
                        </Paper>
                    </Grid2> */}
                </Grid2>

                <Grid2 container spacing={1.2} columns={18}>
                    <Grid2 size={9}></Grid2>
                    <Grid2 size={4}>
                        <div
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <span>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        marginRight: "3px",
                                        display: "inline-block",
                                    }}
                                    className="floor-number"
                                >
                                    یک
                                </Typography>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        marginLeft: "3px",
                                        display: "inline-block",
                                    }}
                                    className="floor-text"
                                >
                                    طبقه
                                </Typography>
                            </span>
                        </div>
                    </Grid2>
                    <Grid2 size={5}></Grid2>
                </Grid2>
                {/* forth */}
                <Grid2
                    container
                    spacing={1.2}
                    columns={18}
                    className="grid-container"
                    sx={{ height: "200px", marginTop: "-32px" }}
                >
                    <Grid2 size={3}>
                        <Paper
                            variant="outlined"
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                // marginTop: "-10px",
                                borderTop: "none",
                                borderRadius: "20px",
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}
                        >
                            <Typography
                                className="transform-origin text-floor-up floor-number"
                                sx={{
                                    // left: 0,
                                    position: "absolute",
                                    top: "0",
                                    marginTop: "47px",
                                    background: "none",

                                    transform: "rotate(270deg)",
                                    color: "black",
                                }}
                                variant="h4"
                            >
                                <NorthRoundedIcon
                                    sx={{
                                        fontWeight: "bolder",
                                        paddingBottom: "8px",
                                        fontSize: "40px",
                                    }}
                                />
                                طبقه بالا
                            </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="stairs-end-2"
                            sx={{
                                borderRadius: 0,
                                bgcolor: "#f5f7fe",
                                border: "none",
                                height: "40%",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                position: "absolute",
                                top: "7px",
                                width: "100%",
                                // backgroundColor: "aqua",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // 🚫
                            variant="outlined"
                            className="grid-items"
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                            }}
                        >
                            <Typography variant="h5">🚫 </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper // 🎬 1
                            variant="outlined"
                            className={`grid-items ${megaRoomsValues[3].status === "NOTFULL" ? `room-free` : `room-present`}`}
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            🎬 ۱
                        </Paper>
                    </Grid2>
                    <Grid2 size={1} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="wall grid-items"
                            sx={{
                                // borderRadius: 0,
                                height: "80%",
                                textAlign: "center",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    <Grid2 size={5} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="grid-items"
                            sx={{
                                borderRadius: 0,
                                bgcolor: "#f5f7fe",
                                border: "none",
                                textAlign: "center",
                                height: "80%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        ></Paper>
                    </Grid2>
                    {/* <Grid2 size={1} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            // borderRadius: 0,
                            height: "80%",
                            textAlign: "center",
                            position: "absolute",
                            bottom: 0,
                            width: "90%",
                        }}
                    ></Paper>
                </Grid2> */}
                    {/* <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="grid-items room-free"
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                            }}
                        >
                            7
                        </Paper>
                    </Grid2> */}
                    {/* <Grid2 size={2} sx={{ position: "relative" }}>
                        <Paper
                            variant="outlined"
                            className="grid-items room-present"
                            sx={{
                                // borderRadius: 0,
                                textAlign: "center",
                                height: "80%",
                                position: "absolute",
                                bottom: 0,
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <div
                                // spacing={0.7}
                                // direction="column"
                                // justifyContent={"center"}
                                // alignItems={"center"}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {/* <span
                                style={{
                                    fontSize: "10px",
                                    marginBottom: "4px",
                                }}
                            >
                                خودکاوی، تیوری بازی
                            </span> */}
                    {/* <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.001px",
                                    }}
                                >
                                    <span style={{ marginBottom: "4px" }}>
                                        6
                                    </span>
                                    <span
                                        className="presentation-text"
                                        style={{
                                            fontSize: "17px",
                                        }}
                                    >
                                        خودکاوی
                                    </span>
                                    <span>تیوری بازی</span>
                                </div> */}

                    {/* <Stack
                                    justifyContent={"center"}
                                    alignContent={"center"}
                                    sx={{
                                        marginTop: "6px",
                                    }}
                                >
                                    <IconButton
                                        onClick={() => {
                                            setRoomName("the");
                                            handleOpen();
                                        }}
                                    >
                                        <DesktopWindowsTwoToneIcon />
                                    </IconButton>
                                </Stack> */}
                    {/* <Stack
                                    direction="row"
                                    spacing={0.65}
                                    justifyContent={"center"}
                                    alignContent={"center"}
                                    divider={
                                        <Divider
                                            orientation="vertical"
                                            flexItem
                                        />
                                    }
                                >
                                    <IconButton
                                        color="success"
                                        aria-label="delete"
                                    >
                                        <CancelPresentationIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <CoPresentIcon />
                                    </IconButton>
                                </Stack> */}
                    {/* </div>
                    </Paper>
                    </Grid2>  */}
                </Grid2>
            </div>

            {/* <Grid2 container spacing={2.5} sx={{ marginTop: "44.5px" }}>
                <Grid2 size={12}>
                    <Analytics />
                </Grid2>
                <Grid2 size={6}>
                    <TotalSpent />
                </Grid2>
                <Grid2 size={6}>
                    <DailyTraffic />
                </Grid2>
            </Grid2> */}

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
                            {roomName} غرفه شماره
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginTop: "10px" }}
                        >
                            {projectValue.length != 0 ? (
                                projectValue.map((project) => {
                                    return (
                                        <Paper
                                            sx={{
                                                backgroundColor:
                                                    "color(display-p3 0.9686 0.9647 1)",
                                                width: "100%",
                                            }}
                                        >
                                            {project.project_name}
                                            {project.group_id != null ? (
                                                <span>
                                                    در حال ارائه برای گروه{" "}
                                                    {project.group_name}
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Paper>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </MapLayout>
    );
};

export default Map;
