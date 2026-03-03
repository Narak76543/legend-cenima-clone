import type { DialogRootProps, DialogRootEmits, DialogContentProps, DialogContentEmits } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/slideover';
import type { ButtonProps } from '../types';
import type { EmitsToProps, ComponentConfig } from '../types/utils';
type Slideover = ComponentConfig<typeof theme, AppConfig, 'slideover'>;
export interface SlideoverProps extends DialogRootProps {
    title?: string;
    description?: string;
    /** The content of the slideover. */
    content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>;
    /**
     * Render an overlay behind the slideover.
     * @defaultValue true
     */
    overlay?: boolean;
    /**
     * Animate the slideover when opening or closing.
     * @defaultValue true
     */
    transition?: boolean;
    /**
     * The side of the slideover.
     * @defaultValue 'right'
     */
    side?: Slideover['variants']['side'];
    /**
     * Render the slideover in a portal.
     * @defaultValue true
     */
    portal?: boolean | string | HTMLElement;
    /**
     * Display a close button to dismiss the slideover.
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
     * When `false`, the slideover will not close when clicking outside or pressing escape.
     * @defaultValue true
     */
    dismissible?: boolean;
    class?: any;
    ui?: Slideover['slots'];
}
export interface SlideoverEmits extends DialogRootEmits {
    'after:leave': [];
    'close:prevent': [];
}
export interface SlideoverSlots {
    default(props: {
        open: boolean;
    }): any;
    content(props?: {}): any;
    header(props?: {}): any;
    title(props?: {}): any;
    description(props?: {}): any;
    close(props: {
        ui: {
            [K in keyof Required<Slideover['slots']>]: (props?: Record<string, any>) => string;
        };
    }): any;
    body(props?: {}): any;
    footer(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<SlideoverProps>, {
    close: boolean;
    portal: boolean;
    overlay: boolean;
    transition: boolean;
    modal: boolean;
    dismissible: boolean;
    side: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    close: boolean | Partial<ButtonProps>;
    modal: boolean;
    transition: boolean;
    portal: boolean | string | HTMLElement;
    overlay: boolean;
    side: Slideover["variants"]["side"];
    dismissible: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<SlideoverSlots> & SlideoverSlots>;
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
