export interface Product {
    id: string;
    name: string;
    latin_name: string;
    active_substance: string;
    category: string;
    form: string;
    dosage: string;
    manufacturer: string;
    prescription_required: boolean;
    description: string;
    stock: number;
  }
  
  // Строка корзины: сам товар + количество
  export interface CartLine {
    product: Product;
    quantity: number;
  }
