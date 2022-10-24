import styled from 'styled-components';
import { FunctionComponent, ReactNode } from 'react';

const LoadingStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    min-height: 100vh;
`;

interface LoadingProps {
    children: ReactNode;
}

const Loading: FunctionComponent<LoadingProps> = ({ children }) => {
    return <LoadingStyle>{children}</LoadingStyle>;
};

export default Loading;
