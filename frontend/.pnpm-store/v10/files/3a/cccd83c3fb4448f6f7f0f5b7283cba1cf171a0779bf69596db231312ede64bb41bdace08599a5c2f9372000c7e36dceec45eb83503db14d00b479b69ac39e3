import type { SliderRootProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/slider';
import type { ComponentConfig } from '../types/utils';
type Slider = ComponentConfig<typeof theme, AppConfig, 'slider'>;
export interface SliderProps extends Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * @defaultValue 'md'
     */
    size?: Slider['variants']['size'];
    /**
     * @defaultValue 'primary'
     */
    color?: Slider['variants']['color'];
    /**
     * The orientation of the slider.
     * @defaultValue 'horizontal'
     */
    orientation?: SliderRootProps['orientation'];
    /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
    defaultValue?: number | number[];
    class?: any;
    ui?: Slider['slots'];
}
export interface SliderEmits {
    (e: 'update:modelValue', payload: number | number[]): void;
    (e: 'change', payload: Event): void;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: number | number[];
} & SliderProps>, {
    min: number;
    max: number;
    step: number;
    orientation: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: number | number[];
} & SliderProps>, {
    min: number;
    max: number;
    step: number;
    orientation: string;
}>>> & Readonly<{}>, {
    orientation: "horizontal" | "vertical";
    step: number;
    max: number;
    min: number;
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
