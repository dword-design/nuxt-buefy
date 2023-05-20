import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import { execaCommand } from 'execa'
import nuxtDevReady from 'nuxt-dev-ready'
import outputFiles from 'output-files'
import kill from 'tree-kill-promise'
import withLocalTmpDir from 'with-local-tmp-dir'

export default tester(
  {
    works() {
      return withLocalTmpDir(async () => {
        await outputFiles({
          'nuxt.config.js': endent`
            export default {
              modules: ['../src/index.js'],
            }
          `,
          'pages/index.vue': endent`
            <template>
              <b-button class="foo">foo</b-button>
            </template>
          `,
        })

        const nuxt = execaCommand('nuxt dev')
        try {
          await nuxtDevReady()
          await this.page.goto('http://localhost:3000')

          const button = await this.page.waitForSelector('.foo')
          expect(await button.screenshot()).toMatchImageSnapshot(this)
        } finally {
          await kill(nuxt.pid)
        }
      })
    },
  },
  [testerPluginPuppeteer()],
)
