import { useState, PropsWithChildren } from "react";
import Stack from "@mui/material/Stack";
import Sidebar2 from "@/layouts/main-layout/sidebar/index2";
import Topbar2 from "./topbar/index2";
import Footer from "./footer";

const MapLayout = ({ children }: PropsWithChildren) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    return (
        <Stack width={1} minHeight="100vh">
            <Sidebar2
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                setIsClosing={setIsClosing}
            />
            <Stack
                component="main"
                direction="column"
                px={3.5}
                flexGrow={1}
                width={{ xs: 1, lg: "calc(100% - 290px)" }}
            >
                <Topbar2
                    isClosing={isClosing}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />
                {children}
                <Footer />
            </Stack>
        </Stack>
    );
};

export default MapLayout;
