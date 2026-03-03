import { Popover } from 'reka-ui/namespaced';
import type { PopoverRootProps, HoverCardRootProps, PopoverRootEmits, PopoverContentProps, PopoverContentEmits, PopoverArrowProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/popover';
import type { EmitsToProps, ComponentConfig } from '../types/utils';
type Popover = ComponentConfig<typeof theme, AppConfig, 'popover'>;
export interface PopoverProps extends PopoverRootProps, Pick<HoverCardRootProps, 'openDelay' | 'closeDelay'> {
    /**
     * The display mode of the popover.
     * @defaultValue 'click'
     */
    mode?: 'click' | 'hover';
    /**
     * The content of the popover.
     * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
     */
    content?: Omit<PopoverContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<PopoverContentEmits>>;
    /**
     * Display an arrow alongside the popover.
     * @defaultValue false
     */
    arrow?: boolean | Omit<PopoverArrowProps, 'as' | 'asChild'>;
    /**
     * Render the popover in a portal.
     * @defaultValue true
     */
    portal?: boolean | string | HTMLElement;
    /**
     * When `false`, the popover will not close when clicking outside or pressing escape.
     * @defaultValue true
     */
    dismissible?: boolean;
    class?: any;
    ui?: Popover['slots'];
}
export interface PopoverEmits extends PopoverRootEmits {
    'close:prevent': [];
}
export interface PopoverSlots {
    default(props: {
        open: boolean;
    }): any;
    content(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<PopoverProps>, {
    portal: boolean;
    mode: string;
    openDelay: number;
    closeDelay: number;
    dismissible: boolean;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    mode: "click" | "hover";
    portal: boolean | string | HTMLElement;
    dismissible: boolean;
    openDelay: number;
    closeDelay: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<PopoverSlots> & PopoverSlots>;
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
