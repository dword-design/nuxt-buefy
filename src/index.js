import nuxtPushPlugins from 'nuxt-push-plugins'

export default function () {
  this.options.router.linkActiveClass = 'is-active'
  nuxtPushPlugins(this, require.resolve('./plugin'))
}
