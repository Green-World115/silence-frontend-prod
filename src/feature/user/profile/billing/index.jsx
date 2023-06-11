import Paper from "@mui/material/Paper";
import { Content } from "./styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "components/Button";

const Billing = () => {
    return (
        <Paper elevation={3}>
            <Content>
                <Typography>
                    Current Plan: 
                </Typography>
                <Typography sx={{marginTop: "2rem"}}>
                    Days Left: 
                </Typography>
                <Typography sx={{marginTop: "2rem"}}>
                    Please Subscribe <Button href="https://www.silencetinnitusnow.com/tinnitus-pal">Here</Button>
                </Typography>
            </Content>
        </Paper>
    );
}

export default Billing;