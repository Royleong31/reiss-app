import { ReactNode } from "react";
import Navbar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}
