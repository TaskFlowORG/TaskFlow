import styled from 'styled-components';


export const Input  = styled.input<{hasError:boolean}>`
    hight: 100%;

${({hasError}) => hasError && `border-color: red;` }
`


export const Container = styled.div`
 display: flex;
justify-content: center;
items-align: center;
`

