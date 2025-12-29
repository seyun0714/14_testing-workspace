// 덧셈 연산을 위한 함수
export function sum(a: number, b: number) {
  return a + b;
}

export function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error('0으로 나눌 수 없습니다.');
  }
  return a / b;
}
