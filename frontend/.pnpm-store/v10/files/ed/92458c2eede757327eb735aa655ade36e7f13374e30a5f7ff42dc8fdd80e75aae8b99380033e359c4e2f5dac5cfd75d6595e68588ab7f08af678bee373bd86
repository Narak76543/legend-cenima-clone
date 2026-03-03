import type { TooltipRootProps, TooltipRootEmits, TooltipContentProps, TooltipContentEmits, TooltipArrowProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/tooltip';
import type { KbdProps } from '../types';
import type { EmitsToProps, ComponentConfig } from '../types/utils';
type Tooltip = ComponentConfig<typeof theme, AppConfig, 'tooltip'>;
export interface TooltipProps extends TooltipRootProps {
    /** The text content of the tooltip. */
    text?: string;
    /** The keyboard keys to display in the tooltip. */
    kbds?: KbdProps['value'][] | KbdProps[];
    /**
     * The content of the tooltip.
     * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
     */
    content?: Omit<TooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<TooltipContentEmits>>;
    /**
     * Display an arrow alongside the tooltip.
     * @defaultValue false
     */
    arrow?: boolean | Omit<TooltipArrowProps, 'as' | 'asChild'>;
    /**
     * Render the tooltip in a portal.
     * @defaultValue true
     */
    portal?: boolean | string | HTMLElement;
    class?: any;
    ui?: Tooltip['slots'];
}
export interface TooltipEmits extends TooltipRootEmits {
}
export interface TooltipSlots {
    default(props: {
        open: boolean;
    }): any;
    content(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<TooltipProps>, {
    portal: boolean;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    portal: boolean | string | HTMLElement;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<TooltipSlots> & TooltipSlots>;
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
