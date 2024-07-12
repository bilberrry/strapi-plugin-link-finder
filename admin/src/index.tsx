import { prefixPluginTranslations } from '@strapi/helper-plugin';

/* eslint-disable no-restricted-imports */
import pluginPkg from '../../package.json';
import Initializer from './components/Initializer';
import LinkFinderIcon from './components/LinkFinderIcon';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';

const name = pluginPkg.strapi.displayName;

export default {
  register(app: any) {
    app.customFields.register({
      name: 'link-picker',
      pluginId,
      type: 'json',
      intlLabel: {
        id: getTrad('link-finder.label'),
        defaultMessage: 'Link',
      },
      intlDescription: {
        id: getTrad('link-finder.description'),
        defaultMessage: 'Find a link to an existing entry.',
      },
      icon: LinkFinderIcon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-link-finder-component" */ './components/LinkFinder'),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'private',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.privateField',
                  defaultMessage: 'Private field',
                },
                description: {
                  id: 'form.attribute.item.privateField.description',
                  defaultMessage: 'This field will not show up in the API response',
                },
              },
            ],
          },
        ],
      },
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap() {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
