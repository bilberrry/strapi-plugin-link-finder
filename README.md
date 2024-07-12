# Strapi Link Finder

A plugin for Strapi CMS that adds select field to find a page and populate Title / URL fields.

**Issue**
* For e.g. you have Link component that has title / url fields.
* Each time you create / update Link you need to fill in title / url fields by hand.  

**What to do?**
* Install this plugin to your Strapi project (See [here](#installation))
* Enable and configure this plugin in your Strapi project ```./config/plugins.(js|ts)``` file (See [here](#configuration))
* Add this plugin custom field to your Link schema in Strapi admin panel.  

**Result**
* Now you can use this plugin select field to find desired page, select it and populate title / url fields by selected page data.

## Installation

```bash
yarn add strapi-plugin-link-finder@latest
```

Don't forget to **restart or rebuild** your Strapi app when installing a new plugin.

## Configuration

| property                  | type   | description                                                                                                  |
|---------------------------|--------|--------------------------------------------------------------------------------------------------------------|
| contentTypes              | array  | An array of objects describing which content types should be used to get page list.                          |
| contentTypes[].uid        | string | The `uid` value of content type.                                                                             |
| contentTypes[].titleField | string | Content type title field name: - used for filtering page list query; - returned in page list.                |
| contentTypes[].urlField   | string | Content type url field name: -used for filtering page list query; - returned in page list.                   |
| form                      | object | Object describing form (component) where this select field is added to populate adjacent title / url fields. |
| form.titleField           | string | Form (component) title field name to populate.                                                               |
| form.urlField             | string | Form (component) url field name to populate.                                                                 |

#### Example

```ts
// ./config/plugins.ts
export default ({ env }) => ({
    'link-finder': {
        enabled: true,
        config: {
            contentTypes: [
                { uid: 'api::page.page', titleField: 'title', urlField: 'fullUrl' },
                { uid: 'api::blog.blog', titleField: 'title', urlField: 'fullUrl' },
            ],
            form: { titleField: 'text', urlField: 'url' },
        },
    }
});
```