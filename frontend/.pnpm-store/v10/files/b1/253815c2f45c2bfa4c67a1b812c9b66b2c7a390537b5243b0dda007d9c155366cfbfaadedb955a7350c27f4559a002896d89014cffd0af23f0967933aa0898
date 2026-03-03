import { ContextMenu } from 'reka-ui/namespaced';
import type { ContextMenuContentProps as RekaContextMenuContentProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import type theme from '#build/ui/context-menu';
import type { ContextMenuItem } from '../types';
import type { ArrayOrNested, NestedItem, ComponentConfig } from '../types/utils';
type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>;
interface ContextMenuContentProps<T extends ArrayOrNested<ContextMenuItem>> extends Omit<RekaContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
    items?: T;
    portal?: boolean | string | HTMLElement;
    sub?: boolean;
    labelKey: keyof NestedItem<T>;
    /**
     * @IconifyIcon
     */
    checkedIcon?: string;
    /**
     * @IconifyIcon
     */
    loadingIcon?: string;
    /**
     * @IconifyIcon
     */
    externalIcon?: boolean | string;
    class?: any;
    ui: {
        [K in keyof Required<ContextMenu['slots']>]: (props?: Record<string, any>) => string;
    };
    uiOverride?: ContextMenu['slots'];
}
declare const _default: <T extends ArrayOrNested<ContextMenuItem>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<any & ContextMenuContentProps<T> & Partial<{}>> & (import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps);
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: Readonly<{
        default(props?: {}): any;
        item: (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'item-leading': (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'item-label': (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'item-trailing': (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'content-top': (props?: {}) => any;
        'content-bottom': (props?: {}) => any;
    } & import("../types").DynamicSlots<import("../types").MergeTypes<NestedItem<T>>, "trailing" | "leading" | "label", {
        active?: boolean;
        index: number;
    }>> & {
        default(props?: {}): any;
        item: (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'item-leading': (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'item-label': (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'item-trailing': (props: {
            item: NestedItem<T>;
            active?: boolean;
            index: number;
        }) => any;
        'content-top': (props?: {}) => any;
        'content-bottom': (props?: {}) => any;
    } & import("../types").DynamicSlots<import("../types").MergeTypes<NestedItem<T>>, "trailing" | "leading" | "label", {
        active?: boolean;
        index: number;
    }>;
    emit: ((evt: "escapeKeyDown", event: KeyboardEvent) => void) & ((evt: "pointerDownOutside", event: CustomEvent<{
        originalEvent: PointerEvent;
    }>) => void) & ((evt: "focusOutside", event: CustomEvent<{
        originalEvent: FocusEvent;
    }>) => void) & ((evt: "interactOutside", event: CustomEvent<{
        originalEvent: PointerEvent;
    }> | CustomEvent<{
        originalEvent: FocusEvent;
    }>) => void) & ((evt: "closeAutoFocus", event: Event) => void);
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
