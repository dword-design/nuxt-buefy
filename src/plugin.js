import BuefyAddons from '@dword-design/buefy-addons';
import SvgIcon from '@dword-design/buefy-svg-icon';
import Buefy from 'buefy';

import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Buefy, {
    defaultIconComponent: SvgIcon,
    defaultIconPack: undefined,
  });

  nuxtApp.vueApp.use(BuefyAddons);
});
