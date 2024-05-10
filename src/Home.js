import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper } from '@mui/material';
import './App.css'; // Importer vores stylesheet

const Home = () => {
  // Standard input-værdier
  const defaultFormValues = {
    instruction: 'Analysér teksten under \'raw_text\' og udtræk relevante oplysninger om et opgravningsprojekt. Returnér oplysningerne i et JSON-format med felter som adresse, postnummer, opgravning_dato, grave_termin, kontakt_person, kontakt_person_telefon_nummer, kategori, ordrenummer og indkoebsordrenummer. Hvis oplysninger mangler, marker dem med \'N/A\'.',
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

  // State til formular input
  const [formData, setFormData] = useState(defaultFormValues);
  // Liste over tilføjede JSON-objekter
  const [jsonArray, setJsonArray] = useState([]);
  // Index for det aktuelle JSON-objekt, der redigeres
  const [editingIndex, setEditingIndex] = useState(null);

  // Opdater state ved ændring af input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Tilføj eller opdater JSON-objekt i listen
  const addOrUpdateJson = () => {
    const json = {
      instruction: formData.instruction,
      input: {
        raw_text: formData.raw_text
      },
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
      // Hvis der redigeres, opdater JSON-objektet ved den givne index
      const updatedJsonArray = [...jsonArray];
      updatedJsonArray[editingIndex] = json;
      setJsonArray(updatedJsonArray);
      setEditingIndex(null);
    } else {
      // Ellers tilføj et nyt JSON-objekt til listen
      setJsonArray([...jsonArray, json]);
    }

    // Nulstil formularen til standardværdier
    setFormData(defaultFormValues);
  };

  // Rediger JSON-objekt
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

  // Slet JSON-objekt fra listen
  const deleteJson = (index) => {
    const updatedJsonArray = [...jsonArray];
    updatedJsonArray.splice(index, 1);
    setJsonArray(updatedJsonArray);
  };

  // Importer JSON-fil
  const importJsonFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedJson = JSON.parse(event.target.result);
      setJsonArray(importedJson);
    };
    reader.readAsText(file);
  };

// Eksporter JSON-fil med læsbart timestamp
const exportJsonFile = () => {
    const jsonContent = JSON.stringify(jsonArray, null, 2);
    const timestamp = new Date().toLocaleString('da-DK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); // Læsbart timestamp
    const formattedTimestamp = timestamp.replace(/[\/:]/g, '_'); // Erstat skråstreger og kolonner med underscores
    const fileName = `exported_data_${formattedTimestamp}.json`; // Tilføj timestamp til filnavn
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  

  // Funktion til at se antallet af objekter i datasættet
  const getDatasetLength = () => {
    return jsonArray.length;
  };

  // Funktion til at nulstille det importerede datasæt
  const resetDataset = () => {
    setJsonArray([]);
  };

  return (
    <Container>
      <h1>Opgravningsprojekt JSON Generator</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* Formularsiden */}
          <Paper style={{ padding: 16 }}>
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
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary" onClick={addOrUpdateJson}>
                  {editingIndex !== null ? 'Opdater' : 'Tilføj'}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => setFormData(defaultFormValues)}>
                  Nulstil
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {/* JSON-output siden */}
          <Paper style={{ padding: 16 }}>
            <h2>JSON Output</h2>
            {jsonArray.length > 0 ? (
              jsonArray.map((json, index) => (
                <div key={index} className="json-container"> {/* Anvend vores CSS-klasse */}
                  <pre style={{ padding: 10 }}>
                    <strong>JSON {index + 1}</strong>: {JSON.stringify(json, null, 2)}
                  </pre>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                      <Button variant="outlined" onClick={() => editJson(index)}>
                        Rediger
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={() => deleteJson(index)}>
                        Slet
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))
            ) : (
              <p>Ingen data tilføjet endnu.</p>
            )}
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <input
                  accept="application/json"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  type="file"
                  onChange={importJsonFile}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Importer JSON
                  </Button>
                </label>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={exportJsonFile}>
                  Eksporter JSON
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* Vis antallet af objekter i datasættet */}
      <p>Antal objekter i datasættet: {getDatasetLength()}</p>
      {/* Knappen til at nulstille det importerede datasæt */}
      <Button variant="outlined" onClick={resetDataset}>
        Nulstil Datasæt
      </Button>
    </Container>
  );
};

export default Home;
