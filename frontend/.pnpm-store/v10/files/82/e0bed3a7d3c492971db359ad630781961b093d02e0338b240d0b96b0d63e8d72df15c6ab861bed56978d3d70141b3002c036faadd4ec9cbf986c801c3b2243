import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/color-picker';
import type { ComponentConfig } from '../types/utils';
type ColorPicker = ComponentConfig<typeof theme, AppConfig, 'colorPicker'>;
export type ColorPickerProps = {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * Throttle time in ms for the color picker
     */
    throttle?: number;
    /**
     * Disable the color picker
     */
    disabled?: boolean;
    /**
     * The default value of the color picker
     */
    defaultValue?: string;
    /**
     * Format of the color
     * @defaultValue 'hex'
     */
    format?: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab';
    /**
     * @defaultValue 'md'
     */
    size?: ColorPicker['variants']['size'];
    class?: any;
    ui?: ColorPicker['slots'];
};
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: string;
} & ColorPickerProps>, {
    format: string;
    throttle: number;
    defaultValue: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    format: "hex" | "rgb" | "hsl" | "cmyk" | "lab";
    defaultValue: string;
    throttle: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
