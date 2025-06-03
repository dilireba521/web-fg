import { defineComponent, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';

export default defineComponent({
    setup() {
        let map: any = null;
        
        // 阻止滚轮事件穿透的处理函数
        const preventScroll = (e: WheelEvent) => {
            e.stopPropagation();
            e.preventDefault();
        };

        onMounted(() => {
            // 获取地图容器并添加滚轮事件监听
            const container = document.getElementById('container');
            if (container) {
                container.addEventListener('wheel', preventScroll, { passive: false });
            }
            
            (window as any)._AMapSecurityConfig = {
                securityJsCode: "f71bed9750fd48d2802c5ef4c581faa0",
            };
            AMapLoader.load({
                key: "cb0c3f1e9b22e64e0e9abba9e3008b83", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
            })
                .then((AMap) => {
                    map = new AMap.Map("container", {
                        // 设置地图容器id
                        viewMode: "2D", // 是否为3D地图模式
                        zoom: 16, // 初始化地图级别
                        center: [118.188062, 24.474325], // 初始化地图中心点位置
                    });
                    //创建一个 Marker 实例：
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(118.188962, 24.474625), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: "诺言（湖北）私募基金管理有限公司",
                        offset: new AMap.Pixel(-11, -30), 
                        icon: new AMap.Icon({
                            image: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                            imageSize: new AMap.Size(22, 30), // 图标大小
                        }),
                    });
                    //将创建的点标记添加到已有的地图实例：
                    map.add(marker);
                })
                .catch((e) => {
                    console.log(e);
                });
        });

        onUnmounted(() => {
            // 移除事件监听器
            const container = document.getElementById('container');
            if (container) {
                container.removeEventListener('wheel', preventScroll);
            }
            map?.destroy();
        });
        
        return () => {
            return (
                <div class='h-100' id="container"></div>
            )
        }
    }
})