import type { CheckboxRootProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/checkbox';
import type { ComponentConfig } from '../types/utils';
type Checkbox = ComponentConfig<typeof theme, AppConfig, 'checkbox'>;
export interface CheckboxProps extends Pick<CheckboxRootProps, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    label?: string;
    description?: string;
    /**
     * @defaultValue 'primary'
     */
    color?: Checkbox['variants']['color'];
    /**
     * @defaultValue 'list'
     */
    variant?: Checkbox['variants']['variant'];
    /**
     * @defaultValue 'md'
     */
    size?: Checkbox['variants']['size'];
    /**
     * Position of the indicator.
     * @defaultValue 'start'
     */
    indicator?: Checkbox['variants']['indicator'];
    /**
     * The icon displayed when checked.
     * @defaultValue appConfig.ui.icons.check
     * @IconifyIcon
     */
    icon?: string;
    /**
     * The icon displayed when the checkbox is indeterminate.
     * @defaultValue appConfig.ui.icons.minus
     * @IconifyIcon
     */
    indeterminateIcon?: string;
    class?: any;
    ui?: Checkbox['slots'];
}
export type CheckboxEmits = {
    change: [payload: Event];
};
export interface CheckboxSlots {
    label(props: {
        label?: string;
    }): any;
    description(props: {
        description?: string;
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    modelValue?: boolean | "indeterminate";
} & CheckboxProps>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    modelValue?: boolean | "indeterminate";
} & CheckboxProps>>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<CheckboxSlots> & CheckboxSlots>;
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
