import { Combobox, ComboboxOption, Field } from '@strapi/design-system';
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
    <Field.Root id={name} name={name} hint={description && formatMessage(description)}>
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
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  );
});

export default LinkFinder;
