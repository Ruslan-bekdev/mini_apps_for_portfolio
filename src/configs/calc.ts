export const dispatchActionTypes = {
    backspace: 'backspace',
    reset: 'reset',
    percent: 'percent',
    module: 'module',
    point: 'point',
    equal: 'equal',
} as const;

export interface Operator {
    value: string,
    dispatchAction?: typeof dispatchActionTypes[keyof typeof dispatchActionTypes],
    className?: string,
}
interface Operators {
    top: Operator[],
    right: Operator[],
}
interface ButtonsConfig {
    numbers: number[],
    operators: Operators,
}

export const buttonsConfig: ButtonsConfig = {
    numbers: [9,8,7,6,5,4,3,2,1,0],
    operators: {
        top: [
            {value: '⌫', dispatchAction: 'backspace'},
            {value: 'C', dispatchAction: 'reset'},
            {value: '%',},
        ],
        right: [
            {value: '/',},
            {value: '*',},
            {value: '-',},
            {value: '+',},
            {
                value: '+/-', dispatchAction: 'module',
                className: 'positionAction positionAction1',
            },
            {
                value: '.', dispatchAction: 'point',
                className: 'positionAction positionAction2'
            },
            {value: '=', dispatchAction: 'equal'},
        ],
    },
}