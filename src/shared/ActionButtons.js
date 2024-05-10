// src/components/Shared/ActionButtons.js
import React from 'react';
import { Button, Grid } from '@mui/material';
import './ActionButtons.css';

const ActionButtons = ({ primaryLabel, primaryAction, secondaryLabel, secondaryAction }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Button variant="contained" color="primary" onClick={primaryAction}>
          {primaryLabel}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={secondaryAction}>
          {secondaryLabel}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;
