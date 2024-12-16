import { endent } from '@dword-design/functions';
import tester from '@dword-design/tester';
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir';
import { execaCommand } from 'execa';
import nuxtDevReady from 'nuxt-dev-ready';
import outputFiles from 'output-files';
import { chromium } from 'playwright';
import portReady from 'port-ready';
import kill from 'tree-kill-promise';

export default tester(
  {
    async 'duplicate elements issue in production'() {
      await outputFiles({
        'nuxt.config.js': endent`
          export default {
            css: ['@/../src/style.scss'],
            modules: ['../src/index.js'],
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

      await execaCommand('nuxt build');
      const nuxt = execaCommand('nuxt start');

      try {
        await portReady(3000);
        await this.page.goto('http://localhost:3000');
        const containers = await this.page.$$('.foo');
        expect(containers.length).toEqual(1);
      } finally {
        await kill(nuxt.pid);
      }
    },
    async works() {
      await outputFiles({
        'nuxt.config.js': endent`
          export default {
            css: ['@/../src/style.scss'],
            modules: ['../src/index.js'],
          }
        `,
        'pages/index.vue': endent`
          <template>
            <b-button class="foo">foo</b-button>
          </template>
        `,
      });

      const nuxt = execaCommand('nuxt dev');

      try {
        await nuxtDevReady();
        await this.page.goto('http://localhost:3000');
        const button = await this.page.waitForSelector('.foo');
        expect(await button.screenshot()).toMatchImageSnapshot(this);
      } finally {
        await kill(nuxt.pid);
      }
    },
  },
  [
    testerPluginTmpDir(),
    {
      async after() {
        await this.browser.close();
      },
      async before() {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
      },
    },
  ],
);
