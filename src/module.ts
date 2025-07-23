import {
  addComponent,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import packageName from 'depcheck-package-name';

const resolver = createResolver(import.meta.url);

// TODO: Export them via buefy
const ALL_COMPONENT_NAMES = [
  'Autocomplete',
  'Breadcrumb',
  'Button',
  'Carousel',
  'Checkbox',
  'Clockpicker',
  'Collapse',
  'Colorpicker',
  'Datepicker',
  'Datetimepicker',
  'Dialog',
  'Dropdown',
  'Field',
  'Icon',
  'Image',
  'Input',
  'Loading',
  'Menu',
  'Message',
  'Modal',
  'Navbar',
  'Notification',
  'Numberinput',
  'Pagination',
  'Progress',
  'Radio',
  'Rate',
  'Select',
  'Skeleton',
  'Sidebar',
  'Slider',
  'Snackbar',
  'Steps',
  'Switch',
  'Table',
  'Tabs',
  'Tag',
  'Taginput',
  'Timepicker',
  'Toast',
  'Tooltip',
  'Upload',
];

export default defineNuxtModule({
  setup: () => {
    for (const name of ALL_COMPONENT_NAMES) {
      addComponent({
        export: name,
        filePath: packageName`buefy`,
        name: `B${name}`,
      });
    }

    addPlugin(resolver.resolve('./plugin'), { append: true });
  },
});
