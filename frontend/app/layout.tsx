import { ThemeProvider } from "@/components/ThemeProvider";
import { TaskProvider } from "@/context/TaskContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TaskProvider>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <main>{children}</main>
            </div>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
