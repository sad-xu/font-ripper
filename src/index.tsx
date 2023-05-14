import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
  })
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
