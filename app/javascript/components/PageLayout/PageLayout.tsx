import React, { FC } from 'react';
import clsx from 'clsx';
import { Layout } from 'antd';

import './PageLayout.scss';


interface PageLayoutProps {
  title: string;
  className?: string;
}

const PageLayout: FC<PageLayoutProps> = (props) => {
  const {
    title,
    className,
    children,
  } = props;


  return (
    <Layout className={clsx('page', className)}>
      <Layout.Header className="page__header" />
      <Layout.Content className="page__content">
        <div className="page__title">{title}</div>
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default PageLayout;
