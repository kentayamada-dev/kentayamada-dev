import type { JSXElement } from '@/types/components';
import type { Theme, Themes } from '@/types/constants';
import type { SelectEvent } from '@/types/events';

type ThemeSwitchPropsType = Readonly<{
  onChangeHandler: (event: SelectEvent) => void;
  theme: Theme;
  themes: Themes;
}>;

type ThemeSwitchType = (props: ThemeSwitchPropsType) => JSXElement;

export type { ThemeSwitchPropsType, ThemeSwitchType };
