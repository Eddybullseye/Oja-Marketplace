import './globals.css';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen transition-colors duration-200">
        <main className="pt-16 md:pt-18 pb-[72px] md:pb-0 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
