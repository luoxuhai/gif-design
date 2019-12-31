import React, { useState } from 'react';
import { connect } from 'dva';
import { Tag } from 'antd';
import { fabric } from 'fabric';
import styles from './Filter.less';

const filters = [
  {
    name: '原图',
    filter: {
      filterObject: new fabric.Image.filters.Brightness({ brightness: 0 }),
      css: 'none',
    },
  },
  {
    name: '黑白',
    filter: {
      filterObject: new fabric.Image.filters.Grayscale(),
      css: 'grayscale(1)',
    },
  },
  {
    name: '高对比度',
    filter: {
      filterObject: new fabric.Image.filters.Contrast({ contrast: 0.5 }),
      css: 'contrast(150%)',
    },
  },
  {
    name: '变亮',
    filter: {
      filterObject: new fabric.Image.filters.Brightness({ brightness: 0.5 }),
      css: 'brightness(1.5)',
    },
  },
  {
    name: '变暗',
    filter: {
      filterObject: new fabric.Image.filters.Brightness({ brightness: -0.5 }),
      css: 'brightness(0.5)',
    },
  },
  {
    name: '反色',
    filter: {
      filterObject: new fabric.Image.filters.Invert(),
      css: 'invert(100%)',
    },
  },
  {
    name: '怀旧',
    filter: {
      filterObject: new fabric.Image.filters.Sepia(),
      css: 'sepia(100%)',
    },
  },
  {
    name: '阈值',
    filter: {
      filterObject: new fabric.Image.filters.Contrast({ contrast: 1 }),
      css: 'contrast(1000%)',
    },
  },
  {
    name: '噪点',
    filter: {
      filterObject: new fabric.Image.filters.Noise({ noise: 300 }),
      css: 'contrast(100%)',
    },
  },
  {
    name: '马赛克',
    filter: {
      filterObject: new fabric.Image.filters.Pixelate({ blocksize: 4 }),
      css: 'grayscale(0)',
    },
  },
];

export default connect(({ global }: any) => ({ ...global }))(
  ({ images, GIFOptions, canvasImages, dispatch }: Props): JSX.Element => {
    function handleSelectFilter(filter: any) {
      // 应用滤镜
      canvasImages.forEach((image: any) => {
        image.filters = [filter.filterObject];
        image.applyFilters();
      });

      dispatch({
        type: 'global/setGIFOptions',
        payload: {
          filter,
        },
      });
    }

    return (
      <div>
        <h3>全部滤镜</h3>
        <ul className={styles.filter__list}>
          {filters.map(item => (
            <li
              className={styles.filter__item}
              onClick={() => handleSelectFilter(item.filter)}
              key={item.name}
              title={item.name}
            >
              <img
                className={styles.filter__img}
                style={{ filter: item.filter.css }}
                src={images[0]?.url}
              />
              <Tag
                className={styles.filter__tag}
                color={GIFOptions.filter.css === item.filter.css ? '#108ee9' : 'blue'}
              >
                {item.name}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
