import { Box, Combobox, ComboboxOption, Field, Stack } from '@strapi/design-system';
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';

import { LinkFinderProps } from './types';
import { useLinkFinder } from './use-link-finder';

const LinkFinder = forwardRef<HTMLButtonElement, LinkFinderProps>((props) => {
  const { description, disabled = false, name } = props;

  const { formatMessage } = useIntl();

  const { options, selectTextValue, handleSelectOptionChange, handleSelectInputChange, handleSelectClear } =
    useLinkFinder(props);

  return (
    <Box>
      <Field id={name} name={name} hint={description && formatMessage(description)}>
        <Stack spacing={1}>
          <Combobox
            aria-label={'select-title-url'}
            placeholder={'Start typing to find a page'}
            autocomplete={{ type: 'list', filter: 'contains' }}
            onChange={handleSelectOptionChange}
            disabled={disabled}
            textValue={selectTextValue}
            value={''}
            onInputChange={handleSelectInputChange}
            onClear={handleSelectClear}
          >
            {(options || []).map((option) => (
              <ComboboxOption key={option.value} value={option.value}>
                {option.label}
              </ComboboxOption>
            ))}
            {(options || []).length === 0 && (
              <ComboboxOption disabled value={'no-results-found'}>
                {'No results found'}
              </ComboboxOption>
            )}
          </Combobox>
        </Stack>
      </Field>
    </Box>
  );
});

export default LinkFinder;
