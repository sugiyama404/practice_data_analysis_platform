'use client';
//@ts-ignore
import Link from 'next/link';

import Hamburger from './hamburger';

export const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
                <Link className="nav-brand text-white" href="/">ペン屋本舗</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-white" href="/">Home</Link>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <Hamburger />
                    </ul>
                </div>
            </nav>
        </header>
    );
};
