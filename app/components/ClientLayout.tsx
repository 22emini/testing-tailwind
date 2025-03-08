"use client"
import Loader from "./Loader";

export default function ClientLayout({
  children,
  geistSans,
  geistMono,
}: {
  children: React.ReactNode;
  geistSans: { variable: string };
  geistMono: { variable: string };
}) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <Loader />
      {children}
    </body>
  );
} 