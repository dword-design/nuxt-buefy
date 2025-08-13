import SvgIcon from '@dword-design/buefy-svg-icon';
import {
  ConfigProgrammatic,
  DialogProgrammatic,
  LoadingProgrammatic,
  ModalProgrammatic,
  NotificationProgrammatic,
  SnackbarProgrammatic,
  ToastProgrammatic,
} from 'buefy';

import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(({ vueApp }) => {
  ConfigProgrammatic.setOptions({
    defaultIconComponent: SvgIcon,
    defaultIconPack: undefined,
  });

  vueApp.config.globalProperties.$buefy = {
    config: ConfigProgrammatic,
    dialog: new DialogProgrammatic(vueApp),
    loading: new LoadingProgrammatic(vueApp),
    modal: new ModalProgrammatic(vueApp),
    notification: new NotificationProgrammatic(vueApp),
    snackbar: new SnackbarProgrammatic(vueApp),
    toast: new ToastProgrammatic(vueApp),
  };
});
