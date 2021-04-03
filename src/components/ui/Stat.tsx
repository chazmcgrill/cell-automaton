import React from 'react';
import styled from 'styled-components';

interface StatProps {
    label: string;
    value: number;
}

const StatContainer = styled.div`
    display: flex;
    margin: 0 1.5rem;
    align-items: center;
`;

const StatLabel = styled.span`
    margin-right: 0.5rem;
`;

const StatValue = styled.span`
    font-size: 1.4rem;
`;

const Stat = ({ label, value }: StatProps): JSX.Element => (
    <StatContainer>
        <StatLabel>{label}</StatLabel>
        <StatValue>{value}</StatValue>
    </StatContainer>
);

export default Stat;
