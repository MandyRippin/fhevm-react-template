export const metadata = {
  title: 'Anonymous Sports Voting - FHEVM',
  description: 'Privacy-preserving voting application using Fully Homomorphic Encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
