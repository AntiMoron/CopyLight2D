import { LightSource } from '../light';

/**
 * 虚拟物体
 * 用于描述一个物体
 * @date 9012/02/03
 * @author antimoron
 */
export class SDF {
    /**
     * 记录光场用的一些属性
     * @param {object} props
     */
    constructor(props) {
        this._props = { ...props };
        this.getLightSource = this.getLightSource.bind(this);
    }

    // TODO: 环形检测，检测好了记得骂人蠢
    // 记录操作构建图形场景
    // 传{ t: 'u(nion) | i(ntersect) | s(ubtract)', to: SDF}
    _opQueue = [];

    /**
     * 合并两个光
     */
    union = (o) => {
        if (!o) { return; }
        this._opQueue.push({
            t: 'u',
            to: o
        });
        return this;
    }
    /**
     * 交集两个光
     */
    intersect = (o) => {
        if (!o) { return; }
        this._opQueue.push({
            t: 'i',
            to: o
        });
        return this;
    }
    /**
     * 减法两个光
     * 注意没有交换律
     */
    subtract = (o) => {
        if (!o) { return; }
        this._opQueue.push({
            t: 's',
            to: o
        });
        return this;
    }

    // 获取光距
    getSourceDistance(_) {
        return 0;
    }

    // 获取光源
    getLightSource(xy) {
        const props = {
            ...this._props,
            sourceDistance: this.getSourceDistance(xy)
        }
        const ls = new LightSource();
        for (const key in props) {
            ls[key] = props[key];
        }
        return ls;
    }
}