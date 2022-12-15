import '../styles/globals.css';
import AuthSessionProvider from '../context/SessionProvider';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
