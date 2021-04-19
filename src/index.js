import packageName from 'depcheck-package-name'
import nuxtPushPlugins from 'nuxt-push-plugins'

export default function (options = {}) {
  this.addModule([packageName`nuxt-buefy`, options])
  nuxtPushPlugins(this, require.resolve('./plugin'))
  if (options.css) {
    this.options.css.push(require.resolve('./style.scss'))
  }
}
