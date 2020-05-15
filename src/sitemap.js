import getPackageName from 'get-package-name'

export default function () {
  this.addModule([
    getPackageName(require.resolve('@nuxtjs/sitemap')),
    { hostname: process.env.BASE_URL },
  ])
}
