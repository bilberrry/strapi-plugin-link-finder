import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'link-picker',
    plugin: 'link-finder',
    type: 'json',
  });
};
