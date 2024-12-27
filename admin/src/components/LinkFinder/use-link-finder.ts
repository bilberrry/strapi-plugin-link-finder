import { unstable_useContentManagerContext as useContentManagerContext, useAuth } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';

// eslint-disable-next-line no-restricted-imports
import axios from '../../utils/axios';
import { ConfigResponse, ConfigType, FindResponse, LinkFinderProps, OptionType } from './types';
import { findResponseToOptions } from './utils';
// eslint-disable-next-line no-restricted-imports
import pluginId from '../../pluginId';

export const useLinkFinder = ({ name }: LinkFinderProps) => {
  const [config, setConfig] = useState<ConfigType | null>(null);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectTextValue, setSelectTextValue] = useState('');
  const token = useAuth(pluginId, (state) => state.token);

  const {
    form: { onChange },
  } = useContentManagerContext();

  useEffect(() => {
    axios<any, ConfigResponse>('/config', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res?.data?.config) {
        setConfig(res?.data?.config);
      }
    });
  }, []);

  useEffect(() => {
    if (!(selectTextValue || '').trim().length) {
      setOptions([]);
      return;
    }

    let timeout: any;

    if (selectTextValue.trim().length > 2) {
      timeout = setTimeout(() => {
        axios<any, FindResponse>('/find', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { q: selectTextValue },
        }).then((res) => {
          setOptions(findResponseToOptions(res));
        });
      }, 500);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [selectTextValue]);

  const handleSelectOptionChange = (value: string) => {
    const option = (options || []).find((option) => option.value === value);

    if (option) {
      setSelectTextValue('');

      if (onChange && config?.form?.titleField) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange({
          target: {
            name: name.split('.').slice(0, -1).join('.') + '.' + config?.form?.titleField,
            value: (option.entry.title || '').trim() || null,
            type: 'text',
          },
        });
      }
      if (onChange && config?.form?.urlField) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange({
          target: {
            name: name.split('.').slice(0, -1).join('.') + '.' + config?.form?.urlField,
            value: (option.entry.url || '').trim() || null,
            type: 'text',
          },
        });
      }
    }
  };

  const handleSelectInputChange = (e: any) => {
    setSelectTextValue(e.target.value);
  };

  const handleSelectClear = () => {
    setSelectTextValue('');
  };

  return {
    options,
    selectTextValue,
    handleSelectOptionChange,
    handleSelectInputChange,
    handleSelectClear,
  };
};
