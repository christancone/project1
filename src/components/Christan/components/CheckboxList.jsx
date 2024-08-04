import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Alert from '@mui/material/Alert';

export default function CheckboxList({ checked, handleToggle, children, error }) {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {children.map((child) => {
          const labelId = `checkbox-list-label-${child.childID}`;

          return (
              <ListItem
                  key={child.childID}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  }
                  disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(child.childID)} dense>
                  <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(child.childID) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={child.childFirstName} />
                </ListItemButton>
              </ListItem>
          );
        })}
      </List>
  );
}
