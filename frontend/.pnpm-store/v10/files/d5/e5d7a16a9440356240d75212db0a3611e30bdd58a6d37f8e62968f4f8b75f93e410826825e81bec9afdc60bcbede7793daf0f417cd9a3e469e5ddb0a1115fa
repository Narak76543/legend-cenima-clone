import type { DialogRootProps, DialogRootEmits, DialogContentProps, DialogContentEmits } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/modal';
import type { ButtonProps } from '../types';
import type { EmitsToProps, ComponentConfig } from '../types/utils';
type Modal = ComponentConfig<typeof theme, AppConfig, 'modal'>;
export interface ModalProps extends DialogRootProps {
    title?: string;
    description?: string;
    /** The content of the modal. */
    content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>;
    /**
     * Render an overlay behind the modal.
     * @defaultValue true
     */
    overlay?: boolean;
    /**
     * Animate the modal when opening or closing.
     * @defaultValue true
     */
    transition?: boolean;
    /**
     * When `true`, the modal will take up the full screen.
     * @defaultValue false
     */
    fullscreen?: boolean;
    /**
     * Render the modal in a portal.
     * @defaultValue true
     */
    portal?: boolean | string | HTMLElement;
    /**
     * Display a close button to dismiss the modal.
     * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
     * @defaultValue true
     */
    close?: boolean | Partial<ButtonProps>;
    /**
     * The icon displayed in the close button.
     * @defaultValue appConfig.ui.icons.close
     * @IconifyIcon
     */
    closeIcon?: string;
    /**
     * When `false`, the modal will not close when clicking outside or pressing escape.
     * @defaultValue true
     */
    dismissible?: boolean;
    class?: any;
    ui?: Modal['slots'];
}
export interface ModalEmits extends DialogRootEmits {
    'after:leave': [];
    'close:prevent': [];
}
export interface ModalSlots {
    default(props: {
        open: boolean;
    }): any;
    content(props?: {}): any;
    header(props?: {}): any;
    title(props?: {}): any;
    description(props?: {}): any;
    close(props: {
        ui: {
            [K in keyof Required<Modal['slots']>]: (props?: Record<string, any>) => string;
        };
    }): any;
    body(props?: {}): any;
    footer(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ModalProps>, {
    close: boolean;
    portal: boolean;
    overlay: boolean;
    transition: boolean;
    modal: boolean;
    dismissible: boolean;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    close: boolean | Partial<ButtonProps>;
    modal: boolean;
    transition: boolean;
    portal: boolean | string | HTMLElement;
    overlay: boolean;
    dismissible: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<ModalSlots> & ModalSlots>;
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
