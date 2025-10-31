import './globals.css';

export const metadata = {
  title: 'FHEVM Next.js Demo - Privacy-Preserving Applications',
  description: 'Complete Next.js demonstration using Universal FHEVM SDK for building privacy-preserving dApps with Fully Homomorphic Encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 min-h-screen">
        {children}
      </body>
    </html>
  );
}
