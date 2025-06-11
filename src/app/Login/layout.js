
'use client';

import './globals.css';
import { AuthProvider } from '../Login/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}