import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Join Us",
  description: "Code for the common good",
};

export default async function ApplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
    </>
  );
}
