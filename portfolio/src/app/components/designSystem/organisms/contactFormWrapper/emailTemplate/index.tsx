import type { EmailTemplateType } from './types';

const EmailTemplate: EmailTemplateType = (props) => {
  return (
    <table
      style={{
        border: '1px solid oklch(0.446 0.043 257.281)',
        borderCollapse: 'collapse',
        fontSize: '16px'
      }}
    >
      <tbody>
        {props.data.map((data) => {
          return (
            <tr key={data.label}>
              <td style={{ border: '1px solid oklch(0.446 0.043 257.281)', fontWeight: 700, padding: '8px' }}>{data.label}</td>
              <td style={{ border: '1px solid oklch(0.446 0.043 257.281)', padding: '8px' }}>{data.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { EmailTemplate };
