import { FindResponse, OptionType } from './types';

export const findResponseToOptions = (res: FindResponse): OptionType[] =>
  (res?.data || []).map(({ contentTypeUid, id, title, url }) => ({
    value: contentTypeUid + '::' + id,
    label: `${title} - ${url}`,
    entry: { id, title, url },
  }));
