import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/form-field';
import type { ComponentConfig } from '../types/utils';
type FormField = ComponentConfig<typeof theme, AppConfig, 'formField'>;
export interface FormFieldProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /** The name of the FormField. Also used to match form errors. */
    name?: string;
    /** A regular expression to match form error names. */
    errorPattern?: RegExp;
    label?: string;
    description?: string;
    help?: string;
    error?: string | boolean;
    hint?: string;
    /**
     * @defaultValue 'md'
     */
    size?: FormField['variants']['size'];
    required?: boolean;
    /** If true, validation on input will be active immediately instead of waiting for a blur event. */
    eagerValidation?: boolean;
    /**
     * Delay in milliseconds before validating the form on input events.
     * @defaultValue `300`
     */
    validateOnInputDelay?: number;
    class?: any;
    ui?: FormField['slots'];
}
export interface FormFieldSlots {
    label(props: {
        label?: string;
    }): any;
    hint(props: {
        hint?: string;
    }): any;
    description(props: {
        description?: string;
    }): any;
    help(props: {
        help?: string;
    }): any;
    error(props: {
        error?: string | boolean;
    }): any;
    default(props: {
        error?: string | boolean;
    }): any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<FormFieldProps>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<FormFieldProps>>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<FormFieldSlots> & FormFieldSlots>;
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
