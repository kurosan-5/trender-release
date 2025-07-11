import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import {useNavigate} from 'react-router-dom';
// import {SignInButton} from './buttons';

interface Error {
    email?: string
    password?: string
    other?: string
}

const SignIn = () => {
    const navigate = useNavigate();
    const [emailText, onChangeEmailText] = useState('');
    const [passwordText, onChangePasswordText] = useState('');

    const [error, setError] = useState<Error>({})


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100vh' }}
        >
            <Typography variant="h4">
                Trenderにサインイン
            </Typography>

            {error?.other && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error.other}
                </Typography>
            )}

            <TextField
                label="Email"
                variant="outlined"
                value={emailText}
                onChange={(e) => onChangeEmailText(e.target.value)}
                placeholder="Input email"
                sx={{ mb: 2, width: 250, mt: 1 }}
                helperText={error?.email}
                error={error?.email != undefined}
            />

            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={passwordText}
                onChange={(e) => onChangePasswordText(e.target.value)}
                placeholder="Input password"
                sx={{ mb: 2, width: 250 }}
                helperText={error?.password}
                error={error?.password != undefined}
            />


            {/* <SignInButton email={emailText} password={passwordText} setError={setError}/> */}

            <Button
                variant="text"
                onClick={() => navigate('/auth/signin/resetPassword')}
                sx={{ mb: 1 }}
            >
                パスワードをリセットする
            </Button>

            <Button
                variant="text"
                onClick={() => navigate('/auth')}
                sx={{ mb: 1 }}
            >
                戻る
            </Button>
        </Box>
    );
}

export default SignIn;