import type { ThemeSwitchType } from './types';

export const ThemeSwitch: ThemeSwitchType = (props) => {
  return (
    <select
      aria-label='Select Theme'
      className='select select-bordered w-full max-w-xs'
      onChange={props.onChangeHandler}
      value={props.theme}
    >
      {props.themes.map((theme) => {
        return (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        );
      })}
    </select>
  );
};
