'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ConnectWallet from '@/components/connect-wallet';
import { useEffect } from 'react';
import Modal from 'react-modal';

export default function Home() {
  useEffect(() => {
    Modal.setAppElement('#home');
  }, []);
  return (
    <main
      style={{
        width: '100vw',
        color: 'black',
        background: 'rgba(28, 28, 28, 1)',
        position: 'relative'
      }}
      id='home'
    >
      <Navbar></Navbar>

      <div style={{ position: 'absolute', top: '200px', left: '20px' }}> {/* Adjust the position as needed */}
        <h1
          className='text-4xl text-left text-white align-middle'
        >
          Earth Portal
        </h1>
      </div>
      <ConnectWallet />
      <Footer />

    </main>
  );
}
