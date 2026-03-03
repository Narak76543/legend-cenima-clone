import { DropdownMenu } from 'reka-ui/namespaced';
import type { DropdownMenuContentProps as RekaDropdownMenuContentProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import type theme from '#build/ui/dropdown-menu';
import type { DropdownMenuItem, DropdownMenuSlots } from '../types';
import type { ArrayOrNested, NestedItem, ComponentConfig } from '../types/utils';
type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>;
interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
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
        [K in keyof Required<DropdownMenu['slots']>]: (props?: Record<string, any>) => string;
    };
    uiOverride?: DropdownMenu['slots'];
}
declare const _default: <T extends ArrayOrNested<DropdownMenuItem>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<any & DropdownMenuContentProps<T> & Partial<{}>> & (import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps);
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: Readonly<Omit<DropdownMenuSlots<T>, "default"> & {
        default(props?: {}): any;
    }> & Omit<DropdownMenuSlots<T>, "default"> & {
        default(props?: {}): any;
    };
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
