import pushPlugins from '@dword-design/nuxt-push-plugins'
import getPackageName from 'get-package-name'

export default function (options = {}) {
  this.addModule([getPackageName(require.resolve('nuxt-buefy')), options])
  pushPlugins(this, require.resolve('./plugin'))
  if (options.css) {
    this.options.css.push(require.resolve('./style.scss'))
  }
}
