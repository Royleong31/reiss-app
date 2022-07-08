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
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentDetails, useMutations } from "hooks/useFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebase";
import { Alert, Skeleton } from "@mui/material";

type FormType = {
  title: string;
  content: string;
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

export default function EditPost() {
  const [user] = useAuthState(auth);
  const { id: docId } = useParams();
  const { value, loading, error: docError } = useDocumentDetails(docId ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { updatePost } = useMutations();

  const navigate = useNavigate();

  const updateHandler = async (data: FormType) => {
    if (!user || !user.uid || !docId) {
      alert("something went wrong");
      return;
    }

    try {
      setIsLoading(true);
      await updatePost(docId, { ...data, userId: user.uid });
      setError(null);
      navigate("/");
    } catch (error: any) {
      setError(error.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!value && !loading)
    return (
      <Alert sx={{ marginTop: "50px" }} severity="error">
        Post does not exist
      </Alert>
    );

  if (!!docError)
    return (
      <Alert sx={{ marginTop: "50px" }} severity="error">
        {docError?.message ?? "Error in fetching post"}
      </Alert>
    );

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
          Update Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit(updateHandler)} noValidate sx={{ mt: 1 }}>
          {loading ? (
            <>
              <Skeleton
                width="488px"
                height={75}
                sx={{ transform: "none", marginBottom: "25px" }}
              />
              <Skeleton width="488px" height={267} sx={{ transform: "none" }} />
            </>
          ) : (
            <>
              <TextField
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                autoFocus
                defaultValue={value?.title}
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register("title")}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Content"
                id="content"
                defaultValue={value?.content}
                multiline
                rows={10}
                error={!!errors.content}
                helperText={errors.content?.message}
                {...register("content")}
              />
            </>
          )}

          {loading ? (
            <Skeleton width="488px" height={38} sx={{ transform: "none", marginTop: "25px" }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading || !value}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          )}
        </Box>
      </Box>

      {!!error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
}
