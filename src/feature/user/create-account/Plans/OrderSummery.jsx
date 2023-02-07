import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { PlansContainer, SummeryContainer } from "./styled";

const OrderSummery = () => {
  return (
    <div>
      <Typography variant="subtitle1">Order summery</Typography>
      <SummeryContainer>
        <Typography variant="h4" fontWeight="bold">
          Tinnitus Pal
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>30-days recurring plan</Typography>
          <Typography>$83.76</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip label="Discount -20%" size="small" sx={{ fontSize: 12 }} />
          <Typography>$83.76</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography fontWeight={600}>Total</Typography>
          <Typography fontWeight={600}>$83.76</Typography>
        </Box>
        <Stack sx={{ mt: 6 }} spacing={2}>
          <PlansContainer>
            <Typography variant="h5" fontWeight={700}>
              Tinnitus Pal
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption">Live streams, groups, bonus content</Typography>
              <Typography color="primary.light">Unlock immediately</Typography>
            </Box>
          </PlansContainer>

          <PlansContainer>
            <Typography variant="h5" fontWeight={700}>
              LITE
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption">Learn more about LITE</Typography>
              <Typography color="primary.light">Unlock in 65 days</Typography>
            </Box>
          </PlansContainer>

          <PlansContainer>
            <Typography variant="h5" fontWeight={700}>
              Triumph Over Tinnitus 3.0
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1} alignItems="center">
              <Typography variant="caption">Learn more about Triumph Over Tinnitus 3.0</Typography>
              <Typography color="primary.light" textAlign="end" width="100%">
                Unlock in 14 days
              </Typography>
            </Box>
          </PlansContainer>
        </Stack>
      </SummeryContainer>
    </div>
  );
};

export default OrderSummery;
