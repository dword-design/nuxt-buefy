import { expect, test } from '@playwright/test';
import packageName from 'depcheck-package-name';
import endent from 'endent';
import { execaCommand } from 'execa';
import getPort from 'get-port';
import nuxtDevReady from 'nuxt-dev-ready';
import outputFiles from 'output-files';
import portReady from 'port-ready';
import kill from 'tree-kill-promise';

test('duplicate elements issue in production', async ({ page }, testInfo) => {
  const cwd = testInfo.outputPath();

  await outputFiles(cwd, {
    'nuxt.config.ts': endent`
      export default {
        css: ['../../src/style.scss'],
        modules: ['../../src'],
      }
    `,
    'pages/index.vue': endent`
      <template>
        <b-navbar>
          <template #brand><span /></template>
        </b-navbar>
        <div class="foo" />
      </template>
    `,
  });

  await execaCommand('nuxt build', { cwd });
  const port = await getPort();

  const nuxt = execaCommand('nuxt start', {
    cwd,
    env: { PORT: String(port) },
    reject: false,
  });

  try {
    await portReady(port);
    await page.goto(`http://localhost:${port}`);
    await expect(page.locator('.foo')).toHaveCount(1);
  } finally {
    await kill(nuxt.pid);
  }
});

test('works', async ({ page }, testInfo) => {
  const cwd = testInfo.outputPath();

  await outputFiles(cwd, {
    'nuxt.config.ts': endent`
      export default {
        css: ['../../src/style.scss'],
        modules: ['../../src'],
      }
    `,
    'pages/index.vue': endent`
      <template>
        <b-button class="foo">foo</b-button>
      </template>
    `,
  });

  const port = await getPort();

  const nuxt = execaCommand('nuxt dev', {
    cwd,
    env: { NODE_ENV: '', PORT: String(port) },
    reject: false,
  });

  try {
    await nuxtDevReady(port);
    await page.goto(`http://localhost:${port}`);
    const button = page.locator('.foo');
    await expect(button).toBeVisible();
    await expect(button).toHaveScreenshot();
  } finally {
    await kill(nuxt.pid);
  }
});

test('icon', async ({ page }, testInfo) => {
  const cwd = testInfo.outputPath();

  await outputFiles(cwd, {
    'nuxt.config.ts': endent`
      import viteSvgLoader from '${packageName`vite-svg-loader`}';

      export default {
        css: ['../../src/style.scss'],
        modules: ['../../src'],
        vite: {
          plugins: [viteSvgLoader()],
        }
      }
    `,
    'pages/index.vue': endent`
      <template>
        <b-icon class="foo":icon="CheckIcon" />
      </template>

      <script setup lang="ts">
      import CheckIcon from '${packageName`@mdi/svg`}/svg/check.svg?component';
      </script>
    `,
  });

  const port = await getPort();

  const nuxt = execaCommand('nuxt dev', {
    cwd,
    env: { NODE_ENV: '', PORT: String(port) },
    reject: false,
  });

  try {
    await nuxtDevReady(port);
    await page.goto(`http://localhost:${port}`);
    const icon = page.locator('.foo');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveScreenshot();
  } finally {
    await kill(nuxt.pid);
  }
});
