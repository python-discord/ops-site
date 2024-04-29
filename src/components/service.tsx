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

export const Tag = styled.span`
    background-color: rgba(110, 119, 255, 0.39);
    color: #000;
    font-weight: 600;
    font-family: monospace;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    display: inline-block;
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


const Service: React.FC<ServiceProps> = ({ name, description, url, tags, image }) => {
    return (
        <ServiceCard href={url}>
            <ServiceImage src={image} alt={name} />
            <ServiceHeader>{name}</ServiceHeader>
            <ServiceDescription>{description}</ServiceDescription>
            <div>
                {
                    tags.map((tag, index) => (
                        <Tag key={index}>{capitalize(tag)}</Tag>
                    ))
                }
            </div>
        </ServiceCard>
    );
}

export default Service;
