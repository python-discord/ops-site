import * as React from 'react';
import styled from 'styled-components';
import { capitalize } from '../utils';

export type ServiceProps = {
    name: string;
    description: string;
    url: string;
    tags: string[];
}

const ServiceCard = styled.a`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: #000;
    text-decoration: none;
    transition: filter 0.2s, transform 0.2s;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    &:hover {
        filter: brightness(0.9);
        transform: translateY(-5px);
    }
`;

const DimmedURL = styled.span`
    color: #999;
    font-size: 0.9em;
    font-family: monospace;
`;

export const Tag = styled.span`
    background-color: #c4c4c4;
    color: #000;
    font-weight: 600;
    font-family: monospace;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    display: inline-block;
`;

const Service: React.FC<ServiceProps> = ({ name, description, url, tags }) => {
    return (
        <ServiceCard href={url}>
            <h3>{name}</h3>
            <p>{description}</p>
            <div>
                {
                    tags.map((tag, index) => (
                        <Tag key={index}>{capitalize(tag)}</Tag>
                    ))
                }
            </div>
            <DimmedURL>{url}</DimmedURL>
        </ServiceCard>
    );
}

export default Service;
