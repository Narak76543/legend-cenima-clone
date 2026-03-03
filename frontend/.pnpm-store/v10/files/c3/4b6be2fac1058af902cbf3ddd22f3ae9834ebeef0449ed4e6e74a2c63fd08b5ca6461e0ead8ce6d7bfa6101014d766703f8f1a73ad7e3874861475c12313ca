import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/avatar-group';
import type { ComponentConfig } from '../types/utils';
type AvatarGroup = ComponentConfig<typeof theme, AppConfig, 'avatarGroup'>;
export interface AvatarGroupProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * @defaultValue 'md'
     */
    size?: AvatarGroup['variants']['size'];
    /**
     * The maximum number of avatars to display.
     */
    max?: number | string;
    class?: any;
    ui?: AvatarGroup['slots'];
}
export interface AvatarGroupSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<AvatarGroupProps>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<AvatarGroupProps>>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<AvatarGroupSlots> & AvatarGroupSlots>;
export default _default;
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
