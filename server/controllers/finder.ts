import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx: any) {
    const res = await strapi.plugin('link-finder')?.service('finder')?.find(ctx.request.query?.q);
    ctx.body = res || [];
  },

  config(ctx: any) {
    const config = strapi.config.get('plugin.link-finder');
    ctx.send({ config });
  },
});
