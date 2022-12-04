import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import fs from 'fs-extra'
import { Builder, Nuxt } from 'nuxt'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from './index.js'

export default tester(
  {
    works() {
      return withLocalTmpDir(async () => {
        await fs.outputFile(
          'pages/index.vue',
          endent`
          <template>
            <b-button class="foo">foo</b-button>
          </template>
        `
        )

        const nuxt = new Nuxt({
          dev: false,
          modules: [self],
        })
        await new Builder(nuxt).build()
        try {
          await nuxt.listen()
          await this.page.goto('http://localhost:3000')

          const button = await this.page.waitForSelector('.foo')
          expect(await button.screenshot()).toMatchImageSnapshot(this)
        } finally {
          await new Promise(resolve => setTimeout(resolve, 30000))
          await nuxt.close()
        }
      })
    },
  },
  [testerPluginPuppeteer()]
)
