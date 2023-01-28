import React, { useState } from "react";
import { Container, ToggleButton, ToggleButtonGroup } from "./styled";
import { FormLabel, styled } from "@mui/material";

import MuiSlider from "../../../../components/mui-form/Slider";

const Slider = ({ label }) => {
  const [side, setSide] = useState([]);
  const handleChangeSide = (_event, newSides) => setSide(newSides);
  return (
    <div>
      <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
      <Container>
        <MuiSlider valueLabelDisplay="auto" min={0} max={100} />
        <ToggleButtonGroup size="small" aria-label="text formatting" value={side} onChange={handleChangeSide}>
          <ToggleButton value="left" disableRipple>
            L
          </ToggleButton>
          <ToggleButton value="right" disableRipple>
            R
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </div>
  );
};

export default Slider;
