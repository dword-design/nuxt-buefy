import getPackageName from 'get-package-name'
import pushPlugins from '@dword-design/nuxt-push-plugins'
import P from 'path'

export default function (options = {}) {
  this.addModule([getPackageName(require.resolve('nuxt-buefy')), options])
  this.addTemplate({
    src: require.resolve('./card-modal.vue'),
    fileName: P.join('nuxt-buefy', 'card-modal.vue'),
  })
  this.addTemplate({
    src: require.resolve('./cookie-message.vue'),
    fileName: P.join('nuxt-buefy', 'cookie-message.vue'),
  })
  pushPlugins(this, {
    src: require.resolve('./plugin'),
    fileName: P.join('nuxt-buefy', 'plugin.js'),
  })

  if (options.css) {
    this.options.css.push(require.resolve('./style.scss'))
  }
}
