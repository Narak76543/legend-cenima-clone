import { Separator } from 'reka-ui';
import type { SeparatorProps as _SeparatorProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/separator';
import type { AvatarProps } from '../types';
import type { ComponentConfig } from '../types/utils';
type Separator = ComponentConfig<typeof theme, AppConfig, 'separator'>;
export interface SeparatorProps extends Pick<_SeparatorProps, 'decorative'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /** Display a label in the middle. */
    label?: string;
    /**
     * Display an icon in the middle.
     * @IconifyIcon
     */
    icon?: string;
    /** Display an avatar in the middle. */
    avatar?: AvatarProps;
    /**
     * @defaultValue 'neutral'
     */
    color?: Separator['variants']['color'];
    /**
     * @defaultValue 'xs'
     */
    size?: Separator['variants']['size'];
    /**
     * @defaultValue 'solid'
     */
    type?: Separator['variants']['type'];
    /**
     * The orientation of the separator.
     * @defaultValue 'horizontal'
     */
    orientation?: _SeparatorProps['orientation'];
    class?: any;
    ui?: Separator['slots'];
}
export interface SeparatorSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<SeparatorProps>, {
    orientation: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<SeparatorProps>, {
    orientation: string;
}>>> & Readonly<{}>, {
    orientation: "horizontal" | "vertical";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<SeparatorSlots> & SeparatorSlots>;
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
