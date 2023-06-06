import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// @ant
import { message} from 'antd';

// components
import Iconify from '../../../components/iconify';
import { http } from '../../../utils/http';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClick = async() => {
    const loginResponse = await http.post("/api/login", {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    })
    const loginResponseData = loginResponse.data
    if (loginResponseData.code !== 200) {
        message.error("登录失败")
        return
    }
    localStorage.setItem("token", loginResponseData.data.username)
    localStorage.setItem("user", JSON.stringify(loginResponseData.data))

    navigate('/', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField inputRef={usernameRef} name="email" label="username" />

        <TextField
          name="password"
          label="password"
          type={showPassword ? 'text' : 'password'}
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
