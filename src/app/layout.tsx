import Titlebar from "../components/Titlebar";
import Navbar from "../components/Navbar";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "white" }}>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
