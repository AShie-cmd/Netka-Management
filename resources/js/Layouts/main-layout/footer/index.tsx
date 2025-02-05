import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
    return (
        <Typography
            mt={0.5}
            px={1}
            py={3}
            color="text.secondary"
            variant="body2"
            sx={{ textAlign: { xs: "center", md: "right" } }}
            letterSpacing={0.5}
            fontWeight={500}
        >
            Made with ❤️ by{" "}
            <Link href="#" target="_blank" rel="noreferrer" fontWeight={600}>
                {"Alireza Shie"}
            </Link>
            {", "}
            All Rights Reserved ©️
            <Link href="#" target="_blank" rel="noreferrer" fontWeight={600}>
                {"Netka 23"}
            </Link>
        </Typography>
        // <Typography variant="body2" color="text.disabled" fontWeight={500}>
        //     © 2024 Netka.
        // </Typography>
    );
};

export default Footer;
