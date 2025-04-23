import type{ TextTranslateType } from './types';

export const basicProps = {
  value: {
    type: [String, Boolean, Number],
    default: '',
    required: true, // 必传
  },
  options: {
    type: Array as PropType<LabelValueOptions>,
  },
  type: {
    type: String as PropType<TextTranslateType>,
    default: 'text',
  },
};
