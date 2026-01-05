import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // 테스트 파일 위치
  fullyParallel: true, // 병렬 실행 활성화
  forbidOnly: !!process.env.CI, // CI에서 .only 사용 금지
  retries: process.env.CI ? 2 : 0, // CI에서 실패 시 재시도
  workers: process.env.CI ? 1 : undefined, // 워커 수

  use: {
    baseURL: 'http://localhost:3000', // 기본 URL
    trace: 'on-first-retry', // 재시도 시 trace 기록
    screenshot: 'only-on-failure', // 실패 시 스크린샷
  },

  // 브라우저 설정
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],

  // 개발 서버 자동 실행
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
