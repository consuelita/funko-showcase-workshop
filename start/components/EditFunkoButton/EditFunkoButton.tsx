import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Funko, FunkoProps } from '../../types/funko';
import { EditFunkoProps } from '../../types/funko';
import axios from 'axios';

const EditFunkoButton = ({ setFunkos, funko }: { setFunkos: React.Dispatch<React.SetStateAction<Funko[]>>, funko: Funko }) => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    _id: funko._id,
    imageUrl: funko.imageUrl,
    source: funko.source,
    character: funko.character,
    yearReleased: funko.yearReleased,
    numberInLine: funko.numberInLine,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/update_funkos', formValues);
      setFunkos((funkos: Funko[]) => {
        return funkos.map((funko) => {
          if (funko._id === response.data._id) {
            return response.data;
          }
          return funko;
        })
      });
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error('Error adding Funko:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent>

          {/* Add Text Fields here */}
          <TextField margin="normal" name="" label="character" type="" fullWidth value={funko.character} onChange={handleInputChange}/>
          <TextField margin="normal" name="" label="imageUrl" type="" fullWidth value={funko.imageUrl} onChange={handleInputChange}/>
          <TextField margin="normal" name="" label="numberInLine" type="" fullWidth value={funko.numberInLine} onChange={handleInputChange}/>
          <TextField margin="normal" name="" label="yearReleased" type="" fullWidth value={funko.yearReleased} onChange={handleInputChange}/>
          <TextField margin="normal" name="" label="source" type="" fullWidth value={funko.source} onChange={handleInputChange}/>

        </DialogContent>
        <DialogActions>

          {/* Add Buttons here */}
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditFunkoButton;
