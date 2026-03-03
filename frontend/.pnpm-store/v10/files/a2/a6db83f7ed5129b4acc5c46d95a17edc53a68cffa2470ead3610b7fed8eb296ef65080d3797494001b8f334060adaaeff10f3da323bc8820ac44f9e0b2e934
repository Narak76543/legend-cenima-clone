import type { SwitchRootProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/switch';
import type { ComponentConfig } from '../types/utils';
type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>;
export interface SwitchProps extends Pick<SwitchRootProps, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * @defaultValue 'primary'
     */
    color?: Switch['variants']['color'];
    /**
     * @defaultValue 'md'
     */
    size?: Switch['variants']['size'];
    /** When `true`, the loading icon will be displayed. */
    loading?: boolean;
    /**
     * The icon when the `loading` prop is `true`.
     * @defaultValue appConfig.ui.icons.loading
     * @IconifyIcon
     */
    loadingIcon?: string;
    /**
     * Display an icon when the switch is checked.
     * @IconifyIcon
     */
    checkedIcon?: string;
    /**
     * Display an icon when the switch is unchecked.
     * @IconifyIcon
     */
    uncheckedIcon?: string;
    label?: string;
    description?: string;
    class?: any;
    ui?: Switch['slots'];
}
export type SwitchEmits = {
    change: [payload: Event];
};
export interface SwitchSlots {
    label(props: {
        label?: string;
    }): any;
    description(props: {
        description?: string;
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    modelValue?: boolean;
} & SwitchProps>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    modelValue?: boolean;
} & SwitchProps>>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<SwitchSlots> & SwitchSlots>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
