import { addPlugin, createResolver } from '@nuxt/kit'

import components from './components.js'
import registerComponents from './register-components'

const resolver = createResolver(import.meta.url)

export default () => {
  registerComponents(components)
  addPlugin(resolver.resolve('./plugin.js'), { append: true })
}
