import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/alert';
import type { AvatarProps, ButtonProps } from '../types';
import type { ComponentConfig } from '../types/utils';
type Alert = ComponentConfig<typeof theme, AppConfig, 'alert'>;
export interface AlertProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    title?: string;
    description?: string;
    /**
     * @IconifyIcon
     */
    icon?: string;
    avatar?: AvatarProps;
    /**
     * @defaultValue 'primary'
     */
    color?: Alert['variants']['color'];
    /**
     * @defaultValue 'solid'
     */
    variant?: Alert['variants']['variant'];
    /**
     * The orientation between the content and the actions.
     * @defaultValue 'vertical'
     */
    orientation?: Alert['variants']['orientation'];
    /**
     * Display a list of actions:
     * - under the title and description when orientation is `vertical`
     * - next to the close button when orientation is `horizontal`
     * `{ size: 'xs' }`{lang="ts-type"}
     */
    actions?: ButtonProps[];
    /**
     * Display a close button to dismiss the alert.
     * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
     * @emits 'update:open'
     * @defaultValue false
     */
    close?: boolean | Partial<ButtonProps>;
    /**
     * The icon displayed in the close button.
     * @defaultValue appConfig.ui.icons.close
     * @IconifyIcon
     */
    closeIcon?: string;
    class?: any;
    ui?: Alert['slots'];
}
export interface AlertEmits {
    (e: 'update:open', value: boolean): void;
}
export interface AlertSlots {
    leading(props?: {}): any;
    title(props?: {}): any;
    description(props?: {}): any;
    actions(props?: {}): any;
    close(props: {
        ui: {
            [K in keyof Required<Alert['slots']>]: (props?: Record<string, any>) => string;
        };
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<AlertProps>, {
    orientation: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    orientation: Alert["variants"]["orientation"];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<AlertSlots> & AlertSlots>;
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
