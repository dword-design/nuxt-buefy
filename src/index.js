import pushPlugins from '@dword-design/nuxt-push-plugins'
import getPackageName from 'get-package-name'
import P from 'path'

export default function (options = {}) {
  this.addModule([getPackageName(require.resolve('nuxt-buefy')), options])
  this.addTemplate({
    fileName: P.join('nuxt-buefy', 'card-modal.vue'),
    src: require.resolve('./card-modal.vue'),
  })
  this.addTemplate({
    fileName: P.join('nuxt-buefy', 'cookie-message.vue'),
    src: require.resolve('./cookie-message.vue'),
  })
  pushPlugins(this, {
    fileName: P.join('nuxt-buefy', 'plugin.js'),
    src: require.resolve('./plugin'),
  })
  if (options.css) {
    this.options.css.push(require.resolve('./style.scss'))
  }
}
