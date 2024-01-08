import React from 'react';
import { Link } from 'react-router-dom';

const SidebarButton = ({ iconPaths, label, href }) => (
    <li>
        <Link
            to={href}
            className="flex group btn btn-ghost justify-start rounded-md transition duration-75"
        >
            <svg
                className="w-5 h-5 transition duration-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
            >
                {iconPaths.map((path, index) => <path key={index} d={path} />)}
            </svg>
            <span className="ms-3">{label}</span>
        </Link>
    </li>
);

export default SidebarButton;