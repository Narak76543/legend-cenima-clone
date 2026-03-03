import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/textarea';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { ComponentConfig } from '../types/utils';
type Textarea = ComponentConfig<typeof theme, AppConfig, 'textarea'>;
export interface TextareaProps extends UseComponentIconsProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    id?: string;
    name?: string;
    /** The placeholder text when the textarea is empty. */
    placeholder?: string;
    /**
     * @defaultValue 'primary'
     */
    color?: Textarea['variants']['color'];
    /**
     * @defaultValue 'outline'
     */
    variant?: Textarea['variants']['variant'];
    /**
     * @defaultValue 'md'
     */
    size?: Textarea['variants']['size'];
    required?: boolean;
    autofocus?: boolean;
    autofocusDelay?: number;
    autoresize?: boolean;
    autoresizeDelay?: number;
    disabled?: boolean;
    class?: any;
    rows?: number;
    maxrows?: number;
    /** Highlight the ring color like a focus state. */
    highlight?: boolean;
    ui?: Textarea['slots'];
}
export interface TextareaEmits {
    (e: 'update:modelValue', payload: string | number): void;
    (e: 'blur', event: FocusEvent): void;
    (e: 'change', event: Event): void;
}
export interface TextareaSlots {
    leading(props?: {}): any;
    default(props?: {}): any;
    trailing(props?: {}): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: string | number | null;
} & TextareaProps>, {
    rows: number;
    maxrows: number;
    autofocusDelay: number;
    autoresizeDelay: number;
}>>, {
    textareaRef: import("vue").Ref<HTMLTextAreaElement | null, HTMLTextAreaElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<{
    modelValue?: string | number | null;
} & TextareaProps>, {
    rows: number;
    maxrows: number;
    autofocusDelay: number;
    autoresizeDelay: number;
}>>> & Readonly<{}>, {
    autofocusDelay: number;
    autoresizeDelay: number;
    rows: number;
    maxrows: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<TextareaSlots> & TextareaSlots>;
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
