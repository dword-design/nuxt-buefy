import { addComponent, addPlugin, createResolver } from '@nuxt/kit'

import components from './components.js'

const resolver = createResolver(import.meta.url)

export default () => {
  for (const component of components) {
    const componentName = `B${component}`
    addComponent({
      export: componentName,
      filePath: `buefy/dist/esm/${component.toLowerCase()}.js`,
      name: componentName,
    })
  }
  addPlugin(resolver.resolve('./plugin.js'), { append: true })
}
