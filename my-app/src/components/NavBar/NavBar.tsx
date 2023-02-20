import { Button, ButtonGroup } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import EuroIcon from '@mui/icons-material/Euro';
import styles from './NavBar.module.css';
import { useTranslation } from 'react-i18next';

const NavBar = (): JSX.Element => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const navTo = pathname === '/' ? '/rates' : '/';
  const navPage = pathname === '/' ? 'rates' : 'converter';

  return (
    <ButtonGroup
      aria-label='outlined primary button group'
      sx={{ display: 'flex', justifyContent: 'center' }}
      className={styles.navBtn}
    >
      <Button
        component={Link}
        to={navTo}
        variant='outlined'
        className={styles.btn}
        startIcon={<EuroIcon />}
      >
        {t(`elements.${navPage}Title`)}
      </Button>
    </ButtonGroup>
  );
};

export default NavBar;
