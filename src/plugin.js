import BuefyAddons from '@dword-design/buefy-addons'
import SvgIcon from '@dword-design/buefy-svg-icon'
import { ConfigProgrammatic } from 'buefy'

import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  ConfigProgrammatic.setOptions({
    defaultIconComponent: SvgIcon,
    defaultIconPack: undefined,
  })
  nuxtApp.vueApp.use(BuefyAddons)
})
