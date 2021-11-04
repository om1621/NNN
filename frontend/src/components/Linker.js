import React from "react";
import { Link } from "react-router-dom";
function Linker({ children, ...props }) {
  return (
    <Link {...props} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  );
}

export default Linker;
