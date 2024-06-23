import { addComponent } from '@nuxt/kit'

const rec = (currentComponents, parentName) => {
  for (const [name, subcomponents] of Object.entries(currentComponents)) {
    const componentName = `B${name}`;
    const folderName = (parentName || name).toLowerCase();
    addComponent({
      export: componentName,
      filePath: `buefy/dist/esm/${folderName}.js`,
      name: componentName,
    });
    if (typeof subcomponents === 'object') {
      rec(subcomponents, name)
    }
  }
}

export default rec