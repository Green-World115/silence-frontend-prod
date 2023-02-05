import MuiButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Button = ({ children, loading, ...props }) => {
  return (
    <MuiButton disabled={loading} {...props}>
      {loading ? <CircularProgress color="inherit" size={25} /> : children}
    </MuiButton>
  );
};

export default Button;
