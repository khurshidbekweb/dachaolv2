import { ChildProps } from '@/types';
import React from 'react';
import Footer from './_components/footer';
import Navbar from './_components/navbar';

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