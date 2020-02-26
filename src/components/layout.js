import React, { useState } from "react";
import styled from "@emotion/styled";
import { MDXProvider } from "@mdx-js/react";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import Header from './Header';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';


const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  margin-top: 90px;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    margin-top: 3rem;
  }
`;

const MaxWidth = styled('div')`

  @media only screen and (max-width: 70rem) {
    width: 100%;
    position: relative;
  }
`;
const LeftSideBarWidth = styled('div')`
  width: 298px;
`;
const RightSideBarWidth = styled('div')`
  width: 224px;
`;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    console.log('click')
    const anchor = window.document.querySelector('#back-to-top-anchor');

    console.log(anchor)
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation"  className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const Layout = ({ children, location, window }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <Header location={location} onClickMenu={() => setOpenSidebar(!openSidebar)}/>
      <div id="back-to-top-anchor"/>
      <Wrapper>
        {
          openSidebar && (
            <LeftSideBarWidth className={ openSidebar ? '' : 'hiddenMobile'}>
              <Sidebar location={location} />
            </LeftSideBarWidth>
          )
        }
        
        <Content>
          <MaxWidth>{children}</MaxWidth>
        </Content>
      </Wrapper>
      <ScrollTop {...{ children }}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </MDXProvider>
  </ThemeProvider>
  )
};

export default Layout;
