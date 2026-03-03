import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/button-group';
import type { ComponentConfig } from '../types/utils';
type ButtonGroup = ComponentConfig<typeof theme, AppConfig, 'buttonGroup'>;
export interface ButtonGroupProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * @defaultValue 'md'
     */
    size?: ButtonGroup['variants']['size'];
    /**
     * The orientation the buttons are laid out.
     * @defaultValue 'horizontal'
     */
    orientation?: ButtonGroup['variants']['orientation'];
    class?: any;
    ui?: ButtonGroup['slots'];
}
export interface ButtonGroupSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ButtonGroupProps>, {
    orientation: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ButtonGroupProps>, {
    orientation: string;
}>>> & Readonly<{}>, {
    orientation: ButtonGroup["variants"]["orientation"];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<ButtonGroupSlots> & ButtonGroupSlots>;
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
