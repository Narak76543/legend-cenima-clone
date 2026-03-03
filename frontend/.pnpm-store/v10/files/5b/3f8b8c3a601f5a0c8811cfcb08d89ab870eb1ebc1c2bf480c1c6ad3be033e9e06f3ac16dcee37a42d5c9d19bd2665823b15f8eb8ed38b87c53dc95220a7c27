import type { DrawerRootProps, DrawerRootEmits } from 'vaul-vue';
import type { DialogContentProps, DialogContentEmits } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/drawer';
import type { EmitsToProps, ComponentConfig } from '../types/utils';
type Drawer = ComponentConfig<typeof theme, AppConfig, 'drawer'>;
export interface DrawerProps extends Pick<DrawerRootProps, 'activeSnapPoint' | 'closeThreshold' | 'shouldScaleBackground' | 'setBackgroundColorOnScale' | 'scrollLockTimeout' | 'fixed' | 'dismissible' | 'modal' | 'open' | 'defaultOpen' | 'nested' | 'direction' | 'noBodyStyles' | 'handleOnly' | 'preventScrollRestoration' | 'snapPoints'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    title?: string;
    description?: string;
    /**
     * Whether to inset the drawer from the edges.
     * @defaultValue false
     */
    inset?: boolean;
    /** The content of the drawer. */
    content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>;
    /**
     * Render an overlay behind the drawer.
     * @defaultValue true
     */
    overlay?: boolean;
    /**
     * Render a handle on the drawer.
     * @defaultValue true
     */
    handle?: boolean;
    /**
     * Render the drawer in a portal.
     * @defaultValue true
     */
    portal?: boolean | string | HTMLElement;
    class?: any;
    ui?: Drawer['slots'];
}
export interface DrawerEmits extends DrawerRootEmits {
}
export interface DrawerSlots {
    default(props?: {}): any;
    content(props?: {}): any;
    header(props?: {}): any;
    title(props?: {}): any;
    description(props?: {}): any;
    body(props?: {}): any;
    footer(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<DrawerProps>, {
    direction: string;
    portal: boolean;
    overlay: boolean;
    handle: boolean;
    modal: boolean;
    dismissible: boolean;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    modal: boolean;
    portal: boolean | string | HTMLElement;
    overlay: boolean;
    direction: import("vaul-vue").DrawerDirection;
    dismissible: boolean;
    handle: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<DrawerSlots> & DrawerSlots>;
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
