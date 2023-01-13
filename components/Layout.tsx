import React, { JSXElementConstructor } from 'react'
import Head from 'next/head'
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>E-Market Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout
