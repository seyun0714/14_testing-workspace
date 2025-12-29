// jest 문법 기본 구조

import { divide, sum } from './01_basic';

// 테스트 그룹
describe('sum function test', () => {
  // test, it은 기능적인 차이 x / 컨벤션에 따라 작성
  test('2와 3을 더하면 5가 나와야 함', () => {
    // given -> when -> then 패턴
    const num1: number = 2;
    const num2: number = 3;

    const result = sum(num1, num2);
    expect(result).toBe(5);
  });
  test('-5와 3을 더하면 -2가 나와야 함', () => {
    expect(sum(-5, 3)).toBe(-2);
  });
});

describe('divide function test', () => {
  test('10을 2로 나누면 5가 나와야 함', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('10을 0으로 나누면 에러가 발생해야 함', () => {
    expect(() => divide(10, 0)).toThrow('0으로 나눌 수 없습니다.');
  });
});
