import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/chip';
import type { ComponentConfig } from '../types/utils';
type Chip = ComponentConfig<typeof theme, AppConfig, 'chip'>;
export interface ChipProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /** Display some text inside the chip. */
    text?: string | number;
    /**
     * @defaultValue 'primary'
     */
    color?: Chip['variants']['color'];
    /**
     * @defaultValue 'md'
     */
    size?: Chip['variants']['size'];
    /**
     * The position of the chip.
     * @defaultValue 'top-right'
     */
    position?: Chip['variants']['position'];
    /** When `true`, keep the chip inside the component for rounded elements. */
    inset?: boolean;
    /** When `true`, render the chip relatively to the parent. */
    standalone?: boolean;
    class?: any;
    ui?: Chip['slots'];
}
export interface ChipEmits {
    (e: 'update:show', payload: boolean): void;
}
export interface ChipSlots {
    default(props?: {}): any;
    content(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    show?: boolean;
} & ChipProps>, {
    inset: boolean;
    standalone: boolean;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    inset: boolean;
    standalone: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<ChipSlots> & ChipSlots>;
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
