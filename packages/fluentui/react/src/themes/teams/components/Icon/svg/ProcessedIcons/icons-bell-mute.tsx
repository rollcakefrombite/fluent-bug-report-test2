import * as React from 'react';
import cx from 'classnames';
import { TeamsProcessedSvgIconSpec } from '../types';
import { teamsIconClassNames } from '../teamsIconClassNames';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M23.86 8.148c.098.1.148.217.148.352a.48.48 0 0 1-.149.352l-2.937 2.937c.13.49.195.959.195 1.406V17c0 .23.046.41.137.54.09.13.22.231.387.304.13.062.289.115.476.156.402.084.685.232.852.445.098.131.148.316.148.555a.95.95 0 0 1-.297.695c-.093.094-.203.168-.328.223s-.25.082-.375.082h-9.406l-3.852 3.852a.487.487 0 0 1-.707-.004A.478.478 0 0 1 8 23.5c0-.13.044-.24.133-.328L22.969 8.344c.12-.125.214-.214.281-.266A.411.411 0 0 1 23.508 8a.48.48 0 0 1 .351.148zm-5.602.375c.687.35 1.26.816 1.719 1.399l-.711.703a4.05 4.05 0 0 0-1.383-1.18 3.84 3.84 0 0 0-3.215-.172 4.058 4.058 0 0 0-1.246.766 4.003 4.003 0 0 0-.961 1.344A3.938 3.938 0 0 0 12.109 13v4c0 .323-.077.633-.23.93s-.36.53-.621.703c-.34.24-.722.362-1.149.367h.782l-.977.977a1.035 1.035 0 0 1-.57-.356.937.937 0 0 1-.235-.621c0-.224.047-.402.141-.535s.221-.236.383-.309c.13-.062.289-.114.476-.156.401-.083.685-.231.852-.445.099-.12.148-.305.148-.555v-4c0-.896.23-1.731.688-2.508.219-.37.481-.708.789-1.015a5.12 5.12 0 0 1 1.016-.79A4.852 4.852 0 0 1 16.109 8c.745 0 1.461.175 2.149.523zm.207 12.625c.101.1.152.217.152.352a2.503 2.503 0 0 1-.734 1.758c-.23.23-.497.41-.805.543s-.628.199-.96.199-.652-.064-.954-.195a2.653 2.653 0 0 1-.812-.547 2.45 2.45 0 0 1-.743-1.758c0-.135.051-.252.153-.352a.494.494 0 0 1 .355-.148h4c.13 0 .246.05.348.148zM13.71 19h8.406c-.265 0-.52-.052-.762-.156a2.068 2.068 0 0 1-1.082-1.082 1.902 1.902 0 0 1-.156-.762v-3.805c0-.172-.013-.356-.039-.554L13.711 19zm.984 3c.099.287.284.526.555.719.26.187.55.281.867.281.313 0 .599-.094.86-.281.27-.193.456-.432.554-.719h-2.836z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M23.855 8.148c.102.1.153.217.153.352a.48.48 0 0 1-.149.352l-2.937 2.937c.125.459.187.927.187 1.406V17c0 .23.046.41.137.54.09.13.22.231.387.304.13.062.289.115.476.156.402.084.685.232.852.445.099.12.148.305.148.555a.95.95 0 0 1-.297.695c-.093.094-.203.168-.328.223s-.25.082-.375.082h-9.398l-3.852 3.852c-.099.1-.216.148-.351.148a.485.485 0 0 1-.352-.145.466.466 0 0 1-.148-.347c0-.135.039-.242.117-.32L22.969 8.344l.129-.133a.843.843 0 0 1 .199-.156.441.441 0 0 1 .21-.055c.13 0 .247.05.348.148zm-5.597.375c.687.35 1.26.816 1.719 1.399L9.914 19.977a1.134 1.134 0 0 1-.574-.36.912.912 0 0 1-.23-.617c0-.229.045-.408.136-.54.09-.129.22-.23.387-.304.13-.062.289-.114.476-.156.401-.083.685-.231.852-.445.099-.12.148-.305.148-.555v-4c0-.89.23-1.729.688-2.516a5.024 5.024 0 0 1 1.805-1.796A4.852 4.852 0 0 1 16.109 8c.745 0 1.461.175 2.149.523zm.203 12.625c.099.1.148.217.148.352 0 .339-.065.66-.195.96a2.562 2.562 0 0 1-1.344 1.344c-.301.132-.622.196-.96.196-.334 0-.652-.064-.954-.195-.302-.13-.57-.313-.804-.547s-.417-.502-.547-.805a2.385 2.385 0 0 1-.196-.953c0-.135.05-.252.149-.352a.48.48 0 0 1 .351-.148h4a.48.48 0 0 1 .352.148z"
      />
    </svg>
  ),
  styles: {},
  exportedAs: 'bell-slash'
} as TeamsProcessedSvgIconSpec;
