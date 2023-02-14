import { Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import EuroIcon from '@mui/icons-material/Euro';
import styles from './NavBar.module.css';

const NavBar = (): JSX.Element => (
  <ButtonGroup
    aria-label='outlined primary button group'
    sx={{ display: 'flex', justifyContent: 'center' }}
  >
    <Button
      component={Link}
      to='/rates'
      variant='outlined'
      className={styles.btn}
      startIcon={<EuroIcon />}
    >
      Exchange rates
    </Button>
  </ButtonGroup>
);

export default NavBar;
