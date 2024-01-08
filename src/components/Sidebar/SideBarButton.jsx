import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const SidebarButton = ({ iconPaths, label, href }) => (
  <li>
    <ScrollLink
      activeClass="active"
      to={href.slice(1)} // remove the '#' from the start of the id
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
    >
<button className='flex justify-start btn btn-ghost w-full rounded-lg'>{label}</button>    
</ScrollLink>
  </li>
);

export default SidebarButton;