import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const CreateRelatedCommentButton = ({ record, label, url, params = {} }) => (
    <Button
        component={Link}
        to={{
            pathname: url,
            search: `?source=${JSON.stringify({ ...record, ...params })}`,
        }}
    >
        {label || 'Guardar'}
    </Button>
);

export default CreateRelatedCommentButton;