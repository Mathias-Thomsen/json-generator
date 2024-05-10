// src/App.js
import React, { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import Form from './components/Form/Form';
import JsonOutput from './components/jsonOutput/JsonOutput';
import { exportJsonFile } from './utils/jsonUtils';
import './App.css';

// Initial form values
const defaultFormValues = {
  instruction:  'Analysér teksten under \'raw_text\' og udtræk relevante oplysninger om et opgravningsprojekt. Returnér oplysningerne i et JSON-format med felter som adresse, postnummer, opgravning_dato, grave_termin, kontakt_person, kontakt_person_telefon_nummer, kategori, ordrenummer og indkoebsordrenummer. Hvis oplysninger mangler, marker dem med \'N/A\'.',
  raw_text: '',
  adresse: '',
  postnummer: '',
  opgravning_dato: '',
  grave_termin: '',
  kontakt_person: '',
  kontakt_person_telefon_nummer: '',
  kategori: '',
  ordrenummer: '',
  indkoebsordrenummer: ''
};

const App = () => {
  const [formData, setFormData] = useState(defaultFormValues);
  const [jsonArray, setJsonArray] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update JSON in the dataset
  const addOrUpdateJson = () => {
    const json = {
      instruction: formData.instruction,
      input: { raw_text: formData.raw_text },
      expected_output: {
        annotations: {
          adresse: formData.adresse || 'N/A',
          postnummer: formData.postnummer || 'N/A',
          opgravning_dato: formData.opgravning_dato || 'N/A',
          grave_termin: formData.grave_termin || 'N/A',
          kontakt_person: formData.kontakt_person || 'N/A',
          kontakt_person_telefon_nummer: formData.kontakt_person_telefon_nummer || 'N/A',
          kategori: formData.kategori || 'N/A',
          ordrenummer: formData.ordrenummer || 'N/A',
          indkoebsordrenummer: formData.indkoebsordrenummer || 'N/A'
        }
      }
    };

    if (editingIndex !== null) {
      const updatedJsonArray = [...jsonArray];
      updatedJsonArray[editingIndex] = json;
      setJsonArray(updatedJsonArray);
      setEditingIndex(null);
    } else {
      setJsonArray([...jsonArray, json]);
    }

    setFormData(defaultFormValues);
  };

  // Edit JSON at a specific index
  const editJson = (index) => {
    const jsonToEdit = jsonArray[index];
    setFormData({
      instruction: jsonToEdit.instruction,
      raw_text: jsonToEdit.input.raw_text,
      adresse: jsonToEdit.expected_output.annotations.adresse,
      postnummer: jsonToEdit.expected_output.annotations.postnummer,
      opgravning_dato: jsonToEdit.expected_output.annotations.opgravning_dato,
      grave_termin: jsonToEdit.expected_output.annotations.grave_termin,
      kontakt_person: jsonToEdit.expected_output.annotations.kontakt_person,
      kontakt_person_telefon_nummer: jsonToEdit.expected_output.annotations.kontakt_person_telefon_nummer,
      kategori: jsonToEdit.expected_output.annotations.kategori,
      ordrenummer: jsonToEdit.expected_output.annotations.ordrenummer,
      indkoebsordrenummer: jsonToEdit.expected_output.annotations.indkoebsordrenummer
    });
    setEditingIndex(index);
  };

  // Delete a JSON object from the dataset
  const deleteJson = (index) => {
    const updatedJsonArray = [...jsonArray];
    updatedJsonArray.splice(index, 1);
    setJsonArray(updatedJsonArray);
  };

  // Import JSON data from file
  const importJsonFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedJson = JSON.parse(event.target.result);
      setJsonArray(importedJson);
    };
    reader.readAsText(file);
  };

  // Get dataset length
  const getDatasetLength = () => jsonArray.length;

  // Reset the dataset
  const resetDataset = () => setJsonArray([]);

  return (
    <Container>
      <h1>Opgravningsprojekt JSON Generator</h1>
      <p>Antal objekter i datasættet: {getDatasetLength()}</p>
      <Button variant="outlined" onClick={resetDataset}>Nulstil Datasæt</Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Form
            formData={formData}
            handleChange={handleChange}
            addOrUpdateJson={addOrUpdateJson}
            setFormData={setFormData}
            defaultFormValues={defaultFormValues}
            editingIndex={editingIndex}
          />
        </Grid>
        <Grid item xs={6}>
          <JsonOutput
            jsonArray={jsonArray}
            editJson={editJson}
            deleteJson={deleteJson}
            importJsonFile={importJsonFile}
            exportJsonFile={() => exportJsonFile(jsonArray)}
          />
        </Grid>
      </Grid>
    
    </Container>
  );
};

export default App;
