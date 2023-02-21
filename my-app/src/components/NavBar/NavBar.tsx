import EuroIcon from '@mui/icons-material/Euro';
import { Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = (): JSX.Element => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const navTo = pathname === '/' ? '/rates' : '/';
  const navPage = pathname === '/' ? 'rates' : 'converter';

  return (
    <ButtonGroup
      aria-label='outlined primary button group'
      sx={{ display: 'flex', justifyContent: 'center' }}
      className={styles.navGroup}
    >
      <Button
        component={Link}
        to={navTo}
        variant='outlined'
        className={styles.navBtn}
        startIcon={<EuroIcon />}
      >
        {t(`elements.${navPage}Title`)}
      </Button>
    </ButtonGroup>
  );
};

export default NavBar;
