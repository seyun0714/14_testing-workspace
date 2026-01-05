import test, { expect } from '@playwright/test';

test('전체 구매 프로세스(홈페이지 접속 - 상품 선택 - 장바구니 - 주문 - 완료', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByRole('link', { name: '쇼핑 시작하기' }).click();
  await expect(page).toHaveURL('/products');

  await page.getByRole('article').nth(1).click();
  await expect(page).toHaveURL(/\/products\/\d+/);

  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await page.goto('/cart');

  await expect(page.getByText('게이밍 마우스')).toBeVisible();
  await expect(page.getByLabel('수량')).toHaveValue('1');

  await page.getByRole('button', { name: '구매하기' }).click();

  await expect(page).toHaveURL('/checkout');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('주문/결제');
  await page.getByLabel('받는 사람').fill('박종원');
  await page.getByLabel('연락처').fill('01011111111');
  await page.getByLabel('주소').fill('더본코리아');
  await page.getByLabel('카드 번호').fill('1234-1234-1234-1234');
  await page.getByLabel('만료일').fill('01/31');
  await page.getByLabel('CVC').fill('123');
  await page.getByRole('button', { name: '결제하기' }).click();

  await expect(page).toHaveURL(/\/order\/\d+/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    '주문이 완료되었습니다'
  );
});
