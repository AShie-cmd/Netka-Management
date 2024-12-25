import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerItems from "./DrawerItems";

interface SidebarProps {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar2 = ({
    mobileOpen,
    setMobileOpen,
    setIsClosing,
}: SidebarProps) => {
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    return (
        <Box
            component="nav"
            width={{ lg: 290 }}
            flexShrink={{ lg: 0 }}
            display={{ xs: "none" }}
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: "block" } }}
            >
                <DrawerItems />
            </Drawer>

            <Drawer variant="permanent" sx={{ display: { xs: "none" } }} open>
                <DrawerItems />
            </Drawer>
        </Box>
    );
};

export default Sidebar2;