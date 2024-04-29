import * as React from 'react';
import styled from 'styled-components';
import { capitalize } from '../utils';

export type ServiceProps = {
    slug: string;
    name: string;
    description: string;
    url: string;
    tags: string[];
    image: string;
}

const DimmedURL = styled.p`
    color: #666;
    font-size: 0.8em;
    margin-top: 10px;
    font-family: monospace;
`;

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

const ServiceImage = styled.img`
    border-radius: 10px;
    width: 80px;
`;

const ServiceHeader = styled.h3`
    margin: 0;
`;

const ServiceDescription = styled.p`
    margin: 0;
`;


const Service: React.FC<ServiceProps> = ({ name, description, url, image }) => {
    return (
        <ServiceCard href={url}>
            <ServiceImage src={image} alt={name} />
            <ServiceHeader>{name}</ServiceHeader>
            <ServiceDescription>{description}</ServiceDescription>
            <DimmedURL>{url}</DimmedURL>
        </ServiceCard>
    );
}

export default Service;
