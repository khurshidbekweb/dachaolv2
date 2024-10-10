import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { breadcrambs } from '@/types';

interface Props{
    data: breadcrambs[],
    page: string
}

const BreacdCrambs = (props: Props) => {

    return (
        <Breadcrumb className='mb-3'>
            <BreadcrumbList>
                {props.data.map(el => (
                    <Fragment key={el.slug}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${el.slug}`}>{el.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>{props.page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

    );
};

export default BreacdCrambs;