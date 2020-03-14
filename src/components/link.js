import React from "react";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    '&:visited': {
      textDecoration: 'none'
    }
  }
}));

const Link = ({ to, ...props }) => {
  const classes = useStyles();

  const noPropagation = e => e.stopPropagation()

  return isAbsoluteUrl(to)
    ? (<a href={to} {...props} className={classes.link} />)
    : (<GatsbyLink onClick={noPropagation} to={to} className={classes.link} {...props} />);
};

export default Link;
