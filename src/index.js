import pushPlugins from '@dword-design/nuxt-push-plugins'
import packageName from 'depcheck-package-name'

export default function (options = {}) {
  this.addModule([packageName`nuxt-buefy`, options])
  pushPlugins(this, require.resolve('./plugin'))
  if (options.css) {
    this.options.css.push(require.resolve('./style.scss'))
  }
}
