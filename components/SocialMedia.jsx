import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import GroupIcon from '@mui/icons-material/Group';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

/* PANEL CON LINKS A LAS REDES SOCIALES (faltan los href) */

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <MailIcon />, name: "Email" },
  { icon: <InstagramIcon />, name: "Instagram" },
  { icon: <TwitterIcon />, name: "Twitter" },
];

export default function SocialMedia() {
  const [direction, setDirection] = useState("up");
  const [hidden, setHidden] = useState(false);

  /* Esto puede servir en el futuro xd */
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  return (
    <Box sx={{ transform: "translateZ(100px)", flexGrow: 1, height: 320, position: 'fixed', top: "55%", left: "94%"}}>
      <Box sx={{ mt: 20, height: 320, width: 56 }}>
        <StyledSpeedDial
          ariaLabel="Contáctanos"
          hidden={false}
          icon={<GroupIcon />}
          direction='up'
          sx={{ '& .MuiFab-primary': { backgroundColor: '#db2777', color: 'white', '&:hover': {backgroundColor: '#f1f5f9', color: '#0f172a'} } }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              sx={{ backgroundColor: '#db2777', color: 'white', '&:hover': {backgroundColor: '#f1f5f9', color: '#0f172a'}}}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
