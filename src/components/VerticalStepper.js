import React from 'react';
import { Stepper, Step, StepLabel, StepContent, Box } from "@mui/material";


export default function VerticalStepper({ getSteps, getStepContent, activeStep }) {
  const steps = getSteps();

  return (
    <div sx={(theme) => ({
      width: '100%',
      '& .MuiStepper-root': {
        padding: 0,
      },
      '& .MuiStepContent-root': {
        paddingLeft: theme.spacing(2),
        paddingRight: 0,
      },
      [theme.breakpoints.down('xs')]: {
        '& .MuiStepContent-root': {
          paddingLeft: activeStep === steps.length - 1 ? 0 : theme.spacing(2),
          marginLeft: activeStep === steps.length - 1 ? 0 : theme.spacing(1.5),
        },
      },
    })}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <strong> {label}</strong>
            </StepLabel>
            <StepContent>
              <Box>{getStepContent(index)}</Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}