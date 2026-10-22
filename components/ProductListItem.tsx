import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { Product } from '../types/product';
import { useCartStore } from '../stores/cartStore';
import {useShallow} from "zustand/react/shallow";

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductListItem({ product, onPress }: Props) {
  const add = useCartStore((s) => s.add);
  const decrement  = useCartStore((s) => s.decrement);

  const inCart = useCartStore(
    useShallow((s) => s.lines[product.id]?.quantity ?? 0),
  );

  const atMax = inCart >= product.stock;

  const handleAdd = () => {
    if (atMax) {
      Alert.alert(
        'Нельзя добавить больше',
        `На складе доступно только ${product.stock} шт. «${product.name}».`,
      );
      return;
    }
    add(product);
  };

  const handleDecrement  = () => {
    decrement (product.id);
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>

      <View style={styles.info}>
        <Text style={styles.brand}>{product.manufacturer}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>На складе: {product.stock} </Text>
      </View>

      <View style={styles.right}>
        {inCart > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{inCart}</Text>
          </View>
        )}

          {/* stopPropagation: чтобы тап по кнопке не открывал экран товара */}
          <Pressable
            style={styles.addBtn}
            onPress={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
          >
            <Text style={styles.addBtnText}>+</Text>
          </Pressable>

          <Pressable
            style={styles.addBtn}
            onPress={(e) => {
              e.stopPropagation();
              handleDecrement();
            }}
          >
            <Text style={styles.addBtnText}>-</Text>
          </Pressable>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f2f2f2' },
  info: { flex: 1, marginLeft: 12 },
  brand: { fontSize: 11, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 14, fontWeight: '600', marginVertical: 2 },
  price: { fontSize: 15, fontWeight: '700', color: '#1e88e5' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e88e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 24, fontWeight: '700' },
  right: { alignItems: 'center', gap: 6 },
  badge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});