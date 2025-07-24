import {
  addComponent,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import packageName from 'depcheck-package-name';

const resolver = createResolver(import.meta.url);

// TODO: Export them via buefy
const ALL_COMPONENT_NAMES = {
  BAutocomplete: true,
  BBreadcrumb: true,
  BBreadcrumbItem: true,
  BButton: true,
  BCarousel: true,
  BCheckbox: true,
  BClockpicker: true,
  BCollapse: true,
  BColorpicker: true,
  BDatepicker: true,
  BDatetimepicker: true,
  BDialog: true,
  BDropdown: true,
  BField: true,
  BIcon: true,
  BImage: true,
  BInput: true,
  BLoading: true,
  BMenu: true,
  BMenuItem: true,
  BMenuList: true,
  BMessage: true,
  BModal: true,
  BNavbar: true,
  BNotification: true,
  BNumberinput: true,
  BPagination: true,
  BProgress: true,
  BRadio: true,
  BRate: true,
  BSelect: true,
  BSidebar: true,
  BSkeleton: true,
  BSlider: true,
  BSnackbar: true,
  BSteps: true,
  BSwitch: true,
  BTabItem: true,
  BTable: true,
  BTabs: true,
  BTag: true,
  BTaginput: true,
  BTimepicker: true,
  BToast: true,
  BTooltip: true,
  BUpload: true,
};

export default defineNuxtModule({
  setup: () => {
    for (const name of Object.keys(ALL_COMPONENT_NAMES)) {
      addComponent({ export: name, filePath: packageName`buefy`, name });
    }

    addComponent({
      export: 'BCardModal',
      filePath: packageName`@dword-design/buefy-addons`,
      name: 'BCardModal',
    });

    addPlugin(resolver.resolve('./plugin'), { append: true });
  },
});
