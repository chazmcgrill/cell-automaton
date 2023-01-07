import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const sharedHeadingStyles = ({ hasMargins }: { hasMargins?: boolean }) => css`
    margin: ${hasMargins ? '3rem 0 1.38rem' : '0'};
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    line-height: 1.3;
`;

const H1 = styled.h1`
    ${sharedHeadingStyles}
    margin-top: 0;
    font-size: 2.488rem;
`;

const H2 = styled.h2`
    ${sharedHeadingStyles}
    font-size: 2.074rem;
`;

const H3 = styled.h3`
    ${sharedHeadingStyles}
    font-size: 1.728rem;
`;

const H4 = styled.h4`
    ${sharedHeadingStyles}
    font-size: 1.44rem;
`;

const H5 = styled.h5`
    ${sharedHeadingStyles}
    font-size: 1.2rem;
`;

const headingComponents = {
    1: H1,
    2: H2,
    3: H3,
    4: H4,
    5: H5,
};

interface HeadingProps {
    importance?: keyof typeof headingComponents;
    children: ReactNode;
    hasMargins?: boolean;
}

const Heading = ({ importance = 1, children: text, hasMargins }: HeadingProps): JSX.Element => {
    const HeadingComponent = headingComponents[importance];

    return <HeadingComponent hasMargins={hasMargins}>{text}</HeadingComponent>;
};

export default Heading;
