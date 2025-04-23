import { computed, defineComponent, watch, ref } from 'vue';
import { basicProps } from './props';

export default defineComponent({
  props: basicProps,
  setup(props) {
    const { value, options, type } = props;
    const optionsMap = computed(() => {
      return options?.reduce((acc, cur) => {
        acc[cur.value] = cur;
        return acc;
      }, {});
    });
    const prefixElm = ref();
    const classBasic = ref();
    const style = ref();
    const item = ref();

    function renderItem(color: string) {
      let style: any,
        prefixElm: any,
        classBasic: string = 'break-all';
      if (type === 'text') {
        style = { color };
      } else if (type === 'dot') {
        classBasic += 'flex items-center';
        style = {
          position: 'relative',
          paddingLeft: '14px',
        };
        prefixElm = (
          <span
            style={{
              display: 'inline-block',
              position: 'absolute',
              left: 0,
              top: '50%',
              marginTop: '-5px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: color,
            }}
          ></span>
        );
      }
      return { style, prefixElm, classBasic };
    }

    watch(
      () => props.value,
      (newVal, oldVal) => {
        item.value = optionsMap.value?.[newVal];
        ({
          style: style.value,
          prefixElm: prefixElm.value,
          classBasic: classBasic.value,
        } = renderItem(item.value?.color));
      },
      { immediate: true },
    );
    return () => {
      return (
        <div class={classBasic.value} style={style.value}>
          {prefixElm.value}
          {item.value?.label || value}
        </div>
      );
    };
  },
});
