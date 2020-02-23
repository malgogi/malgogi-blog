import React from "react";
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from "../link";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const TreeNode = ({className = '', setCollapsed, collapsed, url, title, items, ...rest}) => {
  const isCollapsed = collapsed[url];
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
  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;
  return (
    <ListItem>
      {title && (
        <Link
          to={url}
        >
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button
              onClick={collapse}
              aria-label='collapse'
              className='collapser'>
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>)
      }

      {!isCollapsed && hasChildren ? (
        <List>
          {items.map((item) => (
            <TreeNode
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </List>
      ) : null}
    </ListItem>
  );
}
export default TreeNode
