"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider, useCart } from "./components/CartContext";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { ItemProvider } from "./components/ItemContext";
import { useState } from "react";
import { SearchProvider } from "./components/SearchContext";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <SearchProvider>
          <ItemProvider>
            <CartProvider>
              <Navbar />
              <main className="max-w-6xl mx-auto p-6 bg-white shadow-md">
                {children}
              </main>
            </CartProvider>
          </ItemProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
