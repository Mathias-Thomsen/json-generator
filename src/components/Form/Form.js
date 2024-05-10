// src/components/Form/Form.js
import React from 'react';
import { Grid, TextField, Paper } from '@mui/material';
import ActionButtons from '../../shared/ActionButtons';
import './Form.css';

const Form = ({ formData, handleChange, addOrUpdateJson, setFormData, defaultFormValues, editingIndex }) => {
  return (
    <Paper className="form-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Instruction"
            name="instruction"
            fullWidth
            multiline
            rows={4}
            value={formData.instruction}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Raw Text"
            name="raw_text"
            fullWidth
            multiline
            rows={4}
            value={formData.raw_text}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Adresse"
            name="adresse"
            fullWidth
            value={formData.adresse}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Postnummer"
            name="postnummer"
            fullWidth
            value={formData.postnummer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Opgravning Dato"
            name="opgravning_dato"
            fullWidth
            value={formData.opgravning_dato}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Grave Termin"
            name="grave_termin"
            fullWidth
            value={formData.grave_termin}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Kontakt Person"
            name="kontakt_person"
            fullWidth
            value={formData.kontakt_person}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Kontakt Person Telefon Nummer"
            name="kontakt_person_telefon_nummer"
            fullWidth
            value={formData.kontakt_person_telefon_nummer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Kategori"
            name="kategori"
            fullWidth
            value={formData.kategori}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ordrenummer"
            name="ordrenummer"
            fullWidth
            value={formData.ordrenummer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Indkøbsordrenummer"
            name="indkoebsordrenummer"
            fullWidth
            value={formData.indkoebsordrenummer}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <ActionButtons
        primaryLabel={editingIndex !== null ? 'Opdater' : 'Tilføj'}
        primaryAction={addOrUpdateJson}
        secondaryLabel="Nulstil"
        secondaryAction={() => setFormData(defaultFormValues)}
      />
    </Paper>
  );
};

export default Form;
