import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutations } from "hooks/useFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebase";
import { Alert } from "@mui/material";

type FormType = {
  title: string;
  content: string;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { createPost } = useMutations();
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const createHandler = async (data: FormType) => {
    if (!user || !user.uid) {
      alert("something went wrong");
      return;
    }

    try {
      setIsLoading(true);
      await createPost({ ...data, userId: user.uid });
      setError(null);
      navigate("/");
    } catch (error: any) {
      setError(error.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit(createHandler)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            autoFocus
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Content"
            id="content"
            multiline
            rows={10}
            error={!!errors.content}
            helperText={errors.content?.message}
            {...register("content")}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Box>

      {!!error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}
