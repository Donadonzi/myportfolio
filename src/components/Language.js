import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { StylesProvider } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
        <StylesProvider injectFirst>
            <Button className="header__lang__menu" onClick={handleClick}>
              English
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link href="#">English</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link href="../../fr/public/index.html">Français</Link></MenuItem>
            </Menu>
          </StylesProvider>
    </div>  
  );
}