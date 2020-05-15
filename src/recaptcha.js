import getPackageName from 'get-package-name'

export default function () {
  this.addModule([
    getPackageName(require.resolve('@nuxtjs/recaptcha')),
    {
      siteKey: process.env.RECAPTCHA_KEY,
      version: 2,
    },
  ])
}
