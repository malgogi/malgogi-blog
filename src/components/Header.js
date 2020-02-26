import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn'
import './styles.css';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import iconLoc from './images/icon.png';


const QUERY_HEADER_TITLE = graphql`
query headerTitleQuery {
  site {
    siteMetadata {
      headerTitle
      githubUrl
      helpUrl
      logo {
        link
      }
      headerLinks {
        link
        text
      }
    }
  }
}
`;

const useStyles = makeStyles((theme) => ({
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    verticalAlign: 'bottom'
  },
  title: {
    flexGrow: 1
  }
}));

const CustomHeader = ({ title, githubUrl, id,  open, onClickMenu }) => {
  const classes = useStyles();

  return (<AppBar id={id} position="sticky" color="white" className={classes.header}>

    <Toolbar>
      <IconButton edge="start" onClick={onClickMenu} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        <img src={iconLoc} className={classes.logo} width={30} height={30}/> { title }
      </Typography>
      <GitHubButton href={githubUrl} data-show-count="true" aria-label="Star on GitHub">Star</GitHubButton>
    </Toolbar>
  </AppBar>)
};

const HeaderContainer = ({ id, location, onClickMenu, open }) => {
  return (<StaticQuery
    query={QUERY_HEADER_TITLE}
    render={(data) => {
      const {
        site: {
          siteMetadata: {
            headerTitle,
            githubUrl,
            helpUrl,
            headerLinks,
          }
        }
      } = data;

      return (<CustomHeader id={id} open={open}  onClickMenu={onClickMenu} title={headerTitle} githubUrl={githubUrl} />);
    }}
  />);
};

export default HeaderContainer;
