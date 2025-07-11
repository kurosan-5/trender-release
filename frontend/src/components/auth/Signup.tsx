import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignUpButton } from './buttons';

export default function SignUpPage() {
  const [nameText, setNameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [error, setError] = useState<{ email?: string; password?: string; other?: string }>({});
  const navigate = useNavigate();

  const onChangeNameText = (value: string) => setNameText(value);
  const onChangeEmailText = (value: string) => setEmailText(value);
  const onChangePasswordText = (value: string) => setPasswordText(value);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 2,
        marginTop: 10,
      }}
    >
      <Typography variant="h4">TRENDERへようこそ</Typography>

      {error?.other && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error.other}
        </Typography>
      )}

      <TextField
        label="ユーザー名を入力"
        value={nameText}
        onChange={(e) => onChangeNameText(e.target.value)}
        error={error?.email !== undefined}
        helperText={error?.email}
        sx={{ width: 250 }}
      />

      <TextField
        label="メールアドレスを入力"
        value={emailText}
        onChange={(e) => onChangeEmailText(e.target.value)}
        error={error?.email !== undefined}
        helperText={error?.email}
        sx={{ width: 250 }}
      />

      <TextField
        label="パスワードを入力"
        value={passwordText}
        onChange={(e) => onChangePasswordText(e.target.value)}
        type="password"
        error={error?.password !== undefined}
        helperText={error?.password}
        sx={{ width: 250 }}
      />

      <SignUpButton name={nameText} email={emailText} password={passwordText} setError={setError} />

      <Button
        variant="text"
        onClick={() => navigate('/auth')}
        sx={{ width: 160 }}

      >
        戻る
      </Button>
    </Box>
  );
}