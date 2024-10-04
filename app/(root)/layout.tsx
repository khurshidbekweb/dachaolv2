import { ChildProps } from '@/types';
import React from 'react';
import Navbar from './_components/Navbar';
import Footer from './_components/footer';

const Layout = ({children}: ChildProps) => {
    return (
        <>
            <Navbar/>
            <div className='container'>
                {children}
            </div>
            <Footer/>
        </>
    );
};

export default Layout;