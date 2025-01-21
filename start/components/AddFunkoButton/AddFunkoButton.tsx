import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { Funko } from '../../types/funko';

const AddFunkoButton = ({ setFunkos }: { setFunkos: React.Dispatch<React.SetStateAction<Funko[]>> }) => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    imageUrl: '',
    source: '',
    character: '',
    yearReleased: '',
    numberInLine: '',
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/funkos', formValues);
      setFunkos((funkos: Funko[]) => [...funkos, response.data]);
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error('Error adding Funko:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>

      {/* Code to create Add Button functionality goes here */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Funko!
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Enter Details
        </DialogTitle>
        <DialogContent>
          <TextField margin="normal" name="Character" label="Character" type="text" fullWidth value={formValues.character} onChange={handleInputChange}/>
          <TextField margin="normal" name="Image Url" label="Image Url" type="url" fullWidth value={formValues.imageUrl} onChange={handleInputChange}/>
          <TextField margin="normal" name="Number in Line" label="Number in Line" type="number" fullWidth value={formValues.numberInLine} onChange={handleInputChange}/>
          <TextField margin="normal" name="Year Released" label="Year Released" type="number" fullWidth value={formValues.yearReleased} onChange={handleInputChange}/>
          <TextField margin="normal" name="Source" label="Source" type="text" fullWidth value={formValues.source} onChange={handleInputChange}/>
        </DialogContent>
        <DialogActions>
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

export default AddFunkoButton;
