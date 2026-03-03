import type { InputHTMLAttributes } from 'vue';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/input';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { ComponentConfig } from '../types/utils';
type Input = ComponentConfig<typeof theme, AppConfig, 'input'>;
export interface InputProps extends UseComponentIconsProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    id?: string;
    name?: string;
    type?: InputHTMLAttributes['type'];
    /** The placeholder text when the input is empty. */
    placeholder?: string;
    /**
     * @defaultValue 'primary'
     */
    color?: Input['variants']['color'];
    /**
     * @defaultValue 'outline'
     */
    variant?: Input['variants']['variant'];
    /**
     * @defaultValue 'md'
     */
    size?: Input['variants']['size'];
    required?: boolean;
    autocomplete?: InputHTMLAttributes['autocomplete'];
    autofocus?: boolean;
    autofocusDelay?: number;
    disabled?: boolean;
    /** Highlight the ring color like a focus state. */
    highlight?: boolean;
    class?: any;
    ui?: Input['slots'];
}
export interface InputEmits {
    (e: 'update:modelValue', payload: string | number): void;
    (e: 'blur', event: FocusEvent): void;
    (e: 'change', event: Event): void;
}
export interface InputSlots {
    leading(props?: {}): any;
    default(props?: {}): any;
    trailing(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: string | number | null;
} & InputProps>, {
    type: string;
    autocomplete: string;
    autofocusDelay: number;
}>>, {
    inputRef: import("vue").Ref<HTMLInputElement | null, HTMLInputElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: string | number | null;
} & InputProps>, {
    type: string;
    autocomplete: string;
    autofocusDelay: number;
}>>> & Readonly<{}>, {
    type: import("vue").InputTypeHTMLAttribute;
    autocomplete: string;
    autofocusDelay: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<InputSlots> & InputSlots>;
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
