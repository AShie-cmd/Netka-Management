import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Typography
      mt={0.5}
      px={1}
      py={3}
      color="text.secondary"
      variant="body2"
      sx={{ textAlign: { xs: 'center', md: 'right' } }}
      letterSpacing={0.5}
      fontWeight={500}
    >
      All Rights Reserved ©️
      <Link href="#" target="_blank" rel="noreferrer" fontWeight={600}>
        {'Netka 23'}
      </Link>
    </Typography>
  );
};

export default Footer;
