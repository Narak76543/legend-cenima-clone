import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/avatar';
import type { ComponentConfig } from '../types/utils';
type Avatar = ComponentConfig<typeof theme, AppConfig, 'avatar'>;
export interface AvatarProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'span'
     */
    as?: any;
    src?: string;
    alt?: string;
    /**
     * @IconifyIcon
     */
    icon?: string;
    text?: string;
    /**
     * @defaultValue 'md'
     */
    size?: Avatar['variants']['size'];
    class?: any;
    style?: any;
    ui?: Avatar['slots'];
}
export interface AvatarSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<AvatarProps>, {
    as: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<AvatarProps>, {
    as: string;
}>>> & Readonly<{}>, {
    as: any;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, {
    default?(_: {}): any;
}>;
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
