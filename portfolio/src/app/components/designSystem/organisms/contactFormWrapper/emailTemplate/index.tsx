import { isDefined } from '@/typeGuards';
import type { EmailTemplateType } from './types';

const EmailTemplate: EmailTemplateType = (props) => {
  const data = [
    { label: 'Country Code', value: props.countryCode },
    { label: 'Phone Number', value: props.phoneNumber },
    { label: 'Email', value: props.email },
    { label: 'First Name', value: props.firstName },
    { label: 'Last Name', value: props.lastName },
    { label: 'Message', value: props.message }
  ];

  if (isDefined(props.isPlain)) {
    return (
      data
        // eslint-disable-next-line no-restricted-syntax
        .map(({ label, value }) => {
          return `${label}: ${value}`;
        })
        .join('\n')
    );
  }

  return (
    <table
      style={{
        border: '1px solid oklch(0.446 0.043 257.281)',
        borderCollapse: 'collapse',
        fontSize: '16px'
      }}
    >
      <tbody>
        {/* eslint-disable-next-line no-restricted-syntax */}
        {data.map(({ label, value }) => {
          return (
            <tr key={label}>
              <td style={{ border: '1px solid oklch(0.446 0.043 257.281)', fontWeight: 700, padding: '8px' }}>{label}</td>
              <td style={{ border: '1px solid oklch(0.446 0.043 257.281)', padding: '8px' }}>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { EmailTemplate };
