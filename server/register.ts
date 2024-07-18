import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'link-picker',
    plugin: 'link-finder',
    type: 'json',
  });
};
