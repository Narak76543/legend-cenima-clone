import type { ProgressRootProps, ProgressRootEmits } from 'reka-ui';
import type { AppConfig } from '@nuxt/schema';
import theme from '#build/ui/progress';
import type { ComponentConfig } from '../types/utils';
type Progress = ComponentConfig<typeof theme, AppConfig, 'progress'>;
export interface ProgressProps extends Pick<ProgressRootProps, 'getValueLabel' | 'modelValue'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    /** The maximum progress value. */
    max?: number | Array<any>;
    /** Display the current progress value. */
    status?: boolean;
    /** Whether the progress is visually inverted. */
    inverted?: boolean;
    /**
     * @defaultValue 'md'
     */
    size?: Progress['variants']['size'];
    /**
     * @defaultValue 'primary'
     */
    color?: Progress['variants']['color'];
    /**
     * The orientation of the progress bar.
     * @defaultValue 'horizontal'
     */
    orientation?: Progress['variants']['orientation'];
    /**
     * The animation of the progress bar.
     * @defaultValue 'carousel'
     */
    animation?: Progress['variants']['animation'];
    class?: any;
    ui?: Progress['slots'];
}
export interface ProgressEmits extends ProgressRootEmits {
}
export type ProgressSlots = {
    status(props: {
        percent?: number;
    }): any;
} & {
    [key: string]: (props: {
        step: number;
    }) => any;
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<ProgressProps>, {
    inverted: boolean;
    modelValue: null;
    orientation: string;
}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any, string, import("vue").PublicProps, any, {
    orientation: Progress["variants"]["orientation"];
    inverted: boolean;
    modelValue: number | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, Readonly<{
    status(props: {
        percent?: number;
    }): any;
} & {
    [key: string]: (props: {
        step: number;
    }) => any;
}> & {
    status(props: {
        percent?: number;
    }): any;
} & {
    [key: string]: (props: {
        step: number;
    }) => any;
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
