import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import PieChart from 'react-native-pie-chart';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseApp, db } from '../firebase/firebaseConfig';

export default function Report({ route }) {
  const widthAndHeight = 250;
  const [series, setSeries] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState([]);

  const sliceColor = ['#008000', '#00FF00', '#FFD700', '#FF4500', '#FF0000'];
  const labels = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo'];
  const { id } = route.params || {};
  const [pVotes, setPVotes] = useState(null);

  useEffect(() => {
    if (id) {
      const surveyRef = doc(db, 'surveys', id);

      getDoc(surveyRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const surveyData = docSnapshot.data();
            setPVotes(surveyData.votes);
          } else {
            console.log('Documento não encontrado!');
          }
        })
        .catch((error) => {
          console.error('Erro ao pegar os dados: ', error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (pVotes) {
      const votes = [
        pVotes.excellent || 0,
        pVotes.good || 0,
        pVotes.neutral || 0,
        pVotes.bad || 0,
        pVotes.poor || 0,
      ];

      // Filtra dados, cores e rótulos com base em valores não zerados
      const nonZeroData = votes
        .map((value, index) => ({ value, color: sliceColor[index], label: labels[index] }))
        .filter((item) => item.value > 0);

      setSeries(nonZeroData.map((item) => item.value));
      setFilteredColors(nonZeroData.map((item) => item.color));
      setFilteredLabels(nonZeroData.map((item) => item.label));
    }
  }, [pVotes]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.chartAndLegendContainer}>
          {series.length > 0 && (
            <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={filteredColors} />
          )}
          <View style={styles.legendContainer}>
            {filteredLabels.map((label, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: filteredColors[index] }]} />
                <Text style={styles.legendText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#573FBA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  chartAndLegendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendContainer: {
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    color: '#fff',
  },
});
