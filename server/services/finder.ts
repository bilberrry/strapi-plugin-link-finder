import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(q: string) {
    const config = strapi.config.get('plugin.link-finder');

    const result: { contentTypeUid: string; id: number; title: string; url: string }[] = [];

    if (
      q?.trim() &&
      config?.['contentTypes']?.length > 0 &&
      config?.['contentTypes'].every((v: any) => !!(v.uid && v.titleField && v.urlField))
    ) {
      for (const contentType of config?.['contentTypes']) {
        const { uid, titleField, urlField } = contentType;

        const res = await strapi.service(uid)?.find({
          locale: 'all',
          filters: { $or: [{ [titleField]: { $containsi: q } }, { [urlField]: { $containsi: q } }] },
        });

        result.push(
          ...(res?.results || []).map((item: any) => ({
            contentTypeUid: uid,
            id: item.id,
            title: item[titleField],
            url: item[urlField],
          })),
        );
      }
    }

    return result;
  },
});
