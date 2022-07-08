import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "config/firebase";
import { Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

type FormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password needs to be at least 8 characters long and contain at least 1 letter and number"
    ),
  confirmPassword: Yup.string().test("passwords-match", "Passwords must match", function (value) {
    return this.parent.password === value;
  }),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const [signUp, user, loading, signUpError] = useCreateUserWithEmailAndPassword(auth);

  const signUpHandler = async (data: FormType) => {
    const { email, password } = data;
    signUp(email, password);

    if (user) navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(signUpHandler)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!!loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
      </Box>

      {!!signUpError && <Alert severity="error">{signUpError?.message}</Alert>}
    </Container>
  );
}
