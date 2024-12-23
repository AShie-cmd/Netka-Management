import {useState, ChangeEvent, FormEvent, FormEventHandler} from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconifyIcon from '@/components/base/IconifyIcon';
import AuthLayout from "@/Layouts/auth-layout";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";

interface User {
    [key: string]: string;
}

const SignUp = ({
                    status,
                    canResetPassword
                }: {
    status?: string;
    canResetPassword: boolean;
}) => {
    // const [user, setUser] = useState<User>({name: '', email: '', password: ''});
    // const [showPassword, setShowPassword] = useState(false);
    //
    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setUser({...user, [e.target.name]: e.target.value});
    // };
    //
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(user);
    // };

    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Stack
                mx="auto"
                width={410}
                height="auto"
                minHeight={800}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box width={1}>
                    <Button
                        variant="text"
                        component={Link}
                        href="/"
                        sx={{ml: -1.75, pl: 1, pr: 2}}
                        startIcon={
                            <IconifyIcon
                                icon="ic:round-keyboard-arrow-left"
                                sx={(theme) => ({fontSize: `${theme.typography.h3.fontSize} !important`})}
                            />
                        }
                    >
                        Back to dashboard
                    </Button>
                </Box>

                <Box width={1}>
                    <Typography variant="h3">Sign Up</Typography>
                    <Typography mt={1.5} variant="body2" color="text.disabled">
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                    </Typography>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        startIcon={<IconifyIcon icon="logos:management"/>}/**/
                        sx={{
                            mt: 4,
                            fontWeight: 600,
                            bgcolor: 'info.main',
                            '& .MuiButton-startIcon': {mr: 1.5},
                            '&:hover': {bgcolor: 'info.main'},
                        }}
                    >
                        Visit Netka Management
                    </Button>

                    <Divider sx={{my: 3}}>or</Divider>

                    <Box component="form" onSubmit={submit}>
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            label="Name"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            variant="filled"
                            placeholder="Your Name"
                            autoComplete="name"
                            sx={{mt: 3}}
                            fullWidth
                            autoFocus
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            // type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            variant="filled"
                            placeholder="Min. 8 characters"
                            autoComplete="current-password"
                            sx={{mt: 6}}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        sx={{
                                            opacity: user.password ? 1 : 0,
                                            pointerEvents: user.password ? 'auto' : 'none',
                                        }}
                                    >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{border: 'none', bgcolor: 'transparent !important'}}
                                            edge="end"
                                        >
                                            <IconifyIcon
                                                icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                                                color="neutral.main"
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button type="submit" variant="contained" size="large" sx={{mt: 3}} fullWidth>
                            Sign Up
                        </Button>
                    </Box>

                    <Typography
                        mt={3}
                        variant="body2"
                        textAlign={{xs: 'center', md: 'left'}}
                        letterSpacing={0.25}
                    >
                        Already have an account?{' '}
                        <Link href='/login' color="primary.main" fontWeight={600}>
                            Let's Sign in
                        </Link>
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.disabled" fontWeight={500}>
                    © 2024 Netka. Made with ❤️ by{' '}
                    <Link href="#" target="_blank" rel="noreferrer" fontWeight={600}>
                        {'Alireza Shie'}
                    </Link>{' '}
                </Typography>
            </Stack>
        </AuthLayout>
    );
};

export default SignUp;
