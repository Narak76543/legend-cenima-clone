import type { ToastProviderProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/toaster';
import type { ComponentConfig } from '../types/utils';
type Toaster = ComponentConfig<typeof theme, AppConfig, 'toaster'>;
export interface ToasterProps extends Omit<ToastProviderProps, 'swipeDirection'> {
    /**
     * The position on the screen to display the toasts.
     * @defaultValue 'bottom-right'
     */
    position?: Toaster['variants']['position'];
    /**
     * Expand the toasts to show multiple toasts at once.
     * @defaultValue true
     */
    expand?: boolean;
    /**
     * Render the toaster in a portal.
     * @defaultValue true
     */
    portal?: boolean | string | HTMLElement;
    class?: any;
    ui?: Toaster['slots'];
}
export interface ToasterSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ToasterProps>, {
    expand: boolean;
    portal: boolean;
    duration: number;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ToasterProps>, {
    expand: boolean;
    portal: boolean;
    duration: number;
}>>> & Readonly<{}>, {
    duration: number;
    expand: boolean;
    portal: boolean | string | HTMLElement;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<ToasterSlots> & ToasterSlots>;
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
