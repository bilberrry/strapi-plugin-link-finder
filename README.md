# Strapi Link Finder

A plugin for Strapi CMS that adds select field to find a page and populate Title / URL fields.

* For e.g. you have Link component that has title / url fields.
* Each time you create / update Link you need to fill in title / url fields by hand.
* Add this **custom field** to your Link schema.
* In result, you can use this **custom field** to find desired page, select it and populate title / url fields by selected page data.

## Installation

```bash
yarn add strapi-plugin-link-finder@latest
```

Don't forget to **restart or rebuild** your Strapi app when installing a new plugin.

## Configuration

| property                  | type   | description                                                                                                                                      |
|---------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| contentTypes              | array  | An array of objects describing which content types should use to get page list for **select field** options.                                     |
| contentTypes[].uid        | string | The `uid` value of content type.                                                                                                                 |
| contentTypes[].titleField | string | Content type **title** field name: 1) used for filtering get page list query 2) returned in resulted get page list for **select field** options. |
| contentTypes[].urlField   | string | Content type **url** field name: 1) used for filtering get page list query 2) returned in resulted get page list for **select field** options.   |
| form                      | object | Object describing form (component) where this select field is added to populate adjacent title / url fields.                                     |
| form.titleField           | object | Form (component) **title** field name to populate.                                                                                               |
| form.urlField             | object | Form (component) **url** field name to populate.                                                                                                 |

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