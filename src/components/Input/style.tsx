import styled from 'styled-components';


export const Input  = styled.input<{hasError:boolean}>`
    hight: 100%;

${({hasError}) => hasError && `border-color: red;` }
`



export const Label = styled.label`
  display: flex;
  width: 100%;
  justify-content: start
  
  ;
`

interface ContainerProps {
  $haserror?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;  // Fix the typo here
  ${(props)=> {
    const { $haserror } = props as unknown as ContainerProps;
    return  $haserror ? `border-color: red;` : `border-color: transparent;`;
  }}
  
`;


