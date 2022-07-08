import { Alert, AlertTitle, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCollectionDetails } from "hooks/useFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebase";
import PostCard from "components/PostCard";
import SkeletonList from "components/SkeletonList";

export default function Home() {
  const { documents, loading, error } = useCollectionDetails();
  const [user] = useAuthState(auth);

  const renderedPosts = () => (
    <>
      {documents.length === 0 && <Typography variant="h5">No posts yet</Typography>}
      {documents?.map((post, index) => (
        <PostCard {...post} key={index} curUserId={user?.uid ?? undefined} />
      ))}
    </>
  );

  return (
    <Container component="main" maxWidth="md" sx={{ padding: "50px 0" }}>
      {!!error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error?.message ?? "Something went wrong"}
        </Alert>
      )}

      {!error && <Stack rowGap="25px">{loading ? <SkeletonList /> : renderedPosts()}</Stack>}
    </Container>
  );
}
