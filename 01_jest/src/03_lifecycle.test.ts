// describe('Lifecycle 동작 순서', () => {
//   beforeAll(() => {
//     console.log('==== beforeAll 동작 (최초 한 번) ====');
//   });
//   afterAll(() => {
//     console.log('==== afterAll 동작 (최종 한 번) ====');
//   });
//   beforeEach(() => {
//     console.log('==== beforeEach 동작 (각 테스트 케이스 실행 전) ====');
//   });
//   afterEach(() => {
//     console.log('==== afterEach 동작 (각 테이트 케이스 실행 후) ====');
//   });

import {
  addToCart,
  calculateCartTotal,
  clearCartFromLocalStorage,
  getCartFromLocalStorage,
  getCartItemCount,
  Product,
  removeFromCart,
} from './03_lifecycle';

//   test('첫 번째 테스트 케이스', () => {
//     console.log('첫 번째 테스트 실행');
//   });
//   test('두 번째 테스트 케이스', () => {
//     console.log('두 번째 테스트 실행');
//   });
//   test('세 번째 테스트 케이스', () => {
//     console.log('세 번째 테스트 실행');
//   });
// });

describe('장바구니 기능 테스트', () => {
  // localStoarge(Node.js 환경에서는 존재하지 않음) => Mock 객체 생성

  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => (store[key] = value),
      removeItem: (key: string) => delete store[key],
      clear: () => (store = {}),
    };
  })();

  global.localStorage = localStorageMock as any;

  const testProduct1: Product = {
    id: 1,
    name: '노트북',
    price: 1000000,
    imageUrl: `/images/laptop.jpg`,
  };
  const testProduct2: Product = {
    id: 2,
    name: '마우스',
    price: 30000,
    imageUrl: `/images/mouse.jpg`,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('장바구니에 상품 추가 테스트', () => {
    const cart = addToCart(testProduct1, 1);
    expect(cart).toHaveLength(1);
    expect(cart[0].productName).toBe('노트북');
    expect(cart[0].quantity).toBe(1);
  });

  test('장바구니에 같은 상품 추가시 수량만 증가되는지 테스트', () => {
    addToCart(testProduct1, 1);
    const cart = addToCart(testProduct1, 2);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);
  });

  test('장바구니 총 금액/총 수량 테스트', () => {
    addToCart(testProduct1, 1); // 1000000
    addToCart(testProduct2, 2); // 1060000

    const totalPrice = calculateCartTotal();
    expect(totalPrice).toBe(1060000);

    const count = getCartItemCount();
    expect(count).toBe(3);
  });

  test('장바구니에서 상품 제거 테스트', () => {
    addToCart(testProduct1);
    addToCart(testProduct2);
    const cart = removeFromCart(1);
    expect(cart).toHaveLength(1);
    expect(cart[0].productName).toBe('마우스');
  });

  test('장바구니 초기화 테스트', () => {
    addToCart(testProduct1, 2);
    addToCart(testProduct2, 4);
    clearCartFromLocalStorage();
    const cart = getCartFromLocalStorage();
    expect(cart).toHaveLength(0);
  });
});
