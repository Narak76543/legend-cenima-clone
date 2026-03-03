import type { ButtonHTMLAttributes } from 'vue';
import type { RouterLinkProps, RouteLocationRaw } from 'vue-router';
interface NuxtLinkProps extends Omit<RouterLinkProps, 'to'> {
    /**
     * Route Location the link should navigate to when clicked on.
     */
    to?: RouteLocationRaw;
    /**
     * An alias for `to`. If used with `to`, `href` will be ignored
     */
    href?: NuxtLinkProps['to'];
    /**
     * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
     */
    external?: boolean;
    /**
     * Where to display the linked URL, as the name for a browsing context.
     */
    target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
    /**
     * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
     */
    rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
    /**
     * If set to true, no rel attribute will be added to the link
     */
    noRel?: boolean;
    /**
     * A class to apply to links that have been prefetched.
     */
    prefetchedClass?: string;
    /**
     * When enabled will prefetch middleware, layouts and payloads of links in the viewport.
     */
    prefetch?: boolean;
    /**
     * Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.
     */
    prefetchOn?: 'visibility' | 'interaction' | Partial<{
        visibility: boolean;
        interaction: boolean;
    }>;
    /**
     * Escape hatch to disable `prefetch` attribute.
     */
    noPrefetch?: boolean;
}
export interface LinkProps extends NuxtLinkProps {
    /**
     * The element or component this component should render as when not a link.
     * @defaultValue 'button'
     */
    as?: any;
    /**
     * The type of the button when not a link.
     * @defaultValue 'button'
     */
    type?: ButtonHTMLAttributes['type'];
    disabled?: boolean;
    /** Force the link to be active independent of the current route. */
    active?: boolean;
    /** Will only be active if the current route is an exact match. */
    exact?: boolean;
    /** Allows controlling how the current route query sets the link as active. */
    exactQuery?: boolean | 'partial';
    /** Will only be active if the current route hash is an exact match. */
    exactHash?: boolean;
    /** The class to apply when the link is inactive. */
    inactiveClass?: string;
    custom?: boolean;
    /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
    raw?: boolean;
    class?: any;
}
export interface LinkSlots {
    default(props: {
        active: boolean;
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<LinkProps>, {
    as: string;
    type: string;
    ariaCurrentValue: string;
    active: undefined;
    activeClass: string;
    inactiveClass: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<LinkProps>, {
    as: string;
    type: string;
    ariaCurrentValue: string;
    active: undefined;
    activeClass: string;
    inactiveClass: string;
}>>> & Readonly<{}>, {
    type: "reset" | "submit" | "button";
    as: any;
    activeClass: string;
    ariaCurrentValue: "page" | "step" | "location" | "date" | "time" | "true" | "false";
    active: boolean;
    inactiveClass: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<LinkSlots> & LinkSlots>;
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
