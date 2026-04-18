import {css} from "styled-components";

export const colors = {
    mainDark: '#161513',
    secondaryDark: '#323232FF',
    mainLight: '#E3E0DEFF',
    secondaryLight: '#B5B5BBFF',
} as const;
export const margins = {
    title: '25px',
    block: '12.5px',
    innerBlock: '6.25px',
} as const;

export const container = css`
    width: 100vw;
    height: 100dvh;
    max-width: 950px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
`;
export const imageDefault = css`
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
`;

// Flex positioning
const flexBase = css`
    display: flex;
    align-items: center;
`;
export const justifyCenter_around = css`
    ${flexBase};
    justify-content: space-around;
`;
export const justifyCenter_between = css`
    ${flexBase};
    justify-content: space-between;
`;
export const flexCenter = css`
    ${flexBase};
    justify-content: center;
`;
export const flexCenter_wrap = css`
    ${flexBase};
    justify-content: center;
    flex-wrap: wrap;
`;
export const flexCenter_column = css`
    ${flexBase};
    justify-content: center;
    flex-direction: column;
`;
export const flexStart = css`
    ${flexBase};
    justify-content: start;
`;
export const flexEnd = css`
    ${flexBase};
    justify-content: end;
`;

// Other positioning
export const center_relative = css`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
export const center_absolute = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
export const center_fixed = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;