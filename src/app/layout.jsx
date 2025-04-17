import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'IGR Dashboard',
  description: 'Income Generated from Registration Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="min-h-screen bg-gray-100">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
} 