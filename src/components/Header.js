import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn'
import './styles.css';
import config from '../../config.js';

import Loadable from 'react-loadable';
import LoadingProvider from './mdxComponents/loading';

const help = require('./images/help.svg');
const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];
if(isSearchEnabled && config.header.search.indexName) {
  searchIndices.push(
    { name: `${config.header.search.indexName}`, title: `Results`, hitComp: `PageHit` },
  );
}

import Sidebar from "./sidebar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const LoadableComponent = Loadable({
  loader: () => import('./search/index'),
  loading: LoadingProvider,
});

function myFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const QUERY_HEADER_TITLE = graphql`
query headerTitleQuery {
  site {
    siteMetadata {
      headerTitle
      githubUrl
      helpUrl
      logo {
        link
        image
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
  title: {
    flexGrow: 1
  }
}));

const CustomHeader = ({ title, githubUrl }) => {
  const classes = useStyles();

  return (<AppBar position="absolute" color="white">

    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        { title }
      </Typography>
      <GitHubButton href={githubUrl} data-show-count="true" aria-label="Star on GitHub">Star</GitHubButton>
    </Toolbar>
  </AppBar>)
};

const HeaderContainer = ({location}) => {
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

      return (<CustomHeader title={headerTitle} githubUrl={githubUrl} />);
    }}
  />);
};

export default HeaderContainer;
