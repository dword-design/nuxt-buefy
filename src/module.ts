import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';

const resolver = createResolver(import.meta.url);

export default defineNuxtModule({
  setup: () => addPlugin(resolver.resolve('./plugin'), { append: true }),
});
