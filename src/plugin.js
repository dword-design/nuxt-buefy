import AddonsPlugin from '@dword-design/buefy-addons'
import SvgIcon from '@dword-design/buefy-svg-icon'
import Buefy from 'buefy'
import Vue from 'vue'

Vue.use(Buefy, {
  defaultIconComponent: SvgIcon,
  defaultIconPack: null,
})
Vue.use(AddonsPlugin)
