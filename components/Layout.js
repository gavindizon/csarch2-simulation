import React from "react";
import navData from "../data/nav.json";
import Link from "next/link";
import Head from "next/head";
import styles from "./Layout.module.css";
const Layout = ({ children, active, title }) => {
    const year = new Date().getFullYear();
    return (
        <>
            <Head>
                <title>Unicode Simulation Project</title>
                <meta name="description" content="CSARCH2 Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className="flex justify-between items-center px-2 py-4 bg-gray-50 fixed w-full left-0 top-0 z-10">
                <Link href={"/"}>
                    <a className="text-4xl font-light">
                        <span className="font-medium text-green-600">UNI</span>CODE
                    </a>
                </Link>
            </nav>
            <main className="min-h-screen flex justify-center items-center">{children}</main>
            <footer className="text-center text-white text-sm bg-gray-900 py-16">
                <p>DIZON • ESQUIVEL • GREGORIO • MANUEL • PALMARES • TANG • UY</p>
                <p className="pt-4 pb-16">©{year}. CSARCH2 S14 Group 6. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
