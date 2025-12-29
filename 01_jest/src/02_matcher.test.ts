import {
  calculateDiscountPrice,
  createUser,
  filterByPriceRange,
  filterProductsByCategory,
  getAgeCategory,
  Product,
  searchProducts,
  validateEmail,
} from './02_matcher';

describe('matcher 함수 연습', () => {
  const products: Product[] = [
    {
      id: 1,
      name: '노트북',
      price: 1000000,
      category: '전자기기',
      tags: ['전자', '컴퓨터'],
      stock: 12,
    },
    {
      id: 2,
      name: '사무용 의자',
      price: 150000,
      category: '가구',
      tags: ['인테리어', '사무용품'],
      stock: 5,
    },
    {
      id: 3,
      name: '유기농 사과즙',
      price: 25000,
      category: '식품',
      tags: ['건강', '과일즙', '유기농'],
      stock: 100,
    },
  ];

  test('기본 비교 테스트', () => {
    // toBe() : 원시값(primitive) 비교 (=== 와 동일)
    const num = 10;
    expect(num).toBe(10);
    const str = 'hello';
    expect(str).toBe('hello');

    // 객체 간의 비교는 toEqual 사용
    const newUser = createUser('김철수', 'kim@test.com', 25);
    expect(newUser).toEqual({
      id: expect.any(Number),
      name: '김철수',
      email: 'kim@test.com',
      age: 25,
      isActive: true,
    });

    const filtered = filterProductsByCategory(products, '가구');
    expect(filtered).toEqual([
      {
        id: 2,
        name: '사무용 의자',
        price: 150000,
        category: '가구',
        tags: ['인테리어', '사무용품'],
        stock: 5,
      },
    ]);
  });
  test('진리 값 비교 테스트', () => {
    const isValidEmail = validateEmail('test@email.com');
    expect(isValidEmail).toBeTruthy();

    const ageCategory = getAgeCategory(-5);
    expect(ageCategory).toBeNull();

    const user = createUser('홍길동', 'hong@test.com');
    expect(user.name).toBeDefined();
    expect(user.age).toBeUndefined();
  });

  test('숫자 비교 테스트', () => {
    const discountPrice = calculateDiscountPrice(10000, 10);
    expect(discountPrice).toBeLessThan(10000);
    expect(discountPrice).toBeGreaterThanOrEqual(9000);
  });

  test('문자열 비교 테스트', () => {
    const email = 'test@email.com';
    expect(email).toMatch(/@/); // 정규식 매칭

    const productName = '삼성 갤럭시 노트북';
    expect(productName).toContain('노트북');
  });

  test('배열 관련 비교 테스트', () => {
    const searchedProducts = searchProducts(products, '노트북');
    expect(searchedProducts).toHaveLength(1);

    const filteredByPriceProducts = filterByPriceRange(products, 10000, 200000);
    expect(filteredByPriceProducts).toHaveLength(2);

    // 상품에 사무용 의자 / 유기농 사과즙이 포함되어 있는지
    const productNames = filteredByPriceProducts.map((product) => product.name);
    expect(productNames).toContain('사무용 의자');
    expect(productNames).toContain('유기농 사과즙');
  });

  test('객체 관련 비교 테스트', () => {
    const user = createUser('박민수', 'park@email.com', 28);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email', 'park@email.com'); // 속성 값도 같이 검증

    // 객체의 일부 속성만 검증
    expect(user).toMatchObject({
      age: 28,
      isActive: true,
    });
  });

  test('예외 처리 관련 테스트', () => {
    // 할인율이 범위를 벗어나면 에러가 발생해야 함
    // toThrow 매개변수는 에러 메시지 "contains" 체크
    expect(() => calculateDiscountPrice(10000, -10)).toThrow(
      '할인율은 0~100 사이여야 합니다.'
    );
    expect(() => calculateDiscountPrice(10000, 140)).toThrow('할인율은 0~100');
  });

  test('부정 테스트', () => {
    const price = 10000;
    expect(price).not.toBe(20000);

    expect(() => calculateDiscountPrice(10000, 10)).not.toThrow();
  });
});

describe('종합 실전 예제', () => {
  test('사용자 가입 검증 시나리오', () => {
    // given: 사용자 데이터 준비
    const name = '김철수';
    const email = 'test@email.com';

    // when: 테스트용 함수 실행
    const isValidEmail = validateEmail(email);
    const user = createUser(name, email);

    // then: 검증
    expect(isValidEmail).toBeTruthy();
    expect(user).toMatchObject({
      name: '김철수',
      email: 'test@email.com',
      isActive: true,
    });
    expect(user).toHaveProperty('id');
    expect(user.age).toBeUndefined();
  });
});
