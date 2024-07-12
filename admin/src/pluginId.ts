// eslint-disable-next-line no-restricted-imports
import pluginPkg from '../../package.json';

const pluginId = pluginPkg.strapi.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

export default pluginId;
