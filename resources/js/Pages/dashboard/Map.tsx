// import MainLayout from "@/Layouts/main-layout";
import Analytics from "@/Components/sections/dashboard/analytics";
import DailyTraffic from "@/Components/sections/dashboard/daily-traffic";
import TotalSpent from "@/Components/sections/dashboard/total-spent";
import MapLayout from "@/Layouts/main-layout/index2";
import { Grid2 } from "@mui/material";
import Paper from "@mui/material/Paper";
import { relative } from "path";

const Map = () => {
    return (
        <MapLayout>
            <Grid2 container spacing={0} columns={18} sx={{ height: "150px" }}>
                <Grid2 size={3}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        Artka
                        <div
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
                        </div>
                    </Paper>
                </Grid2>
                <Grid2 size={1}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            bgcolor: "#f5f7fe",
                            border: "none",
                            height: "80%",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        stairs
                    </Paper>
                </Grid2>
                <Grid2 size={2}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                        }}
                    >
                        9
                    </Paper>
                </Grid2>
                <Grid2 size={2}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                        }}
                    >
                        8
                    </Paper>
                </Grid2>
                <Grid2 size={1}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            height: "80%",
                            textAlign: "center",
                        }}
                    ></Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            bgcolor: "#f5f7fe",
                            border: "none",
                            textAlign: "center",
                            height: "80%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        stairs
                    </Paper>
                </Grid2>
                <Grid2 size={1}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            height: "80%",
                            textAlign: "center",
                        }}
                    ></Paper>
                </Grid2>
                <Grid2 size={2}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                        }}
                    >
                        5
                    </Paper>
                </Grid2>
                <Grid2 size={2}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                        }}
                    >
                        4
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={0} columns={18} sx={{ height: "150px" }}>
                <Grid2 size={3}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        Notka
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
                                        width: "250%",
                                        height: "250%",
                                        borderRadius: "49.5%",
                                    }}
                                ></div>
                                <div
                                    className="wave-after"
                                    style={{
                                        width: "250%",
                                        height: "250%",
                                        borderRadius: "41%",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </Paper>
                </Grid2>
                <Grid2 size={1} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            bgcolor: "#f5f7fe",
                            border: "none",
                            height: "80%",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        stairs
                    </Paper>
                </Grid2>
                <Grid2 size={2} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        11
                    </Paper>
                </Grid2>
                <Grid2 size={2} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        10
                    </Paper>
                </Grid2>
                <Grid2 size={1} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            height: "80%",
                            textAlign: "center",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    ></Paper>
                </Grid2>
                <Grid2 size={4} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
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
                    >
                        stairs
                    </Paper>
                </Grid2>
                <Grid2 size={1} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            height: "80%",
                            textAlign: "center",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    ></Paper>
                </Grid2>
                <Grid2 size={2} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        7
                    </Paper>
                </Grid2>
                <Grid2 size={2} sx={{ position: "relative" }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 0,
                            textAlign: "center",
                            height: "80%",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        6 <br />
                        <span style={{ fontSize: "10px" }}>
                            خودکاوی، تیوری بازی
                        </span>
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={2.5} sx={{ marginTop: "44.5px" }}>
                <Grid2 size={12}>
                    <Analytics />
                </Grid2>
                <Grid2 size={6}>
                    <TotalSpent />
                </Grid2>
                <Grid2 size={6}>
                    <DailyTraffic />
                </Grid2>
            </Grid2>
        </MapLayout>
    );
};

export default Map;
