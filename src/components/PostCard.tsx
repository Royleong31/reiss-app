import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { PostDoc } from "config/interfaces";
import { useMutations } from "hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface PostCardProps extends PostDoc {
  curUserId?: string;
}

export default function PostCard({ title, content, userId, id, curUserId }: PostCardProps) {
  const { deletePost } = useMutations();
  const navigate = useNavigate();

  return (
    <Card sx={{ backgroundColor: "#fafafa" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          padding: "16px",
          paddingTop: "0",
        }}
      >
        <Typography variant="caption" color="text.secondary" marginRight="auto">
          Created by: {userId}
        </Typography>

        {userId === curUserId && (
          <>
            <Button
              size="small"
              color="warning"
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit
            </Button>
            <Button
              color="error"
              size="small"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => deletePost(id)}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
