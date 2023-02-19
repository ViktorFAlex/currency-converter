import { Button, ButtonGroup } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import EuroIcon from '@mui/icons-material/Euro';
import styles from './NavBar.module.css';

const NavBar = (): JSX.Element => {
  const { pathname } = useLocation();
  const navTo = pathname === '/' ? '/rates' : '/';
  return (
    <ButtonGroup
      aria-label='outlined primary button group'
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Button
        component={Link}
        to={navTo}
        variant='outlined'
        className={styles.btn}
        startIcon={<EuroIcon />}
      >
        Exchange rates
      </Button>
    </ButtonGroup>
  );
};

export default NavBar;
