import type { ComponentPublicInstance } from 'vue';
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/pin-input';
import type { ComponentConfig } from '../types/utils';
type PinInput = ComponentConfig<typeof theme, AppConfig, 'pinInput'>;
export interface PinInputProps extends Pick<PinInputRootProps, 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /**
     * @defaultValue 'primary'
     */
    color?: PinInput['variants']['color'];
    /**
     * @defaultValue 'outline'
     */
    variant?: PinInput['variants']['variant'];
    /**
     * @defaultValue 'md'
     */
    size?: PinInput['variants']['size'];
    /**
     * The number of input fields.
     * @defaultValue 5
     */
    length?: number | string;
    autofocus?: boolean;
    autofocusDelay?: number;
    highlight?: boolean;
    class?: any;
    ui?: PinInput['slots'];
}
export type PinInputEmits = PinInputRootEmits & {
    change: [payload: Event];
    blur: [payload: Event];
};
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<PinInputProps>, {
    type: string;
    length: number;
    autofocusDelay: number;
}>>, {
    inputsRef: import("vue").Ref<ComponentPublicInstance[], ComponentPublicInstance[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    length: number | string;
    type: "text" | "number";
    autofocusDelay: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
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
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
