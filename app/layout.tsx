import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLZ",
  icons: {
    icon: "/SsalmukdanLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[MaplestoryOTFBold]">{children}</body>
    </html>
  );
}
