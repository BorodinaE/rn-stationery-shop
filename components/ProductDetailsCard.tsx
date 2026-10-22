import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';

export default function ProductDetailsCard({ product }: { product: Product }) {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.manufacturer}>{product.manufacturer}</Text>
      <Text style={styles.name}>{product.name}</Text>

      <Text style={styles.category}>Форма препарата: {product.form}</Text>
      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.stock}>В наличии: {product.stock} шт.</Text>

      <Text style={styles.desc}>Дозировка: {product.dosage} </Text>
      <Text style={styles.desc}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 16,
  },
  manufacturer: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 22, fontWeight: '700', marginVertical: 6 },
  category: { fontSize: 13, color: '#999', marginBottom: 12 },
  stock: { fontSize: 13, color: '#4caf50', marginBottom: 16 },
  desc: { fontSize: 15, lineHeight: 22, color: '#333' },
});