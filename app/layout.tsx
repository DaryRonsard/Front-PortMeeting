
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meeting",
  description: "Gestion des salles de réunion",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="fr">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
