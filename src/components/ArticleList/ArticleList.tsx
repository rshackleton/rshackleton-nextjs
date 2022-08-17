import * as React from 'react';
import type { ArticleListItemModel } from './ArticleListItem';
import ArticleListItem from './ArticleListItem';

export type ArticleListProps = {
  items: ArticleListItemModel[];
};

const ArticleList: React.FC<ArticleListProps> = (props) => {
  return (
    <div className="mx-auto max-w-screen-md">
      {props.items.map((item) => (
        <ArticleListItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ArticleList;
