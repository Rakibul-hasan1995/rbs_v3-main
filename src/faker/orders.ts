import { Orders, OrdersExpand } from '@Types/order';
// import faker from 'faker';
import { faker } from '@faker-js/faker';


// Generate a fake order
const generateOrder = (): Orders => ({
   _id: faker.string.uuid(),
   customer: {
      _id: faker.string.uuid(),
      exchange_rate: faker.number.int({min: 85, max: 110}),
      user_name: faker.company.name(),
   },
   order_name: faker.commerce.productName(),
   program_name: `#${faker.number.int({max: 1000, min: 130})}`,
   qty: faker.number.int(),
   rate: faker.number.int(),
   rate_formatted: faker.finance.currencySymbol() + faker.finance.amount(),
   currency: faker.helpers.arrayElement(['BDT', "USD"]),
   unit: faker.helpers.arrayElement(['PCS', "DZN"]),
   stitching: faker.number.int(),
   category: faker.helpers.arrayElement(['Category A', 'Category B', 'Category C']),
   description: faker.lorem.sentence(),
   order_date: faker.date.past().toISOString(),
   status: faker.helpers.arrayElement(['Pending', 'Completed', 'Cancelled']),
   cover_photo: {
      _id: faker.string.uuid(),
      href: faker.image.url(),
   },
});

// Generate a fake expanded order
const generateExpandedOrder = (): OrdersExpand => ({
   ...generateOrder(),
   receive_qty: faker.number.int({ min: 0, max: 50 }),
   delivery_qty: faker.number.int({ min: 0, max: 50 }),
   production_qty: faker.number.int({ min: 0, max: 50 }),
});

// Generate an array of fake orders
export const generateOrders = (count: number): Orders[] => {
   const orders: Orders[] = [];
   for (let i = 0; i < count; i++) {
      orders.push(generateOrder());
   }
   return orders;
};

// Generate an array of fake expanded orders
export const generateExpandedOrders = (count: number): OrdersExpand[] => {
   const orders: OrdersExpand[] = [];
   for (let i = 0; i < count; i++) {
      orders.push(generateExpandedOrder());
   }
   return orders;
};

// Example usage
// const fakeOrders: Orders[] = generateOrders(10);
// const fakeExpandedOrders: OrdersExpand[] = generateExpandedOrders(10);
