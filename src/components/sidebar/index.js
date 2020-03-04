import React from "react";
import Tree from './tree';
import {StaticQuery, graphql} from "gatsby";
import '../styles.css';
import Drawer from "@material-ui/core/Drawer";
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

const ALL_MDX = graphql`query {
  allMdx {
    edges {
      node {
        fields {
          slug
          title
        }
      }
    }
  }
}`;

const useStyles = makeStyles((theme) => ({
  drawerRoot: {
    flexShrink: 0,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingTop: 0,
    paddingBottom: 0
  },
  list: {
    width: 250,
  }
}));

const CustomSidebar = ({ items }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawerRoot}
      variant="permanent">
      <div className={classes.toolbar}/>
      <List component="div" disablePadding className={classes.list}>
        <Tree
          edges={items.edges}
        />
      </List>
    </Drawer>
  );
};

const CustomSidebarContainer = () => {
  return (
    <StaticQuery
      query={ALL_MDX}
      render={({allMdx}) => <CustomSidebar items={allMdx}/>}
      />
  );
};

export default CustomSidebarContainer;
