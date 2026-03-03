import type { PaginationRootProps, PaginationRootEmits } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/pagination';
import type { ButtonProps } from '../types';
import type { ComponentConfig } from '../types/utils';
type Pagination = ComponentConfig<typeof theme, AppConfig, 'pagination'>;
export interface PaginationProps extends Partial<Pick<PaginationRootProps, 'defaultPage' | 'disabled' | 'itemsPerPage' | 'page' | 'showEdges' | 'siblingCount' | 'total'>> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * The icon to use for the first page control.
     * @defaultValue appConfig.ui.icons.chevronDoubleLeft
     * @IconifyIcon
     */
    firstIcon?: string;
    /**
     * The icon to use for the previous page control.
     * @defaultValue appConfig.ui.icons.chevronLeft
     * @IconifyIcon
     */
    prevIcon?: string;
    /**
     * The icon to use for the next page control.
     * @defaultValue appConfig.ui.icons.chevronRight
     * @IconifyIcon
     */
    nextIcon?: string;
    /**
     * The icon to use for the last page control.
     * @defaultValue appConfig.ui.icons.chevronDoubleRight
     * @IconifyIcon
     */
    lastIcon?: string;
    /**
     * The icon to use for the ellipsis control.
     * @defaultValue appConfig.ui.icons.ellipsis
     * @IconifyIcon
     */
    ellipsisIcon?: string;
    /**
     * The color of the pagination controls.
     * @defaultValue 'neutral'
     * @IconifyIcon
     */
    color?: ButtonProps['color'];
    /**
     * The variant of the pagination controls.
     * @defaultValue 'outline'
     */
    variant?: ButtonProps['variant'];
    /**
     * The color of the active pagination control.
     * @defaultValue 'primary'
     */
    activeColor?: ButtonProps['color'];
    /**
     * The variant of the active pagination control.
     * @defaultValue 'solid'
     */
    activeVariant?: ButtonProps['variant'];
    /**
     * Whether to show the first, previous, next, and last controls.
     * @defaultValue true
     */
    showControls?: boolean;
    size?: ButtonProps['size'];
    /**
     * A function to render page controls as links.
     * @param page The page number to navigate to.
     */
    to?: (page: number) => ButtonProps['to'];
    class?: any;
    ui?: Pagination['slots'];
}
export interface PaginationEmits extends PaginationRootEmits {
}
export interface PaginationSlots {
    first(props?: {}): any;
    prev(props?: {}): any;
    next(props?: {}): any;
    last(props?: {}): any;
    ellipsis(props?: {}): any;
    item(props: {
        page: number;
        pageCount: number;
        item: {
            type: 'ellipsis';
        } | {
            type: 'page';
            value: number;
        };
        index: number;
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<PaginationProps>, {
    size: string;
    color: string;
    variant: string;
    activeColor: string;
    activeVariant: string;
    showControls: boolean;
    showEdges: boolean;
    itemsPerPage: number;
    siblingCount: number;
    total: number;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    size: "md" | "xs" | "sm" | "lg" | "xl";
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning" | "neutral";
    variant: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost";
    activeColor: "error" | "info" | "primary" | "secondary" | "success" | "warning" | "neutral";
    activeVariant: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost";
    itemsPerPage: number;
    showEdges: boolean;
    siblingCount: number;
    total: number;
    showControls: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<PaginationSlots> & PaginationSlots>;
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
