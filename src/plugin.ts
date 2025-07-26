import SvgIcon from '@dword-design/buefy-svg-icon';
import { ConfigProgrammatic } from 'buefy';

import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(() =>
  ConfigProgrammatic.setOptions({
    defaultIconComponent: SvgIcon,
    defaultIconPack: undefined,
  }),
);
