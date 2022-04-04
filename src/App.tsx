import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6"> React video player </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <VideoPlayer />
      </Container>
    </>
  );
}

export default App;
