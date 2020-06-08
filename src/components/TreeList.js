import React, { Component } from "react";
import { List, TextField, EditButton } from "react-admin";
import {
  AddChildNodeMenuItem,
  AddNodeAfterMenuItem,
  AddNodeBeforeMenuItem,
  DeleteMenuItem,
  EditMenuItem,
  Tree,
  TreeNode,
  TreeList,
  TreeNodeActions,
  TreeNodeActionsMenu
} from "ra-tree-ui-materialui";

const TagNodeActions = props => (
  <TreeNodeActions {...props}>
    <TreeNodeActionsMenu {...props}>
      <AddChildNodeMenuItem />
      <AddNodeBeforeMenuItem />
      <AddNodeAfterMenuItem />
      <EditMenuItem />
      <DeleteMenuItem />
    </TreeNodeActionsMenu>
  </TreeNodeActions>
);
const canDrag = record => !!record.parent_id;

export const MyTreeList = props => (
  <Tree {...props}>
    <TreeList>
      <TreeNode /* actions={<TagNodeActions />} */ canDrag={canDrag}>
        <TextField source="name" />
      </TreeNode>
    </TreeList>
  </Tree>
);
