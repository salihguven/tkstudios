import "./globals.css";

export const metadata = {
  title: "True Kinetic | Studio",
  description: "A kinetic creative studio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
