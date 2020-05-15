import getPackageName from 'get-package-name'

export default function () {
  this.addModule([
    getPackageName(require.resolve('nuxt-basic-auth-module')),
    {
      name: process.env.BASIC_AUTH_USER,
      pass: process.env.BASIC_AUTH_PASSWORD,
      enabled:
        process.env.BASIC_AUTH_USER !== '' &&
        process.env.BASIC_AUTH_PASSWORD !== '',
    },
  ])
}
