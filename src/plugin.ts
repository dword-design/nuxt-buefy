import BuefyAddons from '@dword-design/buefy-addons';
import SvgIcon from '@dword-design/buefy-svg-icon';
import { ConfigProgrammatic } from 'buefy';

import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(({ vueApp }) => {
  ConfigProgrammatic.setOptions({
    defaultIconComponent: SvgIcon,
    defaultIconPack: undefined,
  });

  vueApp.use(BuefyAddons);
});
