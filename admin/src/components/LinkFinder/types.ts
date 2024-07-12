import { MessageDescriptor } from 'react-intl';

export type OptionType = {
  value: string;
  label: string;
  entry: { id: number; title: string; url: string };
};

export type LinkFinderProps = {
  name: string;
  description?: MessageDescriptor;
  disabled?: boolean;
};

export type FindResponse = { data: { contentTypeUid: string; id: number; title: string; url: string }[] };

export type ConfigType = { form: { titleField: string; urlField: string } };

export type ConfigResponse = { data: { config: ConfigType } };
