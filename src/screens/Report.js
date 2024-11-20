import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import PieChart from 'react-native-pie-chart';

export default function Report() {
  const widthAndHeight = 250;
  const series = [15, 25, 30, 20, 10]; 
  const sliceColor = ['#008000', '#00FF00', '#FFD700', '#FF4500', '#FF0000'];
  const labels = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo']; 

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.chartAndLegendContainer}>
          <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
          <View style={styles.legendContainer}>
            {labels.map((label, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: sliceColor[index] }]} />
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
