import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us",
  description: "Code for the common good",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div id="modal-root" />
    </>
  );
}
