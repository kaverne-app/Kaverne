import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaverne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
