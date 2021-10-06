import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';

export default function ExploreFoodArea() {
  return (
    <div>
      <header className="header">
        <Header
          title="Explorar Origem"
        />
        <SearchInput />
      </header>
      <Footer />
    </div>
  );
}
