export interface Card {
  id: number;
  description: string;
  title: string;
  img: string;
  price: string;
  rating?: any; // Используйте number вместо any
  added?: boolean; // Новое свойство для отслеживания состояния
  btnText?: string; // Текст кнопки
  backgroundColor?: string; // Цвет кнопки
}
