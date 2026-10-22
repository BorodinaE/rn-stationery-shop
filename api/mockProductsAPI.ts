import data from '../mocks/db.json';
import { Product } from '../types/product';

const DELAY_MS = 600;

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

// Список всех товаров
export async function fetchProducts(): Promise<Product[]> {
  await delay(DELAY_MS);
  return data.drugs as Product[];
}

// Один товар по id (вернёт undefined, если не найден)
export async function fetchProductById(id: string): Promise<Product | undefined> {
  await delay(DELAY_MS);
  return (data.drugs as Product[]).find((p) => p.id === id);
}
