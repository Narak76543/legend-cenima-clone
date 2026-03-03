import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/button';
import type { LinkProps } from './Link.vue';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { ComponentConfig } from '../types/utils';
type Button = ComponentConfig<typeof theme, AppConfig, 'button'>;
export interface ButtonProps extends UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom'> {
    label?: string;
    /**
     * @defaultValue 'primary'
     */
    color?: Button['variants']['color'];
    activeColor?: Button['variants']['color'];
    /**
     * @defaultValue 'solid'
     */
    variant?: Button['variants']['variant'];
    activeVariant?: Button['variants']['variant'];
    /**
     * @defaultValue 'md'
     */
    size?: Button['variants']['size'];
    /** Render the button with equal padding on all sides. */
    square?: boolean;
    /** Render the button full width. */
    block?: boolean;
    /** Set loading state automatically based on the `@click` promise state */
    loadingAuto?: boolean;
    onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>;
    class?: any;
    ui?: Button['slots'];
}
export interface ButtonSlots {
    leading(props?: {}): any;
    default(props?: {}): any;
    trailing(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ButtonProps>, {
    active: undefined;
    activeClass: string;
    inactiveClass: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ButtonProps>, {
    active: undefined;
    activeClass: string;
    inactiveClass: string;
}>>> & Readonly<{}>, {
    activeClass: string;
    active: boolean;
    inactiveClass: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<ButtonSlots> & ButtonSlots>;
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
