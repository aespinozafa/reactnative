import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const App = () => {
  const [institutionData, setInstitutionData] = useState(null);
  const [studentResults, setStudentResults] = useState(null);
  const [selectedAmie, setSelectedAmie] = useState('01B00020'); // El valor predeterminado puede ser el primer código o uno vacío
  const fetchData = async () => {
    try {

      const response = await fetch(`https://inca.evaluacion.gob.ec/api/wssest/amie/${selectedAmie}/?param1=PRUEBA&param2=ineval2024`);
      const data = await response.json();
      setInstitutionData(data[0]); // Asumiendo que la institución está en la primera posición del array
      fetchDataStudents(data[0].codigo);

    } catch (error) {
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un estado de error
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error('Error Request:', error.request);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  };

  const fetchDataStudents = async (codigo) => {
    console.log(codigo);
    try {
      const url = `http://inca.evaluacion.gob.ec/api/wssest/amie/${codigo}/?param1=PRUEBA&param2=ineval2024`;
      // Reemplaza con la URL correcta y manejo de parámetros según tu API
      const response = await fetch(url);
      const data = await response.json();

      setStudentResults(data[0]); // Asumiendo que los estudiantes están en una propiedad 'estudiantes'
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  return (
      <ScrollView style={styles.container}>
        <Text>AMIE:</Text>
        <Picker
          selectedValue={selectedAmie}
          onValueChange={(itemValue, itemIndex) => setSelectedAmie(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="01B00020" value="01B00020" />
          <Picker.Item label="22B00008" value="22B00008" />
          <Picker.Item label="09H03793" value="09H03793" />
          <Picker.Item label="17H03054" value="17H03054" />
          <Picker.Item label="14H00372" value="14H00372" />
          <Picker.Item label="01H00120" value="01H00120" />
          <Picker.Item label="23H00075" value="23H00075" />
          <Picker.Item label="21H00578" value="21H00578" />
          <Picker.Item label="15H00088" value="15H00088" />
          <Picker.Item label="13H04551" value="13H04551" />
          <Picker.Item label="05H00205" value="05H00205" />
        </Picker>
        <Button title="Search" onPress={fetchData} />
        {institutionData && (
          <View style={styles.section}>
            <Text style={styles.header}>Institution Information</Text>
            <Text>AMIE: {institutionData.amie}</Text>
            <Text>Name:{institutionData.nm_inst}</Text>
            <Text>Province: {institutionData.nm_prov}</Text>
          </View>
        )}
        {studentResults && (
          <View style={styles.section}>
            <Text style={styles.header}>Student Results</Text>
            {studentResults.map((student, index) => (
              <View key={index} style={styles.student}>
                <Text>Code: {student.codigo}</Text>
                <Text>Math: {student.imat}</Text>
                <Text>Language and Literature: {student.ilyl}</Text>
                <Text>Natural Sciences: {student.icn}</Text>
                <Text>Social Studies: {student.ies}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  student: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  picker: {
    width: 300,
    height: 44,
    marginVertical: 20,
  },
});

export default App;

