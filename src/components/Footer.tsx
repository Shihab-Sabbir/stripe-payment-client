// components/Footer.js

import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; {new Date().getFullYear()} SRS Production. All rights reserved.</p>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-white mr-4"><FaFacebook /></a>
            <a href="#" className="text-white"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
