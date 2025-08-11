export const metadata = {
  title: 'julian munyard — modeling',
  description: 'Selected looks',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
