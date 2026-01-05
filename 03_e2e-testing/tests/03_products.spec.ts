import test, { expect } from '@playwright/test';

test.describe('상품 동적 컨텐츠 테스트', () => {
  test('초기에 전체 상품 목록이 표시되어야 함', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByRole('article')).toHaveCount(12);
  });
  test('상품 검색 시나리오', async ({ page }) => {
    await page.goto('/products');

    await page.getByPlaceholder('상품 검색').fill('마우스');

    await page.getByRole('button', { name: '검색' }).click();

    await expect(page.getByText('로딩중...')).toBeVisible();
    await expect(page.getByText('로딩중...')).toBeHidden();

    await expect(page.getByRole('article')).toHaveCount(4);
  });

  test('상품 상세 페이지 이동 시나리오', async ({ page }) => {
    await page.goto('/products');

    await page.getByRole('article').first().click();
    await expect(page).toHaveURL(/\/products\/\d+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('button', { name: '장바구니 담기' })
    ).toBeVisible();
  });
});
