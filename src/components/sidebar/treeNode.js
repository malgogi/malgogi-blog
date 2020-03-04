import React from "react";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import config from '../../../config';
import Link from "../link";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  nestedList: {
    borderLeft: '10px solid #542683'
  }
}));

const TreeNode = ({className = '', setCollapsed, first, collapsed, url, title, prefix, items, ...rest}) => {
  const isCollapsed = collapsed[url];
  const classes = useStyles();
  const collapse = () => {
    setCollapsed(url);
  }
  const hasChildren = items.length !== 0;
  let location;
  if(typeof(document) != 'undefined') {
    location = document.location;
  }

  const active =
    location && (location.pathname === url || location.pathname === (config.gatsby.pathPrefix + url));

  return (
    <React.Fragment>
    <ListItem component="div" disablePadding divider={!first}>
      {title && (
        <React.Fragment>
        <ListItemText color={active ? "secondary" : "primary" } className={classes.content}>
            <Link
              to={url}
            >
            {title}
            </Link>
          </ListItemText>

          { title && hasChildren ? (
            <IconButton
              onClick={collapse} variant="outlined">
              {!isCollapsed ?  <ExpandMore /> : <ExpandLess />}
            </IconButton>
          ) : null}
        </React.Fragment>)
      }
    </ListItem>

    {!isCollapsed && hasChildren ? (<Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nestedList}>
          {items.map((item, idx) => (
            <TreeNode
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </List>
      </Collapse>
    ) : null}
    </React.Fragment>
  );
}
export default TreeNode
